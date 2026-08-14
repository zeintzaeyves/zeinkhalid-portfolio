const FocusRow = ({
  item,
  index,
  isLast = false,
}) => {
  const number = String(
    index + 1,
  ).padStart(2, "0")


  return (
    <article
      className={`
        grid
        grid-cols-[28px_minmax(0,1fr)]

        gap-x-3
        gap-y-3

        py-7

        md:grid-cols-[55px_240px_minmax(0,1fr)]
        md:gap-x-6

        ${
          !isLast
            ? "border-b border-white/[0.07]"
            : ""
        }
      `}
    >

      <span
        className="
          font-mono
          text-[9px]
          tracking-[0.08em]
          text-neutral-800
        "
      >
        {number}
      </span>


      <h2
        className="
          text-sm
          text-neutral-300

          md:text-base
        "
      >
        {item.title}
      </h2>


      <p
        className="
          col-start-2

          max-w-2xl

          text-sm
          leading-6
          text-neutral-600

          md:col-start-auto
        "
      >
        {item.description}
      </p>

    </article>
  )
}


export default FocusRow