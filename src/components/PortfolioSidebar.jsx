import {
  useEffect,
  useRef,
} from "react"

import profileImage from "@/assets/images/profile.jpg"

import {
  NAVIGATION_ITEMS,
} from "@/config/navigation.js"

import {
  PROFILE,
} from "@/config/profile.js"


const SOCIAL_LINKS =
  Object.values(
    PROFILE.socials,
  )


const getFocusableElements = (
  container,
) => {
  if (!container) {
    return []
  }


  return Array.from(
    container.querySelectorAll(
      `
        a[href],
        button:not([disabled]),
        input:not([disabled]),
        textarea:not([disabled]),
        select:not([disabled]),
        [tabindex]:not([tabindex="-1"])
      `,
    ),
  ).filter(
    (element) =>
      element.getClientRects().length > 0,
  )
}


const PortfolioSidebar = ({
  activePage,
  setActivePage,

  onOpenTalk,

  mobileOpen = false,
  onClose,

  isDesktop = true,
}) => {
  const sidebarRef =
    useRef(null)

  const closeButtonRef =
    useRef(null)

  const previousFocusRef =
    useRef(null)


  /* =====================================
     MOBILE FOCUS MANAGEMENT
  ===================================== */

  useEffect(() => {
    if (
      !mobileOpen ||
      isDesktop
    ) {
      return
    }


    previousFocusRef.current =
      document.activeElement


    const focusTimer =
      window.setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 50)


    const sidebar =
      sidebarRef.current


    const handleKeyDown = (
      event,
    ) => {
      if (
        event.key !== "Tab"
      ) {
        return
      }


      const focusable =
        getFocusableElements(
          sidebar,
        )


      if (
        focusable.length === 0
      ) {
        event.preventDefault()

        return
      }


      const first =
        focusable[0]

      const last =
        focusable[
          focusable.length - 1
        ]


      if (
        event.shiftKey &&
        document.activeElement ===
          first
      ) {
        event.preventDefault()

        last.focus()

        return
      }


      if (
        !event.shiftKey &&
        document.activeElement ===
          last
      ) {
        event.preventDefault()

        first.focus()
      }
    }


    sidebar?.addEventListener(
      "keydown",
      handleKeyDown,
    )


    return () => {
      clearTimeout(
        focusTimer,
      )


      sidebar?.removeEventListener(
        "keydown",
        handleKeyDown,
      )


      const previous =
        previousFocusRef.current


      if (
        previous &&
        document.contains(previous) &&
        !previous.closest("[inert]")
      ) {
        previous.focus()
      }
    }
  }, [
    mobileOpen,
    isDesktop,
  ])


  /* =====================================
     NAVIGATION
  ===================================== */

  const handleNavigation = (
    item,
  ) => {
    if (
      item.action === "talk"
    ) {
      onOpenTalk()

      return
    }


    setActivePage(
      item.id,
    )
  }


  const isActive = (item) =>
    item.action === "page" &&
    activePage === item.id


  const sidebarHidden =
    !isDesktop &&
    !mobileOpen


  return (
<aside
  ref={sidebarRef}

  id="portfolio-navigation"

  aria-label="Portfolio navigation"

  inert={
    sidebarHidden
      ? true
      : undefined
  }

  className={`
    fixed
    inset-y-0
    left-0
    z-50

    flex
    h-[100dvh]

    w-[min(86vw,320px)]
    shrink-0
    flex-col

    border-r
    border-white/[0.07]

    bg-[#0f0f10]

    transition-transform
    duration-300

    ease-[cubic-bezier(0.22,1,0.36,1)]

    lg:static
    lg:z-auto
    lg:w-[320px]
    lg:translate-x-0
    lg:pointer-events-auto
    lg:transition-none

    ${
      mobileOpen
        ? `
          translate-x-0
          pointer-events-auto
        `
        : `
          -translate-x-full
          pointer-events-none

          lg:translate-x-0
          lg:pointer-events-auto
        `
    }
  `}
>

      {/* =====================================
          PROFILE
      ===================================== */}
      <header
        className="
          shrink-0

          border-b
          border-white/[0.07]

          px-5
          pb-5
          pt-5
        "
      >

        {/* MOBILE CLOSE */}
        <div
          className="
            mb-4

            flex
            justify-end

            lg:hidden
          "
        >
          <button
            ref={closeButtonRef}

            type="button"

            onClick={onClose}

            aria-label="Close navigation"

            className="
              flex
              min-h-11
              items-center

              font-mono
              text-[10px]
              uppercase
              tracking-[0.12em]

              text-neutral-600

              transition-colors
              duration-300

              hover:text-white
            "
          >
            Close
          </button>
        </div>


        {/* PROFILE */}
        <button
          type="button"

          onClick={() =>
            setActivePage("home")
          }

          className="
            group

            flex
            w-full
            items-center
            gap-4

            text-left
          "
        >

          <div
            className="
              h-[50px]
              w-[50px]
              shrink-0

              overflow-hidden
              rounded-full

              bg-[#171718]
            "
          >
            <img
              src={profileImage}
              alt={PROFILE.name}

              loading="eager"
              decoding="async"

              className="
                h-full
                w-full

                object-cover
                object-center

                transition-opacity
                duration-300

                group-hover:opacity-90
              "
            />
          </div>


          <div className="min-w-0">

            <h1
              className="
                truncate

                text-[14px]
                font-medium
                leading-tight

                tracking-[-0.02em]

                text-neutral-100

                transition-colors
                duration-300

                group-hover:text-white
              "
            >
              {PROFILE.name}
            </h1>


            <div className="mt-2">

              {PROFILE.roles.map(
                (
                  role,
                  index,
                ) => (
                  <p
                    key={role}
                    className={`
                      text-[11px]
                      leading-[1.6]

                      ${
                        index === 0
                          ? "text-neutral-500"
                          : "text-neutral-600"
                      }
                    `}
                  >
                    {role}
                  </p>
                ),
              )}

            </div>

          </div>

        </button>

      </header>


      {/* =====================================
          NAVIGATION
      ===================================== */}
      <div
        className="
          flex
          min-h-0
          flex-1
          flex-col
        "
      >

        <div
          className="
            shrink-0

            px-5
            pb-3
            pt-7
          "
        >
          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.2em]

              text-neutral-600
            "
          >
            Navigation
          </p>
        </div>


        <nav
          className="
            custom-scroll

            min-h-0
            flex-1

            overflow-y-auto

            px-5
            pb-6
          "
          aria-label="Pages"
        >

          {NAVIGATION_ITEMS.map(
            (item) => {
              const active =
                isActive(item)


              return (
                <button
                  key={item.id}

                  type="button"

                  onClick={() =>
                    handleNavigation(
                      item,
                    )
                  }

                  aria-current={
                    active
                      ? "page"
                      : undefined
                  }

                  className="
                    group

                    flex
                    min-h-11
                    w-full
                    items-center

                    text-left
                  "
                >

                  <span
                    className={`
                      w-9
                      shrink-0

                      font-mono
                      text-[9px]
                      tracking-[0.08em]

                      transition-colors
                      duration-300

                      ${
                        active
                          ? "text-neutral-500"
                          : `
                            text-neutral-700
                            group-hover:text-neutral-500
                          `
                      }
                    `}
                  >
                    {item.number}
                  </span>


                  <span
                    className={`
                      text-[13px]

                      transition-colors
                      duration-300

                      ${
                        active
                          ? "text-white"
                          : `
                            text-neutral-500
                            group-hover:text-neutral-200
                          `
                      }
                    `}
                  >
                    {item.label}
                  </span>


                  <span
                    className={`
                      ml-auto

                      font-mono
                      text-[9px]

                      tracking-[0.03em]

                      transition-colors
                      duration-300

                      ${
                        active
                          ? "text-neutral-500"
                          : `
                            text-neutral-700
                            group-hover:text-neutral-500
                          `
                      }
                    `}
                  >
                    {item.shortcut.display}
                  </span>

                </button>
              )
            },
          )}

        </nav>

      </div>


      {/* =====================================
          FOOTER
      ===================================== */}
      <footer
        className="
          shrink-0

          border-t
          border-white/[0.07]

          px-5
          pb-4
          pt-4
        "
      >

        <p
          className="
            text-[9px]
            uppercase
            tracking-[0.2em]

            text-neutral-700
          "
        >
          Elsewhere
        </p>


        <div
          className="
            mt-2

            flex
            items-center
            gap-4
          "
        >

          {SOCIAL_LINKS.map(
            (social) => (
              <a
                key={social.label}

                href={social.url}

                target="_blank"
                rel="noopener noreferrer"

                aria-label={
                  `${social.label}, opens in a new tab`
                }

                className="
                  inline-flex
                  min-h-11
                  items-center

                  text-[11px]
                  text-neutral-600

                  transition-colors
                  duration-300

                  hover:text-neutral-200
                "
              >
                {social.label}
              </a>
            ),
          )}

        </div>


        <div
          className="
            border-t
            border-white/[0.05]

            pt-4
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-5
            "
          >

            <span
              className="
                text-[10px]
                text-neutral-600
              "
            >
              {PROFILE.location}
            </span>


            <span
              className="
                font-mono
                text-[9px]
                text-neutral-700
              "
            >
              {PROFILE.timezone}
            </span>

          </div>
        </div>

      </footer>

    </aside>
  )
}


export default PortfolioSidebar