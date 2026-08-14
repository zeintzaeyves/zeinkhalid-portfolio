import PageContainer from "@/components/layout/PageContainer.jsx"
import PageHeader from "@/components/layout/PageHeader.jsx"
import PageIntro from "@/components/layout/PageIntro.jsx"

import FocusRow from "@/features/about/components/FocusRow.jsx"

import {
  PROFILE,
} from "@/config/profile.js"

import {
  ABOUT_FOCUS,
} from "@/data/about.js"


const AboutMe = () => {
  return (
    <div className="min-h-full bg-[#0b0b0c]">

      <PageHeader
        eyebrow="Profile / About"
        meta={PROFILE.location}
      />


      <PageContainer>

        {/* =====================================
            INTRO
        ===================================== */}
        <PageIntro
          label={PROFILE.name}
          description={
            "I build web applications across frontend, backend, APIs, databases, and AI-powered product experiences, with a strong focus on responsive interfaces and maintainable implementation."
          }
        >
          Full-Stack Developer

          <span className="text-neutral-600">
            {" "}/ AI Application Developer.
          </span>
        </PageIntro>


        {/* =====================================
            QUICK FACTS
        ===================================== */}
        <section
          className="
            mt-16
            border-t
            border-white/[0.07]
            pt-8
          "
          aria-label="Profile overview"
        >
          <div
            className="
              grid
              gap-x-10
              gap-y-7

              sm:grid-cols-2
              lg:grid-cols-4
            "
          >

            <Fact
              label="Role"
              value={PROFILE.roles[0]}
            />


            <Fact
              label="Specialization"
              value={PROFILE.roles[1]}
            />


            <Fact
              label="Location"
              value={PROFILE.location}
            />


            <Fact
              label="Focus"
              value="Web · AI · UI"
            />

          </div>
        </section>


        {/* =====================================
            ABOUT
        ===================================== */}
        <section
          className="
            mt-24

            grid
            gap-10

            lg:grid-cols-[180px_minmax(0,1fr)]
            lg:gap-20
          "
        >

          <SectionLabel>
            01 / About
          </SectionLabel>


          <div
            className="
              max-w-3xl

              space-y-6

              text-base
              leading-8
              text-neutral-500
            "
          >
            <p>
              My work sits between software engineering
              and interface design. I enjoy turning product
              requirements and visual concepts into
              responsive applications that are practical to
              develop and maintain.
            </p>


            <p>
              My experience includes production frontend
              development, CMS-driven websites, independent
              full-stack application work, and AI-focused
              interfaces.
            </p>


            <p>
              I care about clean implementation,
              responsiveness, reusable architecture,
              performance, and making sure the final
              interface works beyond the design file.
            </p>
          </div>

        </section>


        {/* =====================================
            FOCUS
        ===================================== */}
        <section
          className="
            mt-24

            grid
            gap-10

            lg:grid-cols-[180px_minmax(0,1fr)]
            lg:gap-20
          "
        >

          <SectionLabel>
            02 / Focus
          </SectionLabel>


          <div className="border-t border-white/[0.07]">

            {ABOUT_FOCUS.map(
              (item, index) => (
                <FocusRow
                  key={item.id}
                  item={item}
                  index={index}
                  isLast={
                    index ===
                    ABOUT_FOCUS.length - 1
                  }
                />
              )
            )}

          </div>

        </section>


        {/* =====================================
            CONTACT
        ===================================== */}
        <section
          className="
            mb-8
            mt-28

            border-t
            border-white/[0.07]

            pt-10
          "
        >
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-neutral-600
            "
          >
            Contact
          </p>


          <a
            href={`mailto:${PROFILE.email}`}
            className="
              mt-5
              inline-block

              break-all

              text-base
              text-neutral-400

              transition-colors
              duration-300

              hover:text-white

              sm:text-lg
            "
          >
            {PROFILE.email}
          </a>
        </section>

      </PageContainer>

    </div>
  )
}


/* =========================================
   FACT
========================================= */

const Fact = ({
  label,
  value,
}) => {
  return (
    <div>
      <p
        className="
          text-[9px]
          uppercase
          tracking-[0.18em]
          text-neutral-700
        "
      >
        {label}
      </p>


      <p
        className="
          mt-2
          text-sm
          text-neutral-300
        "
      >
        {value}
      </p>
    </div>
  )
}


/* =========================================
   SECTION LABEL
========================================= */

const SectionLabel = ({
  children,
}) => {
  return (
    <div>
      <p
        className="
          text-xs
          uppercase
          tracking-[0.18em]
          text-neutral-600
        "
      >
        {children}
      </p>
    </div>
  )
}


export default AboutMe