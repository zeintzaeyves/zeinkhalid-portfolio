import { ThinkingOrb } from "thinking-orbs"


const ThinkingIndicator = ({
  leaving = false,
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Zein AI is thinking"
      className={`
        flex
        items-center
        gap-3

        py-2

        transition-all
        duration-300
        ease-out

        ${
          leaving
            ? "translate-y-1 opacity-0"
            : "translate-y-0 opacity-100"
        }
      `}
    >
      <div
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
        "
        aria-hidden="true"
      >
        <ThinkingOrb
          state="solving"
          size={64}
        />
      </div>


      <span
        className="
          font-mono
          text-[9px]
          uppercase
          tracking-[0.14em]
          text-neutral-700
        "
      >
        Thinking
      </span>
    </div>
  )
}


export default ThinkingIndicator