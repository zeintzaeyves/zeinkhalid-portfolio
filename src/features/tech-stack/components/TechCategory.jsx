const TechCategory = ({
  category,
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
        gap-y-5

        py-8

        md:grid-cols-[55px_220px_minmax(0,1fr)]
        md:gap-x-6
        md:py-9

        ${
          !isLast
            ? "border-b border-white/[0.07]"
            : ""
        }
      `}
    >

      {/* NUMBER */}
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


      {/* CATEGORY */}
      <div>
        <h2
          className="
            text-sm
            text-neutral-300

            md:text-base
          "
        >
          {category.category}
        </h2>


        <span
          className="
            mt-1.5
            block

            font-mono
            text-[9px]
            text-neutral-700
          "
        >
          {category.items.length} technologies
        </span>
      </div>


      {/* ITEMS */}
      <div
        className="
          col-start-2

          flex
          flex-wrap

          gap-x-5
          gap-y-2.5

          md:col-start-auto
        "
      >
        {category.items.map(
          (technology) => (
            <span
              key={technology}
              className="
                text-[13px]
                text-neutral-600

                transition-colors
                duration-300

                hover:text-neutral-300

                sm:text-sm
              "
            >
              {technology}
            </span>
          )
        )}
      </div>

    </article>
  )
}


export default TechCategory