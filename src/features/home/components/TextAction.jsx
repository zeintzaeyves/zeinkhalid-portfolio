import { ArrowUpRight } from "lucide-react"


const TextAction = ({
  children,
  onClick,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group
        inline-flex
        items-center
        gap-2
        text-sm
        text-neutral-500
        transition-colors
        duration-300
        hover:text-white
        ${className}
      `}
    >
      <span>{children}</span>

      <ArrowUpRight
        size={13}
        className="
          text-neutral-700
          transition-colors
          duration-300
          group-hover:text-neutral-300
        "
      />
    </button>
  )
}


export default TextAction