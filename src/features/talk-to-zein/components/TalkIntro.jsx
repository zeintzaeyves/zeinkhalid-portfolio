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


      <form
        onSubmit={onSubmit}
        className="mt-10"
      >

        <input
          ref={inputRef}
          value={input}
          onChange={(event) =>
            setInput(event.target.value)
          }
          autoComplete="off"
          spellCheck={false}
          aria-label="Ask Talk to Zein"
          className="
            w-full
            max-w-[850px]

            border-0
            bg-transparent
            p-0

            font-mono

            text-2xl
            leading-relaxed
            text-neutral-200

            caret-neutral-300

            outline-none

            md:text-3xl

            focus:outline-none
            focus:ring-0
          "
        />

      </form>

    </div>
  )
}


export default TalkIntro