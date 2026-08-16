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


const SWIPE_DISTANCE = 70


const PortfolioSidebar = ({
  activePage,
  onNavigate,
  onOpenTalk,
  mobileOpen,
  onMobileClose,
  isDesktop,
}) => {
  const sidebarRef =
    useRef(null)

  const touchStartXRef =
    useRef(null)

  const touchEndXRef =
    useRef(null)


  const sidebarHidden =
    !isDesktop &&
    !mobileOpen


  /*
   * Keep normal pages together.
   * Talk to Zein is rendered separately
   * at the end of the navigation.
   */
  const pageItems =
    NAVIGATION_ITEMS.filter(
      (item) =>
        item.action !== "talk",
    )

  const talkItem =
    NAVIGATION_ITEMS.find(
      (item) =>
        item.action === "talk",
    )


  /* =====================================
     NAVIGATION
  ===================================== */

  const handleNavigation = (
    item,
  ) => {
    if (
      item.action === "talk"
    ) {
      onOpenTalk?.()
      onMobileClose?.()
      return
    }

    onNavigate?.(item.id)
    onMobileClose?.()
  }


  const handleProfileClick =
    () => {
      onNavigate?.("home")
      onMobileClose?.()
    }


  /* =====================================
     SWIPE LEFT TO CLOSE
  ===================================== */

  const handleTouchStart = (
    event,
  ) => {
    if (isDesktop) {
      return
    }

    const x =
      event.touches[0].clientX

    touchStartXRef.current = x
    touchEndXRef.current = x
  }


  const handleTouchMove = (
    event,
  ) => {
    if (isDesktop) {
      return
    }

    touchEndXRef.current =
      event.touches[0].clientX
  }


  const handleTouchEnd = () => {
    if (
      isDesktop ||
      touchStartXRef.current ===
        null ||
      touchEndXRef.current ===
        null
    ) {
      return
    }


    const distance =
      touchEndXRef.current -
      touchStartXRef.current


    if (
      distance <
      -SWIPE_DISTANCE
    ) {
      onMobileClose?.()
    }


    touchStartXRef.current =
      null

    touchEndXRef.current =
      null
  }


  /* =====================================
     MOBILE INITIAL FOCUS
  ===================================== */

  useEffect(() => {
    if (
      isDesktop ||
      !mobileOpen
    ) {
      return
    }


    const sidebar =
      sidebarRef.current

    if (!sidebar) {
      return
    }


    const firstFocusable =
      sidebar.querySelector(
        "button:not([disabled]), a[href]",
      )


    requestAnimationFrame(() => {
      firstFocusable?.focus()
    })
  }, [
    mobileOpen,
    isDesktop,
  ])


  /* =====================================
     MOBILE FOCUS TRAP
  ===================================== */

  useEffect(() => {
    if (
      isDesktop ||
      !mobileOpen
    ) {
      return
    }


    const sidebar =
      sidebarRef.current

    if (!sidebar) {
      return
    }


    const handleKeyDown = (
      event,
    ) => {
      if (
        event.key !== "Tab"
      ) {
        return
      }


      const focusable =
        Array.from(
          sidebar.querySelectorAll(
            `
              button:not([disabled]),
              a[href],
              input:not([disabled]),
              textarea:not([disabled]),
              select:not([disabled]),
              [tabindex]:not([tabindex="-1"])
            `,
          ),
        )


      if (!focusable.length) {
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


    sidebar.addEventListener(
      "keydown",
      handleKeyDown,
    )

    return () => {
      sidebar.removeEventListener(
        "keydown",
        handleKeyDown,
      )
    }
  }, [
    mobileOpen,
    isDesktop,
  ])


  return (
    <aside
      ref={sidebarRef}
      id="portfolio-navigation"
      inert={
        sidebarHidden
          ? true
          : undefined
      }
      onTouchStart={
        handleTouchStart
      }
      onTouchMove={
        handleTouchMove
      }
      onTouchEnd={
        handleTouchEnd
      }
      className={`
        fixed
        inset-y-0
        left-0
        z-50

        flex
        w-[min(320px,calc(100vw-24px))]
        flex-col

        border-r
        border-white/[0.07]

        bg-[#0f0f10]

        transition-transform
        duration-300
        ease-out

        touch-pan-y

        lg:w-[320px]

        ${
          isDesktop ||
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
      `}
    >
      {/* =====================================
          PROFILE
      ===================================== */}

      <div
        className="
          border-b
          border-white/[0.07]

          px-5
          pb-8
          pt-10

          sm:px-6
          lg:px-7
        "
      >
        <button
          type="button"
          onClick={
            handleProfileClick
          }
          className="
            flex
            w-full
            items-center
            gap-4

            text-left
          "
        >
          <img
            src={profileImage}
            alt=""
            width="52"
            height="52"
            className="
              h-12
              w-12
              shrink-0
              rounded-full
              object-cover
            "
          />


          <div className="min-w-0">
            <p
              className="
                truncate
                text-sm
                font-medium
                tracking-[-0.02em]
                text-neutral-100
              "
            >
              {PROFILE.name}
            </p>


            <div
              className="
                mt-1
                text-xs
                leading-5
                text-neutral-600
              "
            >
              <p>
                Full-Stack Developer
              </p>

              <p>
                AI Application Developer
              </p>
            </div>
          </div>
        </button>
      </div>


      {/* =====================================
          NAVIGATION
      ===================================== */}

      <nav
        aria-label="Portfolio navigation"
        className="
          flex-1
          overflow-y-auto

          px-5
          py-7

          sm:px-6
          lg:px-7
        "
      >
        <p
          className="
            mb-3

            font-mono
            text-[9px]
            uppercase
            tracking-[0.2em]
            text-neutral-700
          "
        >
          Navigation
        </p>


        {/* NORMAL PAGES */}

        <div>
          {pageItems.map(
            (item) => {
              const isActive =
                activePage ===
                item.id


              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    handleNavigation(
                      item,
                    )
                  }
                  className={`
                    group

                    flex
                    min-h-11
                    w-full
                    items-center

                    text-left

                    transition-colors
                    duration-200

                    ${
                      isActive
                        ? "text-white"
                        : "text-neutral-500 hover:text-neutral-200"
                    }
                  `}
                >
                  <span
                    className="
                      w-9
                      shrink-0

                      font-mono
                      text-[8px]
                      text-neutral-700
                    "
                  >
                    {item.number}
                  </span>


                  <span
                    className="
                      flex-1
                      text-sm
                    "
                  >
                    {item.label}
                  </span>


                  <span
                    className="
                      ml-3

                      font-mono
                      text-[8px]
                      tracking-[0.06em]
                      text-neutral-700

                      transition-colors
                      duration-200

                      group-hover:text-neutral-500
                    "
                  >
                    {
                      item.shortcut
                        ?.display
                    }
                  </span>
                </button>
              )
            },
          )}
        </div>


        {/* =====================================
            TALK TO ZEIN
            SMALL + LAST ITEM
        ===================================== */}

        {talkItem && (
          <button
            type="button"
            onClick={() =>
              handleNavigation(
                talkItem,
              )
            }
            className="
              group

              mt-5

              flex
              min-h-10
              w-full
              items-center

              border-t
              border-white/[0.06]

              pt-5

              text-left
              text-neutral-600

              transition-colors
              duration-200

              hover:text-neutral-300
            "
          >
            <span
              className="
                flex-1

                font-mono
                text-[9px]
                uppercase
                tracking-[0.14em]
              "
            >
              Talk to Zein
            </span>


            <span
              className="
                font-mono
                text-[8px]
                tracking-[0.06em]
                text-neutral-700
              "
            >
              Ctrl + J
            </span>
          </button>
        )}
      </nav>


      {/* =====================================
          FOOTER
      ===================================== */}

      <div
        className="
          border-t
          border-white/[0.07]

          px-5
          pb-5
          pt-5

          sm:px-6
          lg:px-7
        "
      >
        <p
          className="
            mb-5

            font-mono
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
            flex
            flex-wrap
            gap-x-5
            gap-y-3
          "
        >
          {Object.values(
            PROFILE.socials,
          ).map((social) => (
            <a
              key={
                social.label
              }
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="
                text-xs
                font-medium
                text-neutral-300

                transition-colors
                duration-200

                hover:text-white
              "
            >
              {social.label}
            </a>
          ))}
        </div>


        <div
          className="
            mt-5

            flex
            justify-between

            border-t
            border-white/[0.06]

            pt-4

            font-mono
            text-[8px]
            text-neutral-700
          "
        >
          <span>
            {PROFILE.location}
          </span>

          <span>
            {PROFILE.timezone}
          </span>
        </div>
      </div>
    </aside>
  )
}


export default PortfolioSidebar