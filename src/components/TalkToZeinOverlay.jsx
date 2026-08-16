import {
  useEffect,
  useRef,
} from "react"

import { X } from "lucide-react"

import Conversation from "@/features/talk-to-zein/components/Conversation.jsx"
import TalkIntro from "@/features/talk-to-zein/components/TalkIntro.jsx"

import useTalkToZein from "@/features/talk-to-zein/hooks/useTalkToZein.js"


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


const TalkToZeinOverlay = ({
  open,
  onClose,
}) => {
  const dialogRef =
    useRef(null)

  const previousFocusRef =
    useRef(null)


  const {
    input,
    setInput,

    messages,

    mode,

    introLeaving,

    thinking,
    thinkingLeaving,

    inputRef,

    handleSubmit,
  } = useTalkToZein({
    open,
  })


  /* =====================================
     MODAL FOCUS + KEYBOARD
  ===================================== */

  useEffect(() => {
    if (!open) {
      return
    }


    previousFocusRef.current =
      document.activeElement


    const dialog =
      dialogRef.current


    /*
     * Give dialog focus first.
     * Input focus is handled shortly
     * afterwards by useTalkToZein.
     */

    requestAnimationFrame(() => {
      dialog?.focus()
    })


    const handleKeyDown = (
      event,
    ) => {
      /* =================================
         ESCAPE TO CLOSE
      ================================= */

      if (
        event.key === "Escape"
      ) {
        event.preventDefault()

        onClose?.()

        return
      }


      /* =================================
         FOCUS TRAP
      ================================= */

      if (
        event.key !== "Tab"
      ) {
        return
      }


      const focusable =
        getFocusableElements(
          dialog,
        )


      if (
        focusable.length === 0
      ) {
        event.preventDefault()

        dialog?.focus()

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


    dialog?.addEventListener(
      "keydown",
      handleKeyDown,
    )


    return () => {
      dialog?.removeEventListener(
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

        return
      }


      /*
       * Mobile fallback.
       */

      const menuButton =
        document.querySelector(
          '[data-mobile-menu-trigger="true"]',
        )


      menuButton?.focus()
    }
  }, [
    open,
    onClose,
  ])


  return (
    <div
      ref={dialogRef}

      role="dialog"

      aria-modal={
        open
          ? "true"
          : undefined
      }

      aria-hidden={!open}

      aria-labelledby="talk-to-zein-dialog-title"

      inert={
        !open
          ? ""
          : undefined
      }

      tabIndex={-1}

      onClick={onClose}

      className={`
        fixed
        inset-0
        z-[100]

        flex
        items-center

        outline-none

        transition-[opacity,background-color,backdrop-filter]
        duration-500

        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${
          open
            ? `
              pointer-events-auto
              bg-black/70
              opacity-100
              backdrop-blur-[8px]
            `
            : `
              pointer-events-none
              bg-black/0
              opacity-0
              backdrop-blur-0
            `
        }
      `}
    >
      {/* =====================================
          ACCESSIBLE TITLE
      ===================================== */}

      <h2
        id="talk-to-zein-dialog-title"
        className="sr-only"
      >
        Talk to Zein
      </h2>


      {/* =====================================
          CLOSE CONTROL
      ===================================== */}

      <div
        onClick={(event) =>
          event.stopPropagation()
        }
        className={`
          fixed
          right-5
          top-5
          z-[120]

          flex
          items-center
          gap-3

          transition-[opacity,transform]
          duration-500

          ease-[cubic-bezier(0.22,1,0.36,1)]

          sm:right-7
          sm:top-7

          lg:right-10
          lg:top-9

          ${
            open
              ? `
                translate-y-0
                opacity-100
              `
              : `
                -translate-y-2
                opacity-0
              `
          }
        `}
      >
        {/* ESC LABEL */}

        <button
          type="button"
          onClick={onClose}
          className="
            font-mono
            text-[9px]
            uppercase
            tracking-[0.14em]

            text-neutral-600

            transition-colors
            duration-200

            hover:text-neutral-300

            focus-visible:outline-none
            focus-visible:text-white
          "
        >
          Esc
        </button>


        {/* X BUTTON */}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close Talk to Zein"
          className="
            flex
            h-9
            w-9
            items-center
            justify-center

            text-neutral-500

            transition-[color,transform]
            duration-200

            hover:rotate-90
            hover:text-white

            focus-visible:outline-none
            focus-visible:text-white
          "
        >
          <X
            size={19}
            strokeWidth={1.4}
          />
        </button>
      </div>


      {/* =====================================
          CONTENT
      ===================================== */}

      <div
        onClick={(event) =>
          event.stopPropagation()
        }

        className={`
          w-full

          px-5
          sm:px-8
          md:px-14
          lg:px-24

          transition-[opacity,transform]
          duration-500

          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${
            open
              ? `
                translate-y-0
                opacity-100
              `
              : `
                translate-y-3
                opacity-0
              `
          }
        `}
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1100px]
          "
        >
          {/* =================================
              INTRO
          ================================= */}

          {mode === "intro" && (
            <TalkIntro
              input={input}
              setInput={setInput}

              inputRef={inputRef}

              onSubmit={handleSubmit}

              leaving={
                introLeaving
              }
            />
          )}


          {/* =================================
              CONVERSATION
          ================================= */}

          {mode ===
            "conversation" && (
            <Conversation
              messages={
                messages
              }

              thinking={
                thinking
              }

              thinkingLeaving={
                thinkingLeaving
              }

              input={input}
              setInput={
                setInput
              }

              inputRef={
                inputRef
              }

              onSubmit={
                handleSubmit
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}


export default TalkToZeinOverlay