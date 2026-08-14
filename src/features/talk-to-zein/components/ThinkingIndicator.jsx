const ThinkingIndicator = ({
  leaving,
}) => {
  return (
    <div
      role="status"

      aria-live="polite"
      aria-atomic="true"

      className={`
        flex
        items-center
        gap-4

        transition-[opacity,transform,filter]
        duration-[280ms]

        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${
          leaving
            ? `
              -translate-y-1
              opacity-0
              blur-[3px]
            `
            : `
              translate-y-0
              opacity-100
              blur-0
            `
        }
      `}
    >

      {/* =====================================
          DOT MARK
      ===================================== */}
      <div
        aria-hidden="true"

        className="
          grid
          w-[18px]
          shrink-0
          grid-cols-2
          gap-[4px]
        "
      >
        <span className="thinking-dot thinking-dot-1" />

        <span className="thinking-dot thinking-dot-2" />

        <span className="thinking-dot thinking-dot-3" />

        <span className="thinking-dot thinking-dot-4" />
      </div>


      {/* =====================================
          ANALYZING
      ===================================== */}
      <span
        className="
          analyzing-text

          font-mono
          text-lg
          text-neutral-500

          md:text-xl
        "
      >
        analyzing

        <span
          aria-hidden="true"
          className="ellipsis ellipsis-1"
        >
          .
        </span>

        <span
          aria-hidden="true"
          className="ellipsis ellipsis-2"
        >
          .
        </span>

        <span
          aria-hidden="true"
          className="ellipsis ellipsis-3"
        >
          .
        </span>
      </span>

    </div>
  )
}


export default ThinkingIndicator