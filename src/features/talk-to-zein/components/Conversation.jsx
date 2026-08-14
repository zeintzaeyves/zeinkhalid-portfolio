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
  return (
    <div
      className="
        zein-conversation-enter

        max-w-[900px]

        font-mono
      "
    >

      {/* =====================================
          MESSAGE LOG
      ===================================== */}
      <div
        role="log"

        aria-live="polite"
        aria-relevant="additions text"
        aria-busy={thinking}

        className="space-y-11"
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


      {/* =====================================
          FOLLOW-UP
      ===================================== */}
      {!thinking && (
        <form
          onSubmit={onSubmit}

          className="
            zein-followup-enter

            mt-12
            border-t
            border-white/[0.06]
            pt-8
          "
        >
          <label
            htmlFor="talk-follow-up"
            className="sr-only"
          >
            Ask another question
          </label>


          <input
            id="talk-follow-up"

            ref={inputRef}

            value={input}

            onChange={(event) =>
              setInput(
                event.target.value,
              )
            }

            autoComplete="off"
            spellCheck={false}

            placeholder="ask another question..."

            className="
              w-full

              border-0
              bg-transparent
              p-0

              font-mono

              text-lg
              text-neutral-300

              placeholder:text-neutral-700

              caret-neutral-400

              outline-none

              md:text-xl

              focus:outline-none
              focus:ring-0
            "
          />
        </form>
      )}

    </div>
  )
}


export default Conversation