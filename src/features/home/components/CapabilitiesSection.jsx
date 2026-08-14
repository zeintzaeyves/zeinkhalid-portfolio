import SectionLayout from "./SectionLayout"

import {
  capabilities,
} from "../data/homeData"


const CapabilitiesSection = () => {
  return (
    <SectionLayout
      number="02"
      title="Capabilities"
    >

      <div className="border-t border-white/[0.07]">

        {capabilities.map((item, index) => {
          const isLast =
            index === capabilities.length - 1

          return (
            <div
              key={item.number}
              className={`
                grid
                gap-5
                py-6
                md:grid-cols-[55px_240px_1fr]
                ${
                  !isLast
                    ? "border-b border-white/[0.07]"
                    : ""
                }
              `}
            >

              <span className="text-[10px] text-neutral-800">
                {item.number}
              </span>


              <span className="text-sm text-neutral-300">
                {item.title}
              </span>


              <p className="text-sm leading-6 text-neutral-600">
                {item.description}
              </p>

            </div>
          )
        })}

      </div>

    </SectionLayout>
  )
}


export default CapabilitiesSection