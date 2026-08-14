import { ArrowUpRight } from "lucide-react"

import SectionLayout from "./SectionLayout"
import TextAction from "./TextAction"

import {
  featuredProjects,
} from "../data/homeData"


const FeaturedWorkSection = ({
  onNavigate,
}) => {
  return (
    <SectionLayout
      number="01"
      title="Featured Work"
    >

      <div className="border-t border-white/[0.07]">

        {featuredProjects.map((project) => (
          <button
            key={project.number}
            type="button"
            onClick={() => onNavigate("projects")}
            className="
              group
              grid
              w-full
              items-center
              gap-5
              border-b
              border-white/[0.07]
              py-6
              text-left
              md:grid-cols-[55px_1fr_220px_1fr_20px]
            "
          >

            <span className="text-[10px] text-neutral-800">
              {project.number}
            </span>


            <span
              className="
                text-lg
                text-neutral-300
                transition-colors
                duration-300
                group-hover:text-white
              "
            >
              {project.title}
            </span>


            <span
              className="
                text-[10px]
                uppercase
                tracking-[0.14em]
                text-neutral-600
              "
            >
              {project.category}
            </span>


            <span className="hidden text-xs text-neutral-700 md:block">
              {project.stack}
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

      </div>


      <TextAction
        className="mt-7"
        onClick={() => onNavigate("projects")}
      >
        View all projects
      </TextAction>

    </SectionLayout>
  )
}


export default FeaturedWorkSection