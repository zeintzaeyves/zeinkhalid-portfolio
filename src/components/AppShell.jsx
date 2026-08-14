import { lazy, Suspense, useEffect, useState } from "react";

import PortfolioSidebar from "@/components/PortfolioSidebar.jsx";

import { NAVIGATION_ITEMS } from "@/config/navigation.js";

import useDocumentTitle from "@/hooks/useDocumentTitle.js";

import Home from "@/pages/Home.jsx";

/* =========================================
   LAZY LOADED PAGES
========================================= */

const AboutMe = lazy(() => import("@/pages/AboutMe.jsx"));

const Experience = lazy(() => import("@/pages/Experience.jsx"));

const SelectedWork = lazy(() => import("@/pages/SelectedWork.jsx"));

const TechStack = lazy(() => import("@/pages/TechStack.jsx"));

const Certifications = lazy(() => import("@/pages/Certifications.jsx"));

const Resume = lazy(() => import("@/pages/Resume.jsx"));

const Contact = lazy(() => import("@/pages/Contact.jsx"));

/* =========================================
   LAZY LOADED TALK TO ZEIN
========================================= */

const TalkToZeinOverlay = lazy(
  () => import("@/components/TalkToZeinOverlay.jsx"),
);

/* =========================================
   PAGE REGISTRY
========================================= */

const PAGE_COMPONENTS = {
  home: Home,
  about: AboutMe,
  experience: Experience,
  projects: SelectedWork,
  stack: TechStack,
  certifications: Certifications,
  resume: Resume,
  contact: Contact,
};

/* =========================================
   HELPERS
========================================= */

const isTypingTarget = (target) => {
  if (!target) {
    return false;
  }

  const tagName = target.tagName?.toLowerCase();

  return (
    tagName === "input" ||
    tagName === "textarea" ||
    tagName === "select" ||
    target.isContentEditable
  );
};

const matchesShortcut = (event, shortcut) => {
  if (!shortcut) {
    return false;
  }

  return (
    event.key.toLowerCase() === shortcut.key.toLowerCase() &&
    Boolean(event.altKey) === Boolean(shortcut.altKey) &&
    Boolean(event.ctrlKey) === Boolean(shortcut.ctrlKey) &&
    Boolean(event.shiftKey) === Boolean(shortcut.shiftKey) &&
    Boolean(event.metaKey) === Boolean(shortcut.metaKey)
  );
};

/* =========================================
   PAGE FALLBACK
========================================= */

const PageFallback = () => {
  return (
    <div
      role="status"
      aria-label="Loading page"
      className="
        min-h-full
        bg-[#0b0b0c]
      "
    />
  );
};

/* =========================================
   APP SHELL
========================================= */

const AppShell = () => {
  const [activePage, setActivePage] = useState("home");

  const [talkOpen, setTalkOpen] = useState(false);

  const [talkLoaded, setTalkLoaded] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return window.matchMedia("(min-width: 1024px)").matches;
  });

  /* =====================================
     DOCUMENT TITLE
  ===================================== */

  useDocumentTitle(activePage);

  /* =====================================
     NAVIGATION
  ===================================== */

  const navigateTo = (page) => {
    setActivePage(page);

    setSidebarOpen(false);
  };

  /* =====================================
     TALK TO ZEIN
  ===================================== */

  const openTalk = () => {
    /*
      Load the Talk to Zein chunk
      only when the user first
      requests it.
    */
    setTalkLoaded(true);

    setSidebarOpen(false);

    setTalkOpen(true);
  };

  const closeTalk = () => {
    setTalkOpen(false);
  };

  /* =====================================
     SIDEBAR
  ===================================== */

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  /* =====================================
     RESPONSIVE BREAKPOINT
  ===================================== */

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = (event) => {
      setIsDesktop(event.matches);

      /*
        Mobile drawer state is
        irrelevant on desktop.
      */
      if (event.matches) {
        setSidebarOpen(false);
      }
    };

    setIsDesktop(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  /* =====================================
     KEYBOARD NAVIGATION
  ===================================== */

  useEffect(() => {
    const handleKeyDown = (event) => {
      /* =================================
         ESCAPE
      ================================= */

      if (event.key === "Escape") {
        /*
          Talk modal has priority.
        */
        if (talkOpen) {
          event.preventDefault();

          closeTalk();

          return;
        }

        /*
          Then mobile navigation.
        */
        if (sidebarOpen && !isDesktop) {
          event.preventDefault();

          closeSidebar();

          return;
        }

        /*
          Otherwise return to Index.
        */
        navigateTo("home");

        return;
      }

      /* =================================
         TALK MODAL GUARD
      ================================= */

      /*
        Portfolio navigation should
        not fire while Talk to Zein
        is open.
      */
      if (talkOpen) {
        return;
      }

      /* =================================
         TYPING GUARD
      ================================= */

      /*
        Normal typing inside a form
        should not accidentally
        navigate the portfolio.

        Modifier shortcuts remain
        available.
      */
      if (
        isTypingTarget(event.target) &&
        !event.altKey &&
        !event.ctrlKey &&
        !event.metaKey
      ) {
        return;
      }

      /* =================================
         FIND SHORTCUT
      ================================= */

      const matchedItem = NAVIGATION_ITEMS.find((item) =>
        matchesShortcut(event, item.shortcut),
      );

      if (!matchedItem) {
        return;
      }

      event.preventDefault();

      /* =================================
         TALK
      ================================= */

      if (matchedItem.action === "talk") {
        openTalk();

        return;
      }

      /* =================================
         PAGE
      ================================= */

      if (matchedItem.action === "page") {
        navigateTo(matchedItem.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [talkOpen, sidebarOpen, isDesktop]);

  /* =====================================
     ACTIVE PAGE
  ===================================== */

  const ActivePage = PAGE_COMPONENTS[activePage] ?? Home;

  const activeNavigationItem = NAVIGATION_ITEMS.find(
    (item) => item.id === activePage,
  );

  /* =====================================
     RENDER
  ===================================== */

  return (
    <div
      className="
        relative

        h-[100dvh]
        overflow-hidden

        bg-[#0b0b0c]
        text-white
      "
    >
      {/* =====================================
          APPLICATION CONTENT
      ===================================== */}
      <div
        className="
          flex
          h-full
          w-full
        "
        inert={talkOpen ? true : undefined}
        aria-hidden={talkOpen ? true : undefined}
      >
        {/* =================================
            SIDEBAR
        ================================= */}
        <PortfolioSidebar
          activePage={activePage}
          setActivePage={navigateTo}
          onOpenTalk={openTalk}
          mobileOpen={sidebarOpen}
          onClose={closeSidebar}
          isDesktop={isDesktop}
        />

        {/* =================================
            ACTIVE PAGE
        ================================= */}
        <main
          className="
            custom-scroll

            h-[100dvh]
            min-w-0
            flex-1

            overflow-y-auto
            overscroll-contain

            bg-[#0b0b0c]
          "
          inert={sidebarOpen && !isDesktop ? true : undefined}
          aria-hidden={sidebarOpen && !isDesktop ? true : undefined}
          aria-label={
            activeNavigationItem
              ? `${activeNavigationItem.label} page`
              : "Portfolio page"
          }
        >
          <div
            key={activePage}
            className="
              page-enter
              min-h-full
            "
          >
            <Suspense fallback={<PageFallback />}>
              <ActivePage setActivePage={navigateTo} onOpenTalk={openTalk} />
            </Suspense>
          </div>
        </main>
      </div>

      {/* =====================================
          MOBILE DRAWER BACKDROP
      ===================================== */}
      <button
        type="button"
        onClick={closeSidebar}
        aria-label="Close navigation"
        aria-hidden={sidebarOpen ? undefined : true}
        tabIndex={sidebarOpen ? 0 : -1}
        className={`
          fixed
          inset-0
          z-40

          bg-black/65
          backdrop-blur-[4px]

          transition-[opacity,backdrop-filter]
          duration-300

          ease-[cubic-bezier(0.22,1,0.36,1)]

          lg:hidden

          ${
            sidebarOpen
              ? `
                pointer-events-auto
                opacity-100
              `
              : `
                pointer-events-none
                opacity-0
              `
          }
        `}
      />

      {/* =====================================
          MOBILE MENU TRIGGER
      ===================================== */}
      {!sidebarOpen && !talkOpen && (
        <button
          type="button"
          data-mobile-menu-trigger="true"
          onClick={openSidebar}
          aria-expanded={sidebarOpen}
          aria-controls="portfolio-navigation"
        >
          Menu
        </button>
      )}

      {/* =====================================
          TALK TO ZEIN
      ===================================== */}
      {talkLoaded && (
        <Suspense fallback={null}>
          <TalkToZeinOverlay open={talkOpen} onClose={closeTalk} />
        </Suspense>
      )}
    </div>
  );
};

export default AppShell;
