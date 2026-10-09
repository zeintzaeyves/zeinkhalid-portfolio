import { useRef, useState } from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MapPin,
} from "lucide-react"

import PageContainer from "@/components/layout/PageContainer.jsx"
import PageHeader from "@/components/layout/PageHeader.jsx"
import PageIntro from "@/components/layout/PageIntro.jsx"

import { PROFILE } from "@/config/profile.js"

const WORK_AREAS = [
  "Full-Stack Development",
  "AI Applications",
  "Frontend Engineering",
  "UI / Web Design",
]

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    display: PROFILE.socials.linkedin.display,
    href: PROFILE.socials.linkedin.url,
    number: "01",
  },
  {
    label: "GitHub",
    display: PROFILE.socials.github.display,
    href: PROFILE.socials.github.url,
    number: "02",
  },
  {
    label: "Instagram",
    display: PROFILE.socials.instagram.display,
    href: PROFILE.socials.instagram.url,
    number: "03",
  },
]

const Contact = () => {
  const [copied, setCopied] = useState(false)
  const resetTimerRef = useRef(null)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)

      setCopied(true)
      clearTimeout(resetTimerRef.current)

      resetTimerRef.current = setTimeout(() => {
        setCopied(false)
      }, 1600)
    } catch {
      window.location.href = `mailto:${PROFILE.email}`
    }
  }

  return (
    <div className="min-h-full bg-[#0b0b0c] text-white">
      <PageHeader
        eyebrow="Profile / Contact"
        meta={`${PROFILE.location} · ${PROFILE.timezone}`}
      />

      <PageContainer>
        {/* INTRO */}
        <PageIntro
          label="Contact"
          description="Have a project in mind, an interesting opportunity, or just want to connect? My inbox is open."
        >
          Let&apos;s make
          <span className="text-neutral-600">
            {" "}something meaningful.
          </span>
        </PageIntro>

        {/* FEATURED EMAIL CTA */}
        <section className="mt-16 md:mt-24">
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#111113] p-6 md:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/[0.035] blur-3xl transition-colors duration-500 group-hover:bg-white/[0.06]" />

            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-neutral-500">
                  Contact / Get in touch
                </p>

                <Mail
                  size={16}
                  strokeWidth={1.4}
                  className="text-neutral-600"
                />
              </div>

              <p className="mt-12 max-w-2xl text-3xl font-medium leading-[1.1] tracking-[-0.055em] md:mt-16 md:text-5xl lg:text-6xl">
                Have something
                <br />
                <span className="text-neutral-600">
                  in mind?
                </span>
              </p>

              <div className="mt-10 flex flex-col gap-5 border-t border-white/[0.08] pt-6 md:flex-row md:items-end md:justify-between">
                <div className="min-w-0">
                  <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-600">
                    Send me an email
                  </p>

                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="break-all text-sm text-neutral-300 transition-colors duration-300 hover:text-white md:text-base"
                  >
                    {PROFILE.email}
                  </a>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.1] px-4 text-xs text-neutral-400 transition-colors hover:border-white/25 hover:text-white"
                  >
                    {copied ? (
                      <>
                        <Check size={13} />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        Copy email
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${PROFILE.email}`}
                    aria-label="Email me"
                    className="group/mail flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.03] text-neutral-400 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white active:scale-95"
                  >
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover/mail:-translate-y-0.5 group-hover/mail:translate-x-0.5"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL LINKS + LOCATION */}
        <section className="mt-20 grid gap-12 md:mt-28 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-20">
          <SectionLabel>01 / Find me</SectionLabel>

          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-neutral-500">
                Around the internet
              </p>

              <ArrowDownRight
                size={15}
                className="text-neutral-700"
              />
            </div>

            <div className="border-t border-white/[0.08]">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-3 border-b border-white/[0.08] py-5 transition-colors duration-300 hover:border-white/20 md:grid-cols-[56px_minmax(0,1fr)_minmax(0,1fr)_auto]"
                >
                  <span className="font-mono text-[10px] text-neutral-700">
                    {social.number}
                  </span>

                  <span className="text-base tracking-tight text-neutral-300 transition-colors duration-300 group-hover:text-white md:text-lg">
                    {social.label}
                  </span>

                  <span className="hidden truncate text-sm text-neutral-600 md:block">
                    {social.display}
                  </span>

                  <ArrowUpRight
                    size={15}
                    className="text-neutral-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                  />
                </a>
              ))}
            </div>

            {/* LOCATION */}
            <div className="mt-10 flex flex-col gap-5 rounded-xl border border-white/[0.07] bg-white/[0.015] p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
              <div className="flex items-start gap-3">
                <MapPin
                  size={15}
                  strokeWidth={1.5}
                  className="mt-0.5 text-neutral-600"
                />

                <div>
                  <p className="text-sm text-neutral-300">
                    {PROFILE.location}
                  </p>

                  <p className="mt-1 text-xs text-neutral-600">
                    Based here, working everywhere.
                  </p>
                </div>
              </div>

              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-600">
                {PROFILE.timezone}
              </span>
            </div>
          </div>
        </section>

        {/* AREAS OF WORK */}
        <section className="mt-20 grid gap-12 border-t border-white/[0.08] pt-10 md:mt-28 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-20">
          <SectionLabel>02 / What I do</SectionLabel>

          <div>
            <p className="mb-7 max-w-lg text-sm leading-7 text-neutral-500">
              From the first idea to the final interface, these are the areas where I can contribute.
            </p>

            <div className="grid gap-2 sm:grid-cols-2">
              {WORK_AREAS.map((item, index) => (
                <div
                  key={item}
                  className="group flex min-h-[100px] items-end justify-between rounded-xl border border-white/[0.07] bg-[#101011] p-5 transition-colors duration-300 hover:border-white/[0.15] hover:bg-[#141415] md:min-h-[125px] md:p-6"
                >
                  <div>
                    <p className="mb-3 font-mono text-[9px] text-neutral-700">
                      0{index + 1}
                    </p>

                    <p className="text-sm text-neutral-300 transition-colors group-hover:text-white md:text-base">
                      {item}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={14}
                    className="text-neutral-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <footer className="mb-8 mt-24 border-t border-white/[0.08] pt-6 md:mt-32">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-600">
                Have a good one
              </p>

              <p className="mt-3 text-2xl font-medium tracking-[-0.04em] text-neutral-300 md:text-3xl">
                Thanks for stopping by.
              </p>
            </div>

            <a
              href={`mailto:${PROFILE.email}`}
              className="group inline-flex w-fit items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-white"
            >
              Say hello

              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-neutral-700">
              {PROFILE.name}
            </p>

            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-neutral-700">
              {PROFILE.location} · {PROFILE.timezone}
            </p>
          </div>
        </footer>
      </PageContainer>
    </div>
  )
}

const SectionLabel = ({ children }) => (
  <div>
    <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-600">
      {children}
    </p>
  </div>
)

export default Contact