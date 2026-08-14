import PageContainer from "@/components/layout/PageContainer.jsx"
import PageHeader from "@/components/layout/PageHeader.jsx"
import PageIntro from "@/components/layout/PageIntro.jsx"

import ExperienceEntry from "@/features/experience/components/ExperienceEntry.jsx"

import {
  EXPERIENCE,
} from "@/data/experience.js"


const Experience = () => {
  return (
    <div className="min-h-full bg-[#0b0b0c]">

      <PageHeader
        eyebrow="Profile / Experience"
        meta="Professional History"
      />


      <PageContainer>

        <PageIntro
          label="Experience"
          description="
            Experience across production frontend development,
            independent full-stack work, responsive interface
            development, and AI-focused projects.
          "
        >
          Professional work

          <span className="text-neutral-600">
            {" "}and development experience.
          </span>
        </PageIntro>


        <section
          className="
            mt-14
            border-t
            border-white/[0.07]
          "
          aria-label="Professional experience"
        >
          {EXPERIENCE.map(
            (experience, index) => (
              <ExperienceEntry
                key={experience.id}
                experience={experience}
                isLast={
                  index ===
                  EXPERIENCE.length - 1
                }
              />
            )
          )}
        </section>


        <footer
          className="
            mt-10

            flex
            items-center
            justify-between

            gap-8
          "
        >
          <p
            className="
              max-w-xl
              text-xs
              leading-6
              text-neutral-700
            "
          >
            Focused on building maintainable interfaces,
            practical product experiences, and modern web
            applications.
          </p>


          <span
            className="
              hidden

              font-mono
              text-[9px]
              uppercase
              tracking-[0.12em]
              text-neutral-800

              sm:block
            "
          >
            Zein / Experience
          </span>
        </footer>

      </PageContainer>

    </div>
  )
}


export default Experience