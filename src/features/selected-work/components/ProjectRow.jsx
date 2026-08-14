import {
  ArrowUpRight,
} from "lucide-react"


const ProjectRow = ({
  project,
  index,
}) => {
  const number = String(
    index + 1,
  ).padStart(2, "0")


  const hasLink =
    Boolean(project.url)


  const content = (
    <>
      {/* NUMBER */}
      <span
        className="
          row-start-1

          font-mono
          text-[9px]
          tracking-[0.06em]
          text-neutral-800

          md:row-auto
        "
      >
        {number}
      </span>


      {/* CONTENT */}
      <div
        className="
          min-w-0
          md:contents
        "
      >
        <h2
          className={`
            text-base
            tracking-[-0.02em]

            transition-colors
            duration-300

            md:text-lg

            ${
              hasLink
                ? `
                  text-neutral-300
                  group-hover:text-white
                `
                : "text-neutral-300"
            }
          `}
        >
          {project.title}
        </h2>


        <p
          className="
            mt-2

            text-[9px]
            uppercase
            tracking-[0.14em]

            text-neutral-600

            md:mt-0
          "
        >
          {project.type}
        </p>


        <p
          className="
            mt-3

            max-w-2xl

            text-sm
            leading-6

            text-neutral-600

            md:mt-0
          "
        >
          {project.description}
        </p>
      </div>


      {/* ACTION */}
      <div
        className="
          hidden
          justify-end

          md:flex
        "
      >
        {hasLink && (
          <ArrowUpRight
            size={14}
            aria-hidden="true"
            className="
              text-neutral-700

              transition-[color,transform]
              duration-300

              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
              group-hover:text-neutral-300
            "
          />
        )}
      </div>
    </>
  )


  const rowClassName = `
    group

    grid
    grid-cols-[28px_minmax(0,1fr)]

    gap-x-3

    border-b
    border-white/[0.07]

    py-6

    text-left

    md:grid-cols-[45px_210px_190px_minmax(0,1fr)_20px]
    md:items-center
    md:gap-x-6
  `


  if (!hasLink) {
    return (
      <div className={rowClassName}>
        {content}
      </div>
    )
  }


  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.title}`}
      className={rowClassName}
    >
      {content}
    </a>
  )
}


export default ProjectRow