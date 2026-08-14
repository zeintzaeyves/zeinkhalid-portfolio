import PageContainer from "@/components/layout/PageContainer.jsx"
import PageHeader from "@/components/layout/PageHeader.jsx"
import PageIntro from "@/components/layout/PageIntro.jsx"

import TechCategory from "@/features/tech-stack/components/TechCategory.jsx"

import {
  TECH_STACK,
} from "@/data/techStack.js"


const TechStack = () => {
  const totalTechnologies =
    TECH_STACK.reduce(
      (total, category) =>
        total + category.items.length,
      0,
    )


  return (
    <div className="min-h-full bg-[#0b0b0c]">

      <PageHeader
        eyebrow="Development / Tech Stack"
        meta={`${totalTechnologies} Technologies`}
      />


      <PageContainer>

        <PageIntro
          label="Stack"
          description="
            Tools and technologies across frontend,
            backend, databases, AI applications,
            content management, design, and development
            workflows.
          "
        >
          Technologies I work with

          <span className="text-neutral-600">
            {" "}across product development.
          </span>
        </PageIntro>


        <section
          className="
            mt-14
            border-t
            border-white/[0.07]
          "
          aria-label="Technology stack"
        >
          {TECH_STACK.map(
            (category, index) => (
              <TechCategory
                key={category.category}
                category={category}
                index={index}
                isLast={
                  index ===
                  TECH_STACK.length - 1
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
            My stack evolves depending on project
            requirements, architecture, and product needs.
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
            Zein / Stack
          </span>
        </footer>

      </PageContainer>

    </div>
  )
}


export default TechStack