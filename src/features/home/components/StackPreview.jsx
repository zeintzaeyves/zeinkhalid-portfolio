import SectionLayout from "./SectionLayout"
import TextAction from "./TextAction"

import {
  stackPreview,
} from "../data/homeData"


const StackPreview = ({
  onNavigate,
}) => {
  return (
    <SectionLayout
      number="04"
      title="Stack"
    >

      <p className="max-w-4xl text-2xl leading-[1.45] text-neutral-200 lg:text-3xl">
        React, Next.js, Node.js, MongoDB and modern web technologies

        <span className="text-neutral-600">
          {" "}combined with AI integrations, backend systems,
          CMS platforms, and UI design.
        </span>
      </p>


      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">

        {stackPreview.map((technology) => (
          <span
            key={technology}
            className="text-xs text-neutral-600"
          >
            {technology}
          </span>
        ))}

      </div>


      <TextAction
        className="mt-8"
        onClick={() => onNavigate("stack")}
      >
        Explore full tech stack
      </TextAction>

    </SectionLayout>
  )
}


export default StackPreview