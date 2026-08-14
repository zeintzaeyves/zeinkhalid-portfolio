const CertificationRow = ({
  certification,
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
        gap-y-2

        py-6

        md:grid-cols-[55px_minmax(0,1fr)_240px_70px]
        md:items-center
        md:gap-x-6
        md:py-7

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


      <div className="min-w-0">

        <h2
          className="
            text-base
            tracking-[-0.02em]
            text-neutral-200

            md:text-lg
          "
        >
          {certification.title}
        </h2>


        <p
          className="
            mt-2

            text-xs
            text-neutral-600

            md:hidden
          "
        >
          {certification.issuer}
        </p>


        <p
          className="
            mt-1

            font-mono
            text-[9px]
            text-neutral-700

            md:hidden
          "
        >
          {certification.year}
        </p>

      </div>


      <span
        className="
          hidden
          text-sm
          text-neutral-600

          md:block
        "
      >
        {certification.issuer}
      </span>


      <span
        className="
          hidden

          font-mono
          text-[10px]
          text-neutral-700

          md:block
          md:text-right
        "
      >
        {certification.year}
      </span>

    </article>
  )
}


export default CertificationRow