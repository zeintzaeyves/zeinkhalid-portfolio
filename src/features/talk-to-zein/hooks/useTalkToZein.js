import {
  useEffect,
  useRef,
  useState,
} from "react"


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

  const responseTimerRef =
    useRef(null)

  const answerTimerRef =
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
      responseTimerRef.current,
    )

    clearTimeout(
      answerTimerRef.current,
    )
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
        mode ===
          "conversation" &&
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
    }
  }, [])


  /* =====================================
     TEMPORARY RESPONSE
  ===================================== */

  const requestResponse = () => {
    setThinking(true)
    setThinkingLeaving(false)


    responseTimerRef.current =
      window.setTimeout(() => {

        setThinkingLeaving(true)


        answerTimerRef.current =
          window.setTimeout(() => {

            setThinking(false)

            setThinkingLeaving(
              false,
            )


            setMessages(
              (current) => [
                ...current,

                {
                  id:
                    createMessageId(),

                  type:
                    "assistant",

                  text:
                    "You can ask me about Zein's projects, professional experience, tech stack, full-stack development, UI design, or AI application work.",
                },
              ],
            )

          }, 280)

      }, 1600)
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


          requestResponse()

        }, 320)


      return
    }


    /* FOLLOW-UP */
    setMessages(
      (current) => [
        ...current,
        userMessage,
      ],
    )


    requestResponse()
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