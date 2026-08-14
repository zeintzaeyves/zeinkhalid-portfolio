import SectionLayout from "./SectionLayout"
import TextAction from "./TextAction"

import {
  certificationsPreview,
} from "../data/homeData"


const LearningPreview = ({
  onNavigate,
}) => {
  return (
    <SectionLayout
      number="05"
      title="Learning"
    >

      <div className="border-t border-white/[0.07]">

        {certificationsPreview.map((item, index) => {
          const isLast =
            index === certificationsPreview.length - 1

          return (
            <div
              key={item.title}
              className={`
                flex
                items-center
                justify-between
                gap-6
                py-6
                ${
                  !isLast
                    ? "border-b border-white/[0.07]"
                    : ""
                }
              `}
            >

              <span className="text-sm text-neutral-300">
                {item.title}
              </span>


              <span
                className="
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.08em]
                  text-neutral-700
                "
              >
                {item.meta}
              </span>

            </div>
          )
        })}

      </div>


      <TextAction
        className="mt-7"
        onClick={() => onNavigate("certifications")}
      >
        View certifications
      </TextAction>

    </SectionLayout>
  )
}


export default LearningPreview