const ExperienceEntry = ({
  experience,
  isLast = false,
}) => {
  const hasMultipleRoles =
    experience.roles.length > 1


  return (
    <article
      className={`
        grid
        gap-6
        py-10

        md:grid-cols-[70px_minmax(0,1fr)]

        ${
          !isLast
            ? "border-b border-white/[0.07]"
            : ""
        }
      `}
    >

      {/* =====================================
          COMPANY MARK
      ===================================== */}
      <div className="relative">

        <span
          className="
            font-mono
            text-[10px]
            tracking-[0.12em]
            text-neutral-700
          "
        >
          {experience.initials}
        </span>

      </div>


      {/* =====================================
          CONTENT
      ===================================== */}
      <div className="min-w-0">

        {/* COMPANY */}
        <div
          className="
            flex
            flex-col
            gap-2

            sm:flex-row
            sm:items-start
            sm:justify-between
          "
        >

          <div>

            <h2
              className="
                text-xl
                tracking-[-0.025em]
                text-neutral-100

                md:text-2xl
              "
            >
              {experience.company}
            </h2>


            <p
              className="
                mt-2
                text-xs
                text-neutral-600
              "
            >
              {experience.type}
            </p>

          </div>


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


        {/* =====================================
            ROLES
        ===================================== */}
        <div className="mt-9">

          {experience.roles.map(
            (role, index) => (
              <Role
                key={`${experience.id}-${role.title}`}
                role={role}
                showTimeline={hasMultipleRoles}
                isLast={
                  index ===
                  experience.roles.length - 1
                }
              />
            )
          )}

        </div>

      </div>

    </article>
  )
}


/* =========================================
   ROLE
========================================= */

const Role = ({
  role,
  showTimeline,
  isLast,
}) => {
  return (
    <div
      className={`
        relative

        ${
          showTimeline
            ? "pl-7"
            : ""
        }

        ${
          !isLast
            ? "pb-12"
            : ""
        }
      `}
    >

      {/* TIMELINE */}
      {showTimeline && (
        <>
          <span
            className="
              absolute
              left-0
              top-[7px]

              h-[5px]
              w-[5px]

              rounded-full
              bg-neutral-500
            "
          />

          {!isLast && (
            <span
              className="
                absolute
                bottom-0
                left-[2px]
                top-[16px]

                w-px

                bg-white/[0.07]
              "
            />
          )}
        </>
      )}


      {/* TITLE + PERIOD */}
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

        <h3
          className="
            text-base
            text-neutral-200
          "
        >
          {role.title}
        </h3>


        <span
          className="
            font-mono
            text-[10px]
            text-neutral-700
          "
        >
          {role.period}
        </span>

      </div>


      {/* DESCRIPTION */}
      <p
        className="
          mt-4
          max-w-3xl

          text-sm
          leading-7
          text-neutral-500
        "
      >
        {role.description}
      </p>


      {/* HIGHLIGHTS */}
      {role.highlights?.length > 0 && (
        <ul
          className="
            mt-6
            max-w-3xl
            space-y-3
          "
        >

          {role.highlights.map(
            (highlight) => (
              <li
                key={highlight}
                className="
                  grid
                  grid-cols-[12px_1fr]

                  gap-3

                  text-sm
                  leading-6
                  text-neutral-600
                "
              >

                <span
                  aria-hidden="true"
                  className="
                    pt-[1px]
                    text-neutral-800
                  "
                >
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


      {/* SKILLS */}
      {role.skills?.length > 0 && (
        <div
          className="
            mt-7

            flex
            flex-wrap

            gap-x-5
            gap-y-2
          "
        >

          {role.skills.map(
            (skill) => (
              <span
                key={skill}
                className="
                  font-mono
                  text-[10px]
                  text-neutral-700
                "
              >
                {skill}
              </span>
            )
          )}

        </div>
      )}

    </div>
  )
}


export default ExperienceEntry