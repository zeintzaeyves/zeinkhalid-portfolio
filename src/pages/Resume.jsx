import {
  ArrowUpRight,
} from "lucide-react"

import PageContainer from "@/components/layout/PageContainer.jsx"
import PageHeader from "@/components/layout/PageHeader.jsx"
import PageIntro from "@/components/layout/PageIntro.jsx"

import {
  PROFILE,
} from "@/config/profile.js"

import {
  CERTIFICATIONS,
} from "@/data/certifications.js"

import {
  EXPERIENCE,
} from "@/data/experience.js"

import {
  TECH_STACK,
} from "@/data/techStack.js"


const Resume = () => {
  return (
    <div className="min-h-full bg-[#0b0b0c]">

      <PageHeader
        eyebrow="Profile / Resume"
        meta="Curriculum Vitae"
      />


      <PageContainer>

        {/* =====================================
            IDENTITY
        ===================================== */}
        <PageIntro
          label="Resume"
          description={
            PROFILE.roles.join(" · ")
          }
        >
          {PROFILE.name}
        </PageIntro>


        <div
          className="
            mt-10

            flex
            flex-wrap
            items-center

            gap-x-7
            gap-y-3
          "
        >

          <a
            href={`mailto:${PROFILE.email}`}
            className="
              group

              inline-flex
              items-center
              gap-2

              text-sm
              text-neutral-500

              transition-colors
              duration-300

              hover:text-white
            "
          >
            Contact

            <ArrowUpRight
              size={13}
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
          </a>


          <a
            href={PROFILE.socials.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-sm
              text-neutral-600

              transition-colors
              duration-300

              hover:text-white
            "
          >
            LinkedIn
          </a>


          <a
            href={PROFILE.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-sm
              text-neutral-600

              transition-colors
              duration-300

              hover:text-white
            "
          >
            GitHub
          </a>

        </div>


        {/* META */}
        <section
          className="
            mt-12

            grid
            gap-6

            border-t
            border-white/[0.07]

            py-7

            sm:grid-cols-2
            lg:grid-cols-3
          "
        >

          <ResumeMeta
            label="Email"
            value={PROFILE.email}
          />


          <ResumeMeta
            label="Location"
            value={`${PROFILE.location} · ${PROFILE.timezone}`}
          />


          <ResumeMeta
            label="GitHub"
            value={
              PROFILE.socials.github.display
            }
            href={
              PROFILE.socials.github.url
            }
          />

        </section>


        {/* =====================================
            PROFILE
        ===================================== */}
        <ResumeSection
          number="01"
          title="Profile"
        >
          <p
            className="
              max-w-3xl

              text-base
              leading-8
              text-neutral-500
            "
          >
            Software Web developer with experience building
            responsive web applications, CMS-driven websites,
            reusable frontend systems, backend functionality,
            APIs, databases, and AI-integrated product
            experiences.
          </p>
        </ResumeSection>


        {/* =====================================
            EXPERIENCE
        ===================================== */}
        <ResumeSection
          number="02"
          title="Experience"
        >
          <div className="border-t border-white/[0.07]">

            {EXPERIENCE.map(
              (experience) => (
                <ResumeExperience
                  key={experience.id}
                  experience={experience}
                />
              )
            )}

          </div>
        </ResumeSection>


        {/* =====================================
            TECHNOLOGY
        ===================================== */}
        <ResumeSection
          number="03"
          title="Technology"
        >
          <div className="border-t border-white/[0.07]">

            {TECH_STACK.map(
              (category) => (
                <div
                  key={category.category}
                  className="
                    grid
                    gap-5

                    border-b
                    border-white/[0.07]

                    py-6

                    md:grid-cols-[220px_minmax(0,1fr)]
                  "
                >

                  <h3
                    className="
                      text-sm
                      text-neutral-300
                    "
                  >
                    {category.category}
                  </h3>


                  <p
                    className="
                      text-sm
                      leading-7
                      text-neutral-600
                    "
                  >
                    {category.items.join(" · ")}
                  </p>

                </div>
              )
            )}

          </div>
        </ResumeSection>


        {/* =====================================
            CERTIFICATIONS
        ===================================== */}
        <ResumeSection
          number="04"
          title="Certifications"
        >
          <div className="border-t border-white/[0.07]">

            {CERTIFICATIONS.map(
              (certification) => (
                <div
                  key={certification.id}
                  className="
                    grid
                    gap-3

                    border-b
                    border-white/[0.07]

                    py-6

                    md:grid-cols-[minmax(0,1fr)_260px_70px]
                    md:items-center
                  "
                >

                  <span
                    className="
                      text-sm
                      text-neutral-300
                    "
                  >
                    {certification.title}
                  </span>


                  <span
                    className="
                      text-sm
                      text-neutral-600
                    "
                  >
                    {certification.issuer}
                  </span>


                  <span
                    className="
                      font-mono
                      text-[10px]
                      text-neutral-700

                      md:text-right
                    "
                  >
                    {certification.year}
                  </span>

                </div>
              )
            )}

          </div>
        </ResumeSection>


        {/* =====================================
            FOOTER
        ===================================== */}
        <footer
          className="
            mb-8
            mt-24

            border-t
            border-white/[0.07]

            pt-8
          "
        >
          <div
            className="
              flex
              flex-col
              gap-3

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <span
              className="
                text-xs
                text-neutral-700
              "
            >
              {PROFILE.name}
            </span>


            <span
              className="
                font-mono
                text-[9px]
                uppercase
                tracking-[0.12em]
                text-neutral-800
              "
            >
              {PROFILE.shortRole}
            </span>

          </div>
        </footer>

      </PageContainer>

    </div>
  )
}


/* =========================================
   RESUME SECTION
========================================= */

const ResumeSection = ({
  number,
  title,
  children,
}) => {
  return (
    <section
      className="
        mt-24

        grid
        gap-10

        lg:grid-cols-[180px_minmax(0,1fr)]
        lg:gap-20
      "
    >

      <div>
        <p
          className="
            text-xs
            uppercase
            tracking-[0.18em]
            text-neutral-600
          "
        >
          {number} / {title}
        </p>
      </div>


      <div className="min-w-0">
        {children}
      </div>

    </section>
  )
}


/* =========================================
   EXPERIENCE
========================================= */

const ResumeExperience = ({
  experience,
}) => {
  return (
    <article
      className="
        border-b
        border-white/[0.07]

        py-8
      "
    >

      <div
        className="
          flex
          flex-col
          gap-2

          sm:flex-row
          sm:items-baseline
          sm:justify-between
        "
      >

        <h2
          className="
            text-base
            text-neutral-200
          "
        >
          {experience.company}
        </h2>


        <span
          className="
            font-mono
            text-[10px]
            text-neutral-700
          "
        >
          {experience.location}
        </span>

      </div>


      <div className="mt-7 space-y-10">

        {experience.roles.map(
          (role) => (
            <div
              key={`${experience.id}-${role.title}`}
              className="
                grid
                gap-4

                md:grid-cols-[210px_minmax(0,1fr)]
              "
            >

              <div>

                <p
                  className="
                    text-sm
                    text-neutral-300
                  "
                >
                  {role.title}
                </p>


                <p
                  className="
                    mt-1

                    font-mono
                    text-[10px]
                    text-neutral-700
                  "
                >
                  {role.period}
                </p>

              </div>


              <div>

                <p
                  className="
                    text-sm
                    leading-6
                    text-neutral-600
                  "
                >
                  {role.description}
                </p>


                {role.highlights?.length > 0 && (
                  <ul className="mt-4 space-y-2">

                    {role.highlights.map(
                      (highlight) => (
                        <li
                          key={highlight}
                          className="
                            grid
                            grid-cols-[12px_minmax(0,1fr)]
                            gap-2

                            text-xs
                            leading-6
                            text-neutral-700
                          "
                        >
                          <span aria-hidden="true">
                            —
                          </span>

                          <span>
                            {highlight}
                          </span>
                        </li>
                      )
                    )}

                  </ul>
                )}

              </div>

            </div>
          )
        )}

      </div>

    </article>
  )
}


/* =========================================
   META
========================================= */

const ResumeMeta = ({
  label,
  value,
  href,
}) => {
  const content = (
    <>
      <p
        className="
          text-[9px]
          uppercase
          tracking-[0.18em]
          text-neutral-700
        "
      >
        {label}
      </p>


      <p
        className="
          mt-2
          break-all

          text-xs
          text-neutral-400
        "
      >
        {value}
      </p>
    </>
  )


  if (!href) {
    return (
      <div>
        {content}
      </div>
    )
  }


  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        transition-opacity
        duration-300

        hover:opacity-70
      "
    >
      {content}
    </a>
  )
}


export default Resume