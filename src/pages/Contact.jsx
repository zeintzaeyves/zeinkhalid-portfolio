import {
  useRef,
  useState,
} from "react"

import {
  ArrowUpRight,
  Check,
  Copy,
} from "lucide-react"

import PageContainer from "@/components/layout/PageContainer.jsx"
import PageHeader from "@/components/layout/PageHeader.jsx"
import PageIntro from "@/components/layout/PageIntro.jsx"

import {
  PROFILE,
} from "@/config/profile.js"


const WORK_AREAS = [
  "Full-Stack Development",
  "AI Applications",
  "Frontend Engineering",
  "UI / Web Design",
]


const Contact = () => {
  const [copied, setCopied] =
    useState(false)

  const resetTimerRef =
    useRef(null)


  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(
        PROFILE.email,
      )

      setCopied(true)

      clearTimeout(
        resetTimerRef.current,
      )

      resetTimerRef.current =
        setTimeout(() => {
          setCopied(false)
        }, 1600)
    } catch {
      window.location.href =
        `mailto:${PROFILE.email}`
    }
  }


  return (
    <div className="min-h-full bg-[#0b0b0c]">

      <PageHeader
        eyebrow="Profile / Contact"
        meta={`${PROFILE.location} · ${PROFILE.timezone}`}
      />


      <PageContainer>

        {/* =====================================
            INTRO
        ===================================== */}
        <PageIntro
          label="Contact"
          description={
            "For development work, collaborations, projects, or opportunities, you can reach me through the channels below."
          }
        >
          Building software

          <span className="text-neutral-600">
            {" "}from idea to product.
          </span>
        </PageIntro>


        {/* =====================================
            CONTACT
        ===================================== */}
        <section
          className="
            mt-20

            grid
            gap-10

            lg:grid-cols-[180px_minmax(0,1fr)]
            lg:gap-20
          "
        >

          <SectionLabel>
            01 / Contact
          </SectionLabel>


          <div className="border-t border-white/[0.07]">

            {/* EMAIL */}
            <div
              className="
                grid
                gap-3

                border-b
                border-white/[0.07]

                py-6

                md:grid-cols-[140px_minmax(0,1fr)_auto]
                md:items-center
              "
            >

              <ContactLabel>
                Email
              </ContactLabel>


              <a
                href={`mailto:${PROFILE.email}`}
                className="
                  min-w-0
                  break-all

                  text-sm
                  text-neutral-300

                  transition-colors
                  duration-300

                  hover:text-white
                "
              >
                {PROFILE.email}
              </a>


              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="
                  flex
                  w-fit
                  items-center
                  gap-2

                  text-xs
                  text-neutral-700

                  transition-colors
                  duration-300

                  hover:text-neutral-300
                "
              >
                {copied ? (
                  <>
                    <Check size={12} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    Copy
                  </>
                )}
              </button>

            </div>


            <ContactLink
              label="LinkedIn"
              display={
                PROFILE.socials.linkedin.display
              }
              href={
                PROFILE.socials.linkedin.url
              }
            />


            <ContactLink
              label="GitHub"
              display={
                PROFILE.socials.github.display
              }
              href={
                PROFILE.socials.github.url
              }
            />


            <ContactLink
              label="Instagram"
              display={
                PROFILE.socials.instagram.display
              }
              href={
                PROFILE.socials.instagram.url
              }
            />


            {/* LOCATION */}
            <div
              className="
                grid
                gap-3

                py-6

                md:grid-cols-[140px_minmax(0,1fr)_auto]
                md:items-center
              "
            >

              <ContactLabel>
                Location
              </ContactLabel>


              <span
                className="
                  text-sm
                  text-neutral-300
                "
              >
                {PROFILE.location}
              </span>


              <span
                className="
                  font-mono
                  text-[10px]
                  text-neutral-700
                "
              >
                {PROFILE.timezone}
              </span>

            </div>

          </div>

        </section>


        {/* =====================================
            WORK
        ===================================== */}
        <section
          className="
            mt-24

            grid
            gap-10

            lg:grid-cols-[180px_minmax(0,1fr)]
            lg:gap-20
          "
        >

          <SectionLabel>
            02 / Work
          </SectionLabel>


          <div className="border-t border-white/[0.07]">

            {WORK_AREAS.map(
              (item) => (
                <div
                  key={item}
                  className="
                    border-b
                    border-white/[0.07]

                    py-6

                    text-sm
                    text-neutral-400
                  "
                >
                  {item}
                </div>
              )
            )}

          </div>

        </section>


        {/* =====================================
            FINAL CTA
        ===================================== */}
        <section
          className="
            mb-8
            mt-28

            border-t
            border-white/[0.07]

            pt-10
          "
        >

          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-neutral-600
            "
          >
            Say hello
          </p>


          <a
            href={`mailto:${PROFILE.email}`}
            className="
              group

              mt-6

              inline-flex
              items-center
              gap-3

              text-2xl
              tracking-[-0.03em]
              text-neutral-300

              transition-colors
              duration-300

              hover:text-white

              md:text-3xl
            "
          >
            Start a conversation


            <ArrowUpRight
              size={20}
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

        </section>

      </PageContainer>

    </div>
  )
}


/* =========================================
   CONTACT LINK
========================================= */

const ContactLink = ({
  label,
  display,
  href,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group

        grid
        gap-3

        border-b
        border-white/[0.07]

        py-6

        md:grid-cols-[140px_minmax(0,1fr)_auto]
        md:items-center
      "
    >

      <ContactLabel>
        {label}
      </ContactLabel>


      <span
        className="
          text-sm
          text-neutral-300

          transition-colors
          duration-300

          group-hover:text-white
        "
      >
        {display}
      </span>


      <ArrowUpRight
        size={13}
        aria-hidden="true"
        className="
          text-neutral-800

          transition-[color,transform]
          duration-300

          group-hover:-translate-y-0.5
          group-hover:translate-x-0.5
          group-hover:text-neutral-300
        "
      />

    </a>
  )
}


/* =========================================
   SMALL HELPERS
========================================= */

const ContactLabel = ({
  children,
}) => {
  return (
    <span
      className="
        text-[10px]
        uppercase
        tracking-[0.14em]
        text-neutral-700
      "
    >
      {children}
    </span>
  )
}


const SectionLabel = ({
  children,
}) => {
  return (
    <div>
      <p
        className="
          text-xs
          uppercase
          tracking-[0.18em]
          text-neutral-600
        "
      >
        {children}
      </p>
    </div>
  )
}


export default Contact