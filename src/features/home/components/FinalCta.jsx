import TextAction from "./TextAction"


const FinalCta = ({
  onViewWork,
  onOpenTalk,
}) => {
  return (
    <section
      className="
        mb-8
        mt-28
        border-t
        border-white/[0.07]
        pt-10
      "
    >

      <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-600">
        Next
      </p>


      <div
        className="
          mt-6
          flex
          flex-col
          gap-10
          lg:flex-row
          lg:items-end
          lg:justify-between
        "
      >

        <h2
          className="
            max-w-4xl
            text-3xl
            leading-[1.1]
            tracking-[-0.04em]
            text-neutral-200
            lg:text-5xl
          "
        >
          Explore the work,

          <span className="text-neutral-600">
            {" "}or ask me about it.
          </span>
        </h2>


        <div className="flex items-center gap-6">

          <TextAction onClick={onViewWork}>
            Selected Work
          </TextAction>


          <button
            type="button"
            onClick={onOpenTalk}
            className="
              text-sm
              text-neutral-600
              transition-colors
              duration-300
              hover:text-white
            "
          >
            Talk to Zein
          </button>

        </div>

      </div>

    </section>
  )
}


export default FinalCta