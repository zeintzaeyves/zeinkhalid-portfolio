const TalkIntro = ({
  input,
  setInput,
  inputRef,
  onSubmit,
  leaving,
}) => {
  return (
    <div
      className={`
        transition-[opacity,transform,filter]
        duration-300
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${
          leaving
            ? `
              -translate-y-3
              opacity-0
              blur-[4px]
            `
            : `
              translate-y-0
              opacity-100
              blur-0
            `
        }
      `}
    >
      {/* =====================================
          QUESTION
      ===================================== */}

      <h1
        className="
          font-mono

          text-[clamp(2.5rem,5vw,4.8rem)]

          leading-[1.08]
          tracking-[-0.05em]

          text-neutral-100
        "
      >
        what do you want to ask?
      </h1>


      {/* =====================================
          INPUT
      ===================================== */}

      <form
        onSubmit={onSubmit}
        className="mt-10"
      >
        <div
          className="
            flex
            w-full
            max-w-[850px]
            items-center
          "
        >
          <input
            ref={inputRef}

            value={input}

            onChange={(event) =>
              setInput(
                event.target.value,
              )
            }

            autoComplete="off"
            spellCheck={false}

            aria-label="Ask Talk to Zein"

            placeholder="type your question..."

            className="
              min-w-0
              w-full

              border-0
              bg-transparent
              p-0

              font-mono

              text-xl
              leading-relaxed
              text-neutral-200

              placeholder:text-neutral-600

              caret-white

              outline-none

              sm:text-2xl
              md:text-3xl

              focus:outline-none
              focus:ring-0
            "
          />
        </div>


        {/* =====================================
            MOBILE HELPER
        ===================================== */}

        <div
          className="
            mt-4

            flex
            items-center
            gap-2

            sm:hidden
          "
        >
          <span
            aria-hidden="true"
            className="
              h-1
              w-1
              shrink-0

              animate-pulse
              rounded-full

              bg-neutral-500
            "
          />

          <span
            className="
              font-mono

              text-[9px]
              uppercase
              tracking-[0.14em]

              text-neutral-700
            "
          >
            tap to type · enter to send
          </span>
        </div>
      </form>
    </div>
  )
}


export default TalkIntro