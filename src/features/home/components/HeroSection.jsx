import { ArrowUpRight } from "lucide-react"


const HeroSection = ({
  onViewWork,
  onOpenTalk,
}) => {
  return (
    <section
      className="
        w-full

        pt-0
        pb-20

        md:pb-24
        lg:pb-28
      "
    >
      <div className="w-full">
        {/* =====================================
            EYEBROW
        ===================================== */}

        <p
          className="
            mb-7

            font-mono
            text-[11px]
            uppercase
            tracking-[0.2em]
            text-neutral-600

            md:mb-8
          "
        >
          Zein Khalid Bulaclac
        </p>


        {/* =====================================
            HEADING
        ===================================== */}

        <h1
          className="
            w-full

            text-[3.2rem]
            font-medium
            leading-[0.92]
            tracking-[-0.06em]

            text-neutral-100

            sm:text-[4.4rem]
            md:text-[5rem]
            lg:text-[5.4rem]
            xl:text-[5.8rem]
          "
        >
          Building software

          <span
            className="
              block
              text-neutral-700
            "
          >
            from interface to intelligence.
          </span>
        </h1>


        {/* =====================================
            DESCRIPTION
        ===================================== */}

        <p
          className="
            mt-10
            w-full

            text-base
            leading-8
            text-neutral-400

            md:mt-11
            md:text-lg
            md:leading-9
          "
        >
          Full-stack developer focused on responsive
          applications, backend systems, APIs, databases,
          AI-powered products, and thoughtful interface design.
        </p>


        {/* =====================================
            ACTIONS
        ===================================== */}

        <div
          className="
            mt-10

            flex
            flex-wrap
            items-center
            gap-x-8
            gap-y-4
          "
        >
          <button
            type="button"
            onClick={onViewWork}
            className="
              group

              inline-flex
              items-center
              gap-2

              text-base
              font-medium
              text-neutral-100

              transition-colors
              duration-200

              hover:text-white
            "
          >
            Explore Work

            <ArrowUpRight
              size={14}
              strokeWidth={1.5}
              className="
                text-neutral-600

                transition-transform
                duration-200

                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
                group-hover:text-neutral-300
              "
            />
          </button>


          <button
            type="button"
            onClick={onOpenTalk}
            className="
              text-base
              text-neutral-600

              transition-colors
              duration-200

              hover:text-neutral-200
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