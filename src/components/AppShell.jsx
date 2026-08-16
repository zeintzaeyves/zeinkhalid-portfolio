import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react"

import { flushSync } from "react-dom"
import { Menu } from "lucide-react"

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

const AcademicWork = lazy(
  () => import("@/pages/AcademicWork.jsx"),
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
  academic: AcademicWork,
  stack: TechStack,
  certifications: Certifications,
  resume: Resume,
  contact: Contact,
}


const PageFallback = () => {
  return (
    <div
      className="
        min-h-screen
        bg-[#0b0b0c]
      "
      role="status"
      aria-label="Loading page"
    />
  )
}


const AppShell = () => {
  const [activePage, setActivePage] =
    useState("home")

  const [talkOpen, setTalkOpen] =
    useState(false)

  const [talkLoaded, setTalkLoaded] =
    useState(false)

  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  const [isDesktop, setIsDesktop] =
    useState(() => {
      if (
        typeof window === "undefined"
      ) {
        return false
      }

      return window.matchMedia(
        "(min-width: 1024px)",
      ).matches
    })


  const mainRef = useRef(null)


  useDocumentTitle(activePage)


  /* =====================================
     NAVIGATION
  ===================================== */

  const navigateTo = (page) => {
    if (!PAGE_COMPONENTS[page]) {
      return
    }

    setSidebarOpen(false)


    if (page === activePage) {
      mainRef.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      })

      return
    }


    const changePage = () => {
      flushSync(() => {
        setActivePage(page)
      })

      mainRef.current?.scrollTo({
        top: 0,
        behavior: "auto",
      })
    }


    if (
      typeof document !== "undefined" &&
      "startViewTransition" in document
    ) {
      document.startViewTransition(
        changePage,
      )

      return
    }


    changePage()
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
     RESPONSIVE
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
     KEYBOARD
  ===================================== */

  useEffect(() => {
    const handleKeyDown = (
      event,
    ) => {
      const key =
        event.key.toLowerCase()

      const target =
        event.target


      const isTyping =
        target instanceof
          HTMLInputElement ||
        target instanceof
          HTMLTextAreaElement ||
        target?.isContentEditable


      if (event.key === "Escape") {
        if (talkOpen) {
          event.preventDefault()
          closeTalk()
          return
        }


        if (
          sidebarOpen &&
          !isDesktop
        ) {
          event.preventDefault()
          setSidebarOpen(false)
          return
        }


        return
      }


      if (talkOpen) {
        return
      }


      if (
        isTyping &&
        !event.altKey &&
        !event.ctrlKey
      ) {
        return
      }


      const navigationItem =
        NAVIGATION_ITEMS.find(
          (item) => {
            const shortcut =
              item.shortcut


            if (!shortcut) {
              return false
            }


            const keyMatches =
              key ===
              shortcut.key.toLowerCase()


            const altMatches =
              Boolean(
                shortcut.altKey,
              ) === event.altKey


            const ctrlMatches =
              Boolean(
                shortcut.ctrlKey,
              ) === event.ctrlKey


            return (
              keyMatches &&
              altMatches &&
              ctrlMatches
            )
          },
        )


      if (!navigationItem) {
        return
      }


      event.preventDefault()


      if (
        navigationItem.action ===
        "talk"
      ) {
        openTalk()
        return
      }


      navigateTo(
        navigationItem.id,
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


  const ActivePage =
    PAGE_COMPONENTS[activePage] ??
    Home


  const mobileNavigationOpen =
    sidebarOpen &&
    !isDesktop


  return (
    <div
      className="
        h-screen
        overflow-hidden

        bg-[#0b0b0c]
        text-white
      "
    >
      <PortfolioSidebar
        activePage={activePage}
        onNavigate={navigateTo}
        onOpenTalk={openTalk}
        mobileOpen={
          mobileNavigationOpen
        }
        onMobileClose={() =>
          setSidebarOpen(false)
        }
        isDesktop={isDesktop}
      />


      {mobileNavigationOpen && (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close navigation"
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
            fixed
            inset-0
            z-40

            bg-black/70
            backdrop-blur-[2px]

            lg:hidden
          "
        />
      )}


      {!talkOpen && (
        <header
          className="
            fixed
            inset-x-0
            top-0
            z-30

            flex
            h-[54px]
            items-center
            justify-between

            border-b
            border-white/[0.08]

            bg-[#0b0b0c]/95
            px-6

            backdrop-blur-md

            lg:hidden
          "
        >
          <button
            type="button"
            onClick={() =>
              navigateTo("home")
            }
            className="
              text-sm
              font-medium
              tracking-[-0.025em]
              text-neutral-200

              transition-colors
              duration-200

              hover:text-white
            "
          >
            Zein Khalid
          </button>


          <button
            type="button"
            aria-label="Open navigation"
            aria-expanded={
              sidebarOpen
            }
            aria-controls="portfolio-navigation"
            onClick={() =>
              setSidebarOpen(true)
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-end

              text-neutral-400

              transition-colors
              duration-200

              hover:text-white
            "
          >
            <Menu
              size={20}
              strokeWidth={1.5}
            />
          </button>
        </header>
      )}


      <main
        ref={mainRef}
        inert={
          talkOpen ||
          mobileNavigationOpen
            ? true
            : undefined
        }
        aria-hidden={
          talkOpen ||
          mobileNavigationOpen
            ? true
            : undefined
        }
        className="
          h-screen
          overflow-y-auto

          bg-[#0b0b0c]

          lg:ml-[320px]
        "
      >
        <div
          className="
            min-h-full
            pt-[54px]

            lg:pt-0
          "
        >
          <Suspense
            fallback={
              <PageFallback />
            }
          >
            <div
              className="min-h-full"
              style={{
                viewTransitionName:
                  "portfolio-page",
              }}
            >
              <ActivePage
                onNavigate={
                  navigateTo
                }
                onOpenTalk={
                  openTalk
                }
              />
            </div>
          </Suspense>
        </div>
      </main>


      {talkLoaded && (
        <Suspense fallback={null}>
          <TalkToZeinOverlay
            open={talkOpen}
            onClose={closeTalk}
          />
        </Suspense>
      )}
    </div>
  )
}


export default AppShell