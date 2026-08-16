import {
  useEffect,
  useRef,
  useState,
} from "react"

import {
  sendTalkToZeinMessage,
} from "@/services/talkToZeinApi.js"


const MIN_THINKING_TIME = 3000


/* =====================================
   MESSAGE ID
===================================== */

const createMessageId = () => {
  if (
    typeof crypto !== "undefined" &&
    crypto.randomUUID
  ) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random()}`
}


/* =====================================
   ABORTABLE DELAY
===================================== */

const wait = (
  duration,
  signal,
) => {
  return new Promise(
    (resolve, reject) => {
      if (duration <= 0) {
        resolve()
        return
      }


      if (signal?.aborted) {
        reject(
          new DOMException(
            "Request aborted",
            "AbortError",
          ),
        )

        return
      }


      const timer =
        window.setTimeout(
          () => {
            cleanup()
            resolve()
          },
          duration,
        )


      const handleAbort = () => {
        window.clearTimeout(timer)

        cleanup()

        reject(
          new DOMException(
            "Request aborted",
            "AbortError",
          ),
        )
      }


      const cleanup = () => {
        signal?.removeEventListener(
          "abort",
          handleAbort,
        )
      }


      signal?.addEventListener(
        "abort",
        handleAbort,
        {
          once: true,
        },
      )
    },
  )
}


/* =====================================
   HOOK
===================================== */

const useTalkToZein = ({
  open,
}) => {
  const [input, setInput] =
    useState("")

  const [messages, setMessages] =
    useState([])

  const [mode, setMode] =
    useState("intro")

  const [
    introLeaving,
    setIntroLeaving,
  ] = useState(false)

  const [
    thinking,
    setThinking,
  ] = useState(false)

  const [
    thinkingLeaving,
    setThinkingLeaving,
  ] = useState(false)


  const inputRef =
    useRef(null)

  const focusTimerRef =
    useRef(null)

  const transitionTimerRef =
    useRef(null)

  const answerTimerRef =
    useRef(null)

  const requestControllerRef =
    useRef(null)


  /* =====================================
     TIMER CLEANUP
  ===================================== */

  const clearTimers = () => {
    clearTimeout(
      focusTimerRef.current,
    )

    clearTimeout(
      transitionTimerRef.current,
    )

    clearTimeout(
      answerTimerRef.current,
    )
  }


  /* =====================================
     REQUEST CLEANUP
  ===================================== */

  const cancelRequest = () => {
    requestControllerRef.current?.abort()

    requestControllerRef.current =
      null
  }


  /* =====================================
     INPUT FOCUS
  ===================================== */

  useEffect(() => {
    clearTimeout(
      focusTimerRef.current,
    )


    if (!open) {
      return
    }


    if (
      mode === "intro" ||
      (
        mode === "conversation" &&
        !thinking
      )
    ) {
      focusTimerRef.current =
        window.setTimeout(
          () => {
            inputRef.current?.focus()
          },
          180,
        )
    }


    return () => {
      clearTimeout(
        focusTimerRef.current,
      )
    }
  }, [
    open,
    mode,
    thinking,
  ])


  /* =====================================
     RESET WHEN CLOSED
  ===================================== */

  useEffect(() => {
    if (open) {
      return
    }


    clearTimers()

    cancelRequest()


    setInput("")

    setMessages([])

    setMode("intro")

    setIntroLeaving(false)

    setThinking(false)

    setThinkingLeaving(false)
  }, [open])


  /* =====================================
     UNMOUNT
  ===================================== */

  useEffect(() => {
    return () => {
      clearTimers()

      cancelRequest()
    }
  }, [])


  /* =====================================
     DISPLAY AI ANSWER
  ===================================== */

  const displayAnswer = (
    text,
  ) => {
    /*
     * Start fading the ThinkingOrb
     * before inserting the answer.
     */

    setThinkingLeaving(true)


    answerTimerRef.current =
      window.setTimeout(
        () => {
          setThinking(false)

          setThinkingLeaving(false)


          setMessages(
            (current) => [
              ...current,

              {
                id:
                  createMessageId(),

                type:
                  "assistant",

                text,
              },
            ],
          )


          requestControllerRef.current =
            null
        },
        280,
      )
  }


  /* =====================================
     WAIT FOR MINIMUM THINKING TIME
  ===================================== */

  const finishThinkingDelay =
    async (
      startedAt,
      signal,
    ) => {
      const elapsed =
        Date.now() - startedAt

      const remaining =
        Math.max(
          MIN_THINKING_TIME -
            elapsed,
          0,
        )


      await wait(
        remaining,
        signal,
      )
    }


  /* =====================================
     REAL AI RESPONSE
  ===================================== */

  const requestResponse =
    async (
      question,
      history = [],
    ) => {
      /*
       * Start timer immediately when
       * ThinkingOrb becomes visible.
       */

      const startedAt =
        Date.now()


      setThinking(true)

      setThinkingLeaving(false)


      /*
       * Cancel any previous request.
       */

      cancelRequest()


      const controller =
        new AbortController()


      requestControllerRef.current =
        controller


      try {
        /*
         * Request the real OpenAI answer.
         */

        const reply =
          await sendTalkToZeinMessage({
            message: question,

            messages: history,

            signal:
              controller.signal,
          })


        /*
         * If the API responded faster
         * than 2 seconds, keep the orb
         * visible until 2 seconds total.
         *
         * If API already took 2+ seconds,
         * this resolves immediately.
         */

        await finishThinkingDelay(
          startedAt,
          controller.signal,
        )


        if (
          controller.signal.aborted
        ) {
          return
        }


        /*
         * Fade orb out then display answer.
         */

        displayAnswer(reply)
      } catch (error) {
        /*
         * Closing Talk to Zein aborts
         * the request quietly.
         */

        if (
          controller.signal.aborted ||
          error?.name === "AbortError"
        ) {
          return
        }


        console.error(
          "Talk to Zein request failed:",
          error,
        )


        try {
          /*
           * Errors also respect the same
           * minimum 2-second animation.
           */

          await finishThinkingDelay(
            startedAt,
            controller.signal,
          )
        } catch (
          delayError
        ) {
          if (
            delayError?.name ===
            "AbortError"
          ) {
            return
          }
        }


        if (
          controller.signal.aborted
        ) {
          return
        }


        displayAnswer(
          "I couldn't reach the AI service right now. Try asking me again in a moment.",
        )
      }
    }


  /* =====================================
     SUBMIT QUESTION
  ===================================== */

  const submitQuestion = (
    value,
  ) => {
    const question =
      value.trim()


    if (
      !question ||
      thinking ||
      introLeaving
    ) {
      return
    }


    setInput("")


    const userMessage = {
      id:
        createMessageId(),

      type:
        "user",

      text:
        question,
    }


    /* =================================
       FIRST QUESTION
    ================================= */

    if (
      mode === "intro"
    ) {
      setIntroLeaving(true)


      transitionTimerRef.current =
        window.setTimeout(
          () => {
            setMessages([
              userMessage,
            ])


            setMode(
              "conversation",
            )


            setIntroLeaving(
              false,
            )


            requestResponse(
              question,
              [],
            )
          },
          320,
        )


      return
    }


    /* =================================
       FOLLOW-UP QUESTION
    ================================= */

    const conversationHistory =
      messages


    setMessages(
      (current) => [
        ...current,
        userMessage,
      ],
    )


    requestResponse(
      question,
      conversationHistory,
    )
  }


  /* =====================================
     FORM SUBMIT
  ===================================== */

  const handleSubmit = (
    event,
  ) => {
    event.preventDefault()


    submitQuestion(
      input,
    )
  }


  /* =====================================
     RETURN
  ===================================== */

  return {
    input,
    setInput,

    messages,

    mode,

    introLeaving,

    thinking,
    thinkingLeaving,

    inputRef,

    handleSubmit,
  }
}


export default useTalkToZein