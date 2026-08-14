import SectionLayout from "./SectionLayout"
import TextAction from "./TextAction"

import {
  experiencePreview,
} from "../data/homeData"


const ExperiencePreview = ({
  onNavigate,
}) => {
  return (
    <SectionLayout
      number="03"
      title="Experience"
    >

      <div className="border-t border-white/[0.07]">

        {experiencePreview.map((item, index) => {
          const isLast =
            index === experiencePreview.length - 1

          return (
            <div
              key={`${item.company}-${item.role}`}
              className={`
                grid
                gap-5
                py-6
                md:grid-cols-[150px_1fr_1fr]
                ${
                  !isLast
                    ? "border-b border-white/[0.07]"
                    : ""
                }
              `}
            >

              <span className="text-xs text-neutral-600">
                {item.period}
              </span>


              <span className="text-sm text-neutral-300">
                {item.company}
              </span>


              <span className="text-sm text-neutral-600">
                {item.role}
              </span>

            </div>
          )
        })}

      </div>


      <TextAction
        className="mt-7"
        onClick={() => onNavigate("experience")}
      >
        Full experience
      </TextAction>

    </SectionLayout>
  )
}


export default ExperiencePreview