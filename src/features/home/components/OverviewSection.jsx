import { ArrowUpRight } from "lucide-react"

import {
  overviewItems,
} from "../data/homeData"


const OverviewSection = ({
  onNavigate,
}) => {
  return (
    <section className="mt-16 border-t border-white/[0.07]">

      {overviewItems.map((item) => (
        <button
          key={item.number}
          type="button"
          onClick={() => onNavigate(item.page)}
          className="
            group
            grid
            w-full
            grid-cols-[45px_1fr]
            items-center
            gap-4
            border-b
            border-white/[0.07]
            py-6
            text-left
            md:grid-cols-[60px_1fr_1fr_20px]
          "
        >

          <span className="text-[10px] text-neutral-800">
            {item.number}
          </span>


          <span
            className="
              text-sm
              text-neutral-300
              transition-colors
              duration-300
              group-hover:text-white
            "
          >
            {item.label}
          </span>


          <span className="hidden text-sm text-neutral-600 md:block">
            {item.value}
          </span>


          <ArrowUpRight
            size={13}
            className="
              hidden
              text-neutral-800
              transition-colors
              duration-300
              group-hover:text-neutral-400
              md:block
            "
          />

        </button>
      ))}

    </section>
  )
}


export default OverviewSection