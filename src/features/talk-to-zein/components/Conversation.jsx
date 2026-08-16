import {
  useEffect,
  useRef,
} from "react"

import Message from "@/features/talk-to-zein/components/Message.jsx"
import ThinkingIndicator from "@/features/talk-to-zein/components/ThinkingIndicator.jsx"


const Conversation = ({
  messages,

  thinking,
  thinkingLeaving,

  input,
  setInput,

  inputRef,
  onSubmit,
}) => {
  const scrollAreaRef =
    useRef(null)


  /* =====================================
     AUTO SCROLL TO LATEST
  ===================================== */

  useEffect(() => {
    const scrollArea =
      scrollAreaRef.current

    if (!scrollArea) {
      return
    }


    requestAnimationFrame(() => {
      scrollArea.scrollTo({
        top:
          scrollArea.scrollHeight,

        behavior:
          "smooth",
      })
    })
  }, [
    messages,
    thinking,
  ])


  return (
    <div
      className="
        zein-conversation-enter

        relative

        mx-auto

        flex

        h-[min(760px,calc(100dvh-120px))]
        min-h-[480px]

        w-full
        max-w-[900px]

        flex-col

        overflow-hidden

        font-mono
      "
    >
      {/* =====================================
          TOP FADE
      ===================================== */}

      <div
        className="
          pointer-events-none

          absolute
          inset-x-0
          top-0

          z-20

          h-24

          bg-gradient-to-b
          from-black/80
          via-black/35
          to-transparent
        "
      />


      {/* =====================================
          MESSAGE HISTORY
      ===================================== */}

      <div
        ref={scrollAreaRef}

        role="log"

        aria-live="polite"
        aria-relevant="additions text"
        aria-busy={thinking}

        className="
          min-h-0
          flex-1

          overflow-y-auto
          overscroll-contain

          px-1

          pb-10
          pt-20

          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        <div
          className="
            flex
            min-h-full
            flex-col
            justify-end
          "
        >
          <div
            className="
              space-y-11
            "
          >
            {messages.map(
              (message) => (
                <Message
                  key={message.id}
                  message={message}
                />
              ),
            )}


            {thinking && (
              <ThinkingIndicator
                leaving={
                  thinkingLeaving
                }
              />
            )}
          </div>
        </div>
      </div>


      {/* =====================================
          BOTTOM FADE
      ===================================== */}

      <div
        className="
          pointer-events-none

          absolute
          inset-x-0
          bottom-[70px]

          z-10

          h-20

          bg-gradient-to-t
          from-black/55
          to-transparent
        "
      />


      {/* =====================================
          FIXED FOLLOW-UP INPUT
      ===================================== */}

      <form
        onSubmit={onSubmit}

        className="
          zein-followup-enter

          relative
          z-30

          shrink-0

          border-t
          border-white/[0.06]

          pb-2
          pt-6
        "
      >
        <label
          htmlFor="talk-follow-up"
          className="sr-only"
        >
          Ask another question
        </label>


        <div
          className="
            flex
            items-center
            gap-4
          "
        >
          <input
            id="talk-follow-up"

            ref={inputRef}

            value={input}

            onChange={(event) =>
              setInput(
                event.target.value,
              )
            }

            disabled={thinking}

            autoComplete="off"
            spellCheck={false}

            placeholder={
              thinking
                ? "thinking..."
                : "ask another question..."
            }

            className="
              min-w-0
              flex-1

              border-0
              bg-transparent
              p-0

              font-mono

              text-lg
              text-neutral-300

              placeholder:text-neutral-700

              caret-neutral-400

              outline-none

              disabled:cursor-default
              disabled:opacity-50

              md:text-xl

              focus:outline-none
              focus:ring-0
            "
          />


          <button
            type="submit"

            disabled={
              thinking ||
              !input.trim()
            }

            className="
              shrink-0

              font-mono
              text-[9px]
              uppercase
              tracking-[0.15em]

              text-neutral-600

              transition-colors
              duration-200

              hover:text-neutral-300

              disabled:cursor-default
              disabled:opacity-20
            "
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}


export default Conversation