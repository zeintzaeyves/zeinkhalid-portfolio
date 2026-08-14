import TextAction from "./TextAction"


const HeroSection = ({
  onViewWork,
  onOpenTalk,
}) => {
  return (
    <section>

      <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-600">
        Zein Khalid Bulaclac
      </p>


      <h1
        className="
          mt-7
          max-w-[1100px]
          text-5xl
          font-medium
          leading-[0.96]
          tracking-[-0.05em]
          text-white
          md:text-6xl
          lg:text-7xl
          xl:text-[88px]
        "
      >
        Building software

        <br />

        <span className="text-neutral-600">
          from interface to intelligence.
        </span>
      </h1>


      <div
        className="
          mt-10
          flex
          flex-col
          gap-8
          lg:flex-row
          lg:items-end
          lg:justify-between
        "
      >

        <p className="max-w-2xl text-base leading-8 text-neutral-400 lg:text-lg">
          Full-stack developer focused on responsive applications,
          backend systems, APIs, databases, AI-powered products,
          and thoughtful interface design.
        </p>


        <div className="flex items-center gap-6">

          <TextAction onClick={onViewWork}>
            Explore Work
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


export default HeroSection