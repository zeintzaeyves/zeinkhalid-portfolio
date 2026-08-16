import {
  useState,
} from "react"

import PageContainer from "@/components/layout/PageContainer.jsx"
import PageHeader from "@/components/layout/PageHeader.jsx"

import AcademicMap from "@/features/academic/components/AcademicMap.jsx"

import {
  ACADEMIC_COLLABORATIONS,
} from "@/data/academicCollaborations.js"


/* =====================================
   LOGO
===================================== */

const CollaborationLogo = ({
  item,
}) => {
  const [failed, setFailed] =
    useState(false)


  if (
    failed ||
    !item.logo
  ) {
    return (
      <span
        className="
          text-2xl
          font-semibold
          tracking-[-0.05em]

          text-neutral-500

          md:text-3xl
        "
      >
        {item.initials}
      </span>
    )
  }


  return (
    <img
      src={item.logo}
      alt={`${item.name} logo`}
      onError={() =>
        setFailed(true)
      }
      className="
        max-h-[54px]
        max-w-[155px]

        object-contain
        object-left

        grayscale
        opacity-50

        transition-all
        duration-300

        group-hover:grayscale-0
        group-hover:opacity-90
      "
    />
  )
}


/* =====================================
   PAGE
===================================== */

const AcademicWork = () => {
  return (
    <div
      className="
        min-h-full
        bg-[#0b0b0c]
      "
    >
      <PageHeader
        eyebrow="4+ / Academic Work"
        meta="Student & Client Projects"
      />


      <PageContainer>
        {/* =====================================
            INTRO
        ===================================== */}

        <section
          className="
            pb-14
            pt-0

            md:pb-16
          "
        >
          <p
            className="
              mb-6

              font-mono
              text-[10px]
              uppercase
              tracking-[0.2em]

              text-neutral-600
            "
          >
            Academic Collaborations
          </p>


          <h1
            className="
              max-w-[980px]

              text-[2.8rem]
              font-medium
              leading-[0.96]
              tracking-[-0.055em]

              text-neutral-100

              sm:text-[3.6rem]
              md:text-[4.2rem]
              lg:text-[4.8rem]
            "
          >
            Building with students

            <span
              className="
                block
                text-neutral-700
              "
            >
              from concept to implementation.
            </span>
          </h1>


          <p
            className="
              mt-8

              max-w-[820px]

              text-base
              leading-8

              text-neutral-400

              md:text-lg
            "
          >
            I've worked with student teams from
            different universities on thesis,
            capstone, and academic systems —
            contributing across frontend development,
            full-stack implementation, and AI-powered
            product experiences.
          </p>
        </section>


        {/* =====================================
            UNIVERSITIES
        ===================================== */}

        <section
          className="
            border-t
            border-white/[0.07]

            py-10
          "
        >
          <div
            className="
              mb-9

              flex
              items-center
              justify-between
            "
          >
            <p
              className="
                font-mono
                text-[9px]
                uppercase
                tracking-[0.2em]

                text-neutral-600
              "
            >
              Universities / Student Clients
            </p>


            <span
              className="
                font-mono
                text-[8px]
                uppercase
                tracking-[0.14em]

                text-neutral-700
              "
            >
              Selected affiliations
            </span>
          </div>


          <div
            className="
              grid
              gap-px

              sm:grid-cols-2
              xl:grid-cols-4
            "
          >
            {ACADEMIC_COLLABORATIONS.map(
              (item) => (
                <article
                  key={item.id}
                  className="
                    group

                    flex
                    min-h-[210px]
                    flex-col
                    justify-between

                    p-6

                    transition-colors
                    duration-300

                    hover:bg-white/[0.02]
                  "
                >
                  {/* LOGO */}

                  <div
                    className="
                      flex
                      min-h-[70px]
                      items-center
                    "
                  >
                    <CollaborationLogo
                      item={item}
                    />
                  </div>


                  {/* PROJECT */}

                  <div className="mt-10">
                    <h2
                      className="
                        text-sm
                        font-medium
                        leading-5

                        text-neutral-200
                      "
                    >
                      {item.name}
                    </h2>


                    <p
                      className="
                        mt-4

                        text-sm
                        leading-5

                        text-neutral-400
                      "
                    >
                      {item.work ??
                        item.project}
                    </p>


                    {item.work &&
                      item.project && (
                        <div
                          className="
                            mt-3

                            flex
                            items-center
                            gap-2
                          "
                        >
                          <span
                            className="
                              h-1
                              w-1

                              rounded-full

                              bg-blue-400
                            "
                          />


                          <span
                            className="
                              font-mono
                              text-[8px]
                              uppercase
                              tracking-[0.1em]

                              text-neutral-700
                            "
                          >
                            {item.project}
                          </span>
                        </div>
                      )}
                  </div>
                </article>
              ),
            )}
          </div>
        </section>


        {/* =====================================
            PROJECT FOOTPRINT
        ===================================== */}

        <section
          className="
            border-t
            border-white/[0.07]

            pt-10
          "
        >
          <div
            className="
              flex
              flex-col
              gap-4

              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <p
                className="
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.2em]

                  text-neutral-600
                "
              >
                Project Footprint
              </p>


              <p
                className="
                  mt-4
                  max-w-[650px]

                  text-sm
                  leading-7

                  text-neutral-500
                "
              >
                Academic and client work completed
                through direct and remote
                collaboration.
              </p>
            </div>


            <div
              className="
                flex
                items-center
                gap-5

                font-mono
                text-[8px]
                uppercase
                tracking-[0.14em]

                text-neutral-700
              "
            >
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5

                    rounded-full

                    bg-blue-400

                    shadow-[0_0_8px_rgba(96,165,250,0.8)]
                  "
                />

                Philippines
              </span>


              <span>
                Remote
              </span>
            </div>
          </div>


          {/* =====================================
              MAPCN MAP
          ===================================== */}

          <div
            className="
              mt-5
              w-full
            "
          >
            <AcademicMap />
          </div>
        </section>


        {/* =====================================
            SUMMARY
        ===================================== */}

        <section
          className="
            grid
            gap-x-8
            gap-y-8

            border-t
            border-white/[0.07]

            pt-10
            pb-10

            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          <div>
            <strong
              className="
                block

                text-2xl
                font-medium
                tracking-[-0.04em]

                text-neutral-200
              "
            >
              4+
            </strong>

            <span
              className="
                mt-1
                block

                text-xs

                text-neutral-600
              "
            >
              University affiliations
            </span>
          </div>


          <div>
            <strong
              className="
                block

                text-2xl
                font-medium
                tracking-[-0.04em]

                text-neutral-200
              "
            >
              Frontend
            </strong>

            <span
              className="
                mt-1
                block

                text-xs

                text-neutral-600
              "
            >
              Interface development
            </span>
          </div>


          <div>
            <strong
              className="
                block

                text-2xl
                font-medium
                tracking-[-0.04em]

                text-neutral-200
              "
            >
              Full-Stack
            </strong>

            <span
              className="
                mt-1
                block

                text-xs

                text-neutral-600
              "
            >
              Application development
            </span>
          </div>


          <div>
            <strong
              className="
                block

                text-2xl
                font-medium
                tracking-[-0.04em]

                text-neutral-200
              "
            >
              AI
            </strong>

            <span
              className="
                mt-1
                block

                text-xs

                text-neutral-600
              "
            >
              Product integration
            </span>
          </div>
        </section>


        {/* =====================================
            DISCLAIMER
        ===================================== */}

        <section
          className="
            flex
            flex-col
            gap-5

            py-7

            md:flex-row
            md:items-start
            md:justify-between
          "
        >
          <p
            className="
              max-w-[820px]

              font-mono
              text-[8px]
              leading-5
              tracking-[0.04em]

              text-neutral-700
            "
          >
            University names and logos indicate
            student affiliation only. Their
            inclusion does not imply institutional
            employment, endorsement, sponsorship,
            or an official university partnership.
          </p>


          <span
            className="
              shrink-0

              font-mono
              text-[8px]
              uppercase
              tracking-[0.16em]

              text-neutral-700
            "
          >
            Student / Client Work
          </span>
        </section>
      </PageContainer>
    </div>
  )
}


export default AcademicWork