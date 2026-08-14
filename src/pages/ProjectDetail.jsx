import {
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  Calendar,
  Code2,
} from "lucide-react"

const ProjectDetail = ({
  project,
  setActivePage,
}) => {
  if (!project) {
    return (
      <div className="p-12 text-neutral-400">
        Project not found.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0b0b0c]">

      {/* Topbar */}
      <header className="h-16 border-b border-white/[0.07] px-8 lg:px-12 flex items-center justify-between">

        <div className="flex items-center gap-2 text-sm">

          <button
            onClick={() => setActivePage("projects")}
            className="mr-2 text-neutral-600 hover:text-white transition"
          >
            <ArrowLeft size={16} />
          </button>

          <span className="text-neutral-600">
            Selected Work
          </span>

          <span className="text-neutral-700">
            /
          </span>

          <span className="text-neutral-300">
            {project.title}
          </span>

        </div>

        <span className="text-xs text-neutral-600">
          {project.year}
        </span>

      </header>


      <div className="max-w-[1400px] px-8 lg:px-14 py-12">

        {/* Hero information */}
        <section>

          <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-600">
            {project.type}
          </p>

          <h1 className="mt-6 text-5xl lg:text-7xl xl:text-[86px] leading-[0.95] tracking-[-0.045em] font-medium text-neutral-100">
            {project.title}
          </h1>

          <div className="mt-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            <p className="max-w-2xl text-lg leading-8 text-neutral-400">
              {project.description}
            </p>

            <button className="group flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition">
              Visit project

              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>

          </div>

        </section>


        <div className="my-12 border-t border-white/[0.07]" />


        {/* Project metadata */}
        <section className="grid sm:grid-cols-3 border border-white/[0.07] rounded-2xl overflow-hidden">

          <Meta
            icon={<Briefcase size={16} />}
            label="Role"
            value={project.role}
          />

          <Meta
            icon={<Calendar size={16} />}
            label="Timeline"
            value={project.year}
          />

          <Meta
            icon={<Code2 size={16} />}
            label="Type"
            value={project.type}
          />

        </section>


        {/* Hero image */}
        <section className="mt-8">

          <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111112]">

            {/* fallback */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-6xl font-medium text-white/[0.025]">
                {project.title}
              </p>
            </div>

            <img
              src={project.image}
              alt={project.title}
              onError={(event) => {
                event.currentTarget.style.display = "none"
              }}
              className="relative z-10 w-full h-full object-cover"
            />

          </div>

        </section>


        {/* Overview */}
        <CaseStudySection
          number="01"
          title="Overview"
        >
          <p className="max-w-3xl text-xl lg:text-2xl leading-[1.55] text-neutral-300">
            {project.overview}
          </p>
        </CaseStudySection>


        {/* Challenge */}
        <CaseStudySection
          number="02"
          title="Challenge"
        >
          <p className="max-w-3xl text-lg leading-8 text-neutral-400">
            {project.challenge}
          </p>
        </CaseStudySection>


        {/* Solution */}
        <CaseStudySection
          number="03"
          title="Approach"
        >
          <p className="max-w-3xl text-lg leading-8 text-neutral-400">
            {project.solution}
          </p>
        </CaseStudySection>


        {/* Responsibilities */}
        <CaseStudySection
          number="04"
          title="What I Worked On"
        >
          <div className="border-t border-white/[0.07]">

            {project.responsibilities.map((item, index) => (
              <div
                key={item}
                className="grid grid-cols-[50px_1fr] items-center border-b border-white/[0.07] py-5"
              >
                <span className="text-xs text-neutral-700">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-neutral-300">
                  {item}
                </span>
              </div>
            ))}

          </div>
        </CaseStudySection>


        {/* Tech */}
        <CaseStudySection
          number="05"
          title="Technology"
        >
          <div className="flex flex-wrap gap-3">

            {project.stack.map((technology) => (
              <div
                key={technology}
                className="
                  rounded-lg
                  border
                  border-white/[0.07]
                  bg-[#101011]
                  px-4
                  py-3
                  text-sm
                  text-neutral-400
                "
              >
                {technology}
              </div>
            ))}

          </div>
        </CaseStudySection>


        {/* Bottom navigation */}
        <div className="mt-28 border-t border-white/[0.07] pt-10 pb-10">

          <button
            onClick={() => setActivePage("projects")}
            className="group flex w-full items-center justify-between text-left"
          >

            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-600">
                Back to
              </p>

              <p className="mt-3 text-2xl text-neutral-300 group-hover:text-white transition">
                Selected Work
              </p>
            </div>

            <ArrowUpRight
              size={22}
              className="text-neutral-700 group-hover:text-white transition"
            />

          </button>

        </div>

      </div>

    </div>
  )
}


const Meta = ({
  icon,
  label,
  value,
}) => {
  return (
    <div className="p-6 bg-[#101011] border-b sm:border-b-0 sm:border-r last:border-r-0 border-white/[0.07]">

      <div className="flex items-center justify-between">

        <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-600">
          {label}
        </span>

        <span className="text-neutral-600">
          {icon}
        </span>

      </div>

      <p className="mt-6 text-sm text-neutral-200">
        {value}
      </p>

    </div>
  )
}


const CaseStudySection = ({
  number,
  title,
  children,
}) => {
  return (
    <section className="mt-24 grid lg:grid-cols-[200px_1fr] gap-10 lg:gap-20">

      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-neutral-600">
          {number} / {title}
        </p>
      </div>

      <div>
        {children}
      </div>

    </section>
  )
}

export default ProjectDetail