import {
  useEffect,
  useRef,
  useState,
} from "react"

import {
  sendTalkToZeinMessage,
} from "@/services/talkToZeinApi.js"


const createMessageId = () => {
  if (
    typeof crypto !== "undefined" &&
    crypto.randomUUID
  ) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random()}`
}


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
        window.setTimeout(() => {
          inputRef.current?.focus()
        }, 180)
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
    setThinkingLeaving(true)

    answerTimerRef.current =
      window.setTimeout(() => {
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
      }, 280)
  }


  /* =====================================
     REAL AI RESPONSE
  ===================================== */

  const requestResponse =
    async (
      question,
      history = [],
    ) => {
      setThinking(true)

      setThinkingLeaving(false)

      cancelRequest()

      const controller =
        new AbortController()

      requestControllerRef.current =
        controller

      try {
        const reply =
          await sendTalkToZeinMessage({
            message: question,
            messages: history,
            signal:
              controller.signal,
          })

        if (
          controller.signal.aborted
        ) {
          return
        }

        displayAnswer(reply)
      } catch (error) {
        if (
          controller.signal.aborted
        ) {
          return
        }

        console.error(
          "Talk to Zein request failed:",
          error,
        )

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


    /* FIRST QUESTION */

    if (
      mode === "intro"
    ) {
      setIntroLeaving(true)

      transitionTimerRef.current =
        window.setTimeout(() => {
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
        }, 320)

      return
    }


    /* FOLLOW-UP */

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


  const handleSubmit = (
    event,
  ) => {
    event.preventDefault()

    submitQuestion(
      input,
    )
  }


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