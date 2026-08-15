import {
  lazy,
  Suspense,
  useEffect,
  useState,
} from "react"

import {
  Menu,
} from "lucide-react"

import PortfolioSidebar from "@/components/PortfolioSidebar.jsx"
import { NAVIGATION_ITEMS } from "@/config/navigation.js"
import useDocumentTitle from "@/hooks/useDocumentTitle.js"

import Home from "@/pages/Home.jsx"


/* =====================================
   LAZY PAGES
===================================== */

const AboutMe = lazy(
  () => import("@/pages/AboutMe.jsx"),
)

const Experience = lazy(
  () => import("@/pages/Experience.jsx"),
)

const SelectedWork = lazy(
  () => import("@/pages/SelectedWork.jsx"),
)

const TechStack = lazy(
  () => import("@/pages/TechStack.jsx"),
)

const Certifications = lazy(
  () => import("@/pages/Certifications.jsx"),
)

const Resume = lazy(
  () => import("@/pages/Resume.jsx"),
)

const Contact = lazy(
  () => import("@/pages/Contact.jsx"),
)

const TalkToZeinOverlay = lazy(
  () =>
    import(
      "@/components/TalkToZeinOverlay.jsx"
    ),
)


/* =====================================
   PAGE REGISTRY
===================================== */

const PAGE_COMPONENTS = {
  home: Home,
  about: AboutMe,
  experience: Experience,
  projects: SelectedWork,
  stack: TechStack,
  certifications: Certifications,
  resume: Resume,
  contact: Contact,
}


/* =====================================
   FALLBACK
===================================== */

const PageFallback = () => {
  return (
    <div
      className="
        min-h-dvh
        bg-[#0b0b0c]
      "
      role="status"
      aria-label="Loading page"
    />
  )
}


/* =====================================
   APP SHELL
===================================== */

const AppShell = () => {
  const [
    activePage,
    setActivePage,
  ] = useState("home")

  const [
    talkOpen,
    setTalkOpen,
  ] = useState(false)

  const [
    talkLoaded,
    setTalkLoaded,
  ] = useState(false)

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false)

  const [
    isDesktop,
    setIsDesktop,
  ] = useState(() => {
    if (
      typeof window === "undefined"
    ) {
      return true
    }

    return window.matchMedia(
      "(min-width: 1024px)",
    ).matches
  })


  useDocumentTitle(activePage)


  /* =====================================
     RESPONSIVE SIDEBAR
  ===================================== */

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(
        "(min-width: 1024px)",
      )

    const handleChange = (
      event,
    ) => {
      setIsDesktop(
        event.matches,
      )

      if (event.matches) {
        setSidebarOpen(false)
      }
    }

    setIsDesktop(
      mediaQuery.matches,
    )

    mediaQuery.addEventListener(
      "change",
      handleChange,
    )

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange,
      )
    }
  }, [])


  /* =====================================
     NAVIGATION
  ===================================== */

  const navigateTo = (
    page,
  ) => {
    setActivePage(page)

    setSidebarOpen(false)
  }


  /* =====================================
     TALK TO ZEIN
  ===================================== */

  const openTalk = () => {
    setTalkLoaded(true)

    setSidebarOpen(false)

    setTalkOpen(true)
  }

  const closeTalk = () => {
    setTalkOpen(false)
  }


  /* =====================================
     KEYBOARD SHORTCUTS
  ===================================== */

  useEffect(() => {
    const handleKeyDown = (
      event,
    ) => {
      const target =
        event.target

      const isTyping =
        target instanceof
          HTMLInputElement ||
        target instanceof
          HTMLTextAreaElement ||
        target?.isContentEditable


      /* ESCAPE */

      if (
        event.key === "Escape"
      ) {
        if (talkOpen) {
          closeTalk()
          return
        }

        if (
          sidebarOpen &&
          !isDesktop
        ) {
          setSidebarOpen(false)
          return
        }

        if (
          activePage !== "home"
        ) {
          navigateTo("home")
        }

        return
      }


      /* DISABLE SHORTCUTS
         WHILE TALK IS OPEN */

      if (talkOpen) {
        return
      }


      /* DON'T INTERRUPT
         NORMAL TYPING */

      if (
        isTyping &&
        !event.altKey &&
        !event.ctrlKey &&
        !event.metaKey
      ) {
        return
      }


      const matchedItem =
        NAVIGATION_ITEMS.find(
          (item) => {
            const shortcut =
              item.shortcut

            if (!shortcut) {
              return false
            }

            return (
              event.key.toLowerCase() ===
                shortcut.key.toLowerCase() &&
              Boolean(
                event.altKey,
              ) ===
                Boolean(
                  shortcut.altKey,
                ) &&
              Boolean(
                event.ctrlKey,
              ) ===
                Boolean(
                  shortcut.ctrlKey,
                )
            )
          },
        )


      if (!matchedItem) {
        return
      }

      event.preventDefault()


      if (
        matchedItem.action ===
        "talk"
      ) {
        openTalk()
        return
      }

      navigateTo(
        matchedItem.id,
      )
    }


    window.addEventListener(
      "keydown",
      handleKeyDown,
    )

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      )
    }
  }, [
    activePage,
    talkOpen,
    sidebarOpen,
    isDesktop,
  ])


  /* =====================================
     ACTIVE PAGE
  ===================================== */

  const ActivePage =
    PAGE_COMPONENTS[
      activePage
    ] ?? Home


  return (
    <div
      className="
        relative
        min-h-dvh
        overflow-hidden
        bg-[#0b0b0c]
        text-white
      "
    >
      {/* =================================
          DESKTOP / MOBILE SIDEBAR
      ================================= */}

      <PortfolioSidebar
        activePage={
          activePage
        }
        onNavigate={
          navigateTo
        }
        onOpenTalk={
          openTalk
        }
        mobileOpen={
          sidebarOpen
        }
        onMobileClose={() =>
          setSidebarOpen(false)
        }
        isDesktop={
          isDesktop
        }
      />


      {/* =================================
          MOBILE BACKDROP
      ================================= */}

      {!isDesktop &&
        sidebarOpen && (
          <button
            type="button"
            onClick={() =>
              setSidebarOpen(
                false,
              )
            }
            className="
              fixed
              inset-0
              z-40
              bg-black/70
              backdrop-blur-[2px]

              lg:hidden
            "
            aria-label="Close navigation"
          />
        )}


      {/* =================================
          MOBILE MENU BUTTON
      ================================= */}

      {!isDesktop &&
        !sidebarOpen &&
        !talkOpen && (
          <button
            type="button"
            onClick={() =>
              setSidebarOpen(
                true,
              )
            }
            aria-expanded={
              sidebarOpen
            }
            aria-controls="portfolio-navigation"
            className="
              fixed
              left-4
              top-4
              z-[70]

              inline-flex
              min-h-11
              items-center
              gap-2

              border
              border-white/[0.10]

              bg-[#0f0f10]/95

              px-3.5

              text-xs
              font-medium
              uppercase
              tracking-[0.14em]
              text-neutral-300

              shadow-lg
              shadow-black/20

              backdrop-blur-md

              transition-colors
              duration-200

              hover:border-white/20
              hover:text-white

              lg:hidden
            "
          >
            <Menu
              size={16}
              strokeWidth={1.7}
            />

            Menu
          </button>
        )}


      {/* =================================
          PAGE CONTENT
      ================================= */}

      <div
        className="
          h-dvh
          min-w-0

          lg:pl-[320px]
        "
        inert={
          talkOpen
            ? true
            : undefined
        }
        aria-hidden={
          talkOpen
            ? true
            : undefined
        }
      >
        <main
          className="
            h-full
            min-w-0
            overflow-x-hidden
            overflow-y-auto

            bg-[#0b0b0c]
          "
          inert={
            !isDesktop &&
            sidebarOpen
              ? true
              : undefined
          }
          aria-hidden={
            !isDesktop &&
            sidebarOpen
              ? true
              : undefined
          }
        >
          <Suspense
            fallback={
              <PageFallback />
            }
          >
            <ActivePage
              onNavigate={
                navigateTo
              }
              onOpenTalk={
                openTalk
              }
            />
          </Suspense>
        </main>
      </div>


      {/* =================================
          TALK TO ZEIN
      ================================= */}

      {talkLoaded && (
        <Suspense
          fallback={null}
        >
          <TalkToZeinOverlay
            open={
              talkOpen
            }
            onClose={
              closeTalk
            }
          />
        </Suspense>
      )}
    </div>
  )
}


export default AppShell