import PageContainer from "@/components/layout/PageContainer.jsx"
import PageHeader from "@/components/layout/PageHeader.jsx"
import PageIntro from "@/components/layout/PageIntro.jsx"

import ProjectRow from "@/features/selected-work/components/ProjectRow.jsx"

import {
  PROJECTS,
} from "@/data/projects.js"


const SelectedWork = () => {
  return (
    <div className="min-h-full bg-[#0b0b0c]">

      <PageHeader
        eyebrow="Portfolio / Selected Work"
        meta={`${PROJECTS.length} Projects`}
      />


      <PageContainer>

        <PageIntro
          label="Work"
          description="
            A selection of full-stack applications,
            AI experiences, production websites, and
            interface design work.
          "
        >
          Selected projects

          <span className="text-neutral-600">
            {" "}and digital work.
          </span>
        </PageIntro>


        <section
          className="
            mt-14
            border-t
            border-white/[0.07]
          "
          aria-label="Selected projects"
        >
          {PROJECTS.map(
            (project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={index}
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
            Live project links are provided where publicly available.
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
            Zein / Work
          </span>
        </footer>

      </PageContainer>

    </div>
  )
}


export default SelectedWork