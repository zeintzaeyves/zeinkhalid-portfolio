const PageHeader = ({
  eyebrow,
  meta,
}) => {
  return (
    <header
      className="
        flex
        h-14
        items-center
        justify-between

        border-b
        border-white/[0.07]

        px-5
        pr-20

        sm:h-16
        sm:px-8

        lg:px-12
        lg:pr-12
      "
    >
      <span
        className="
          min-w-0
          truncate

          text-[9px]
          uppercase
          tracking-[0.18em]
          text-neutral-600

          sm:text-[10px]
        "
      >
        {eyebrow}
      </span>


      {meta && (
        <span
          className="
            hidden
            shrink-0

            font-mono
            text-[9px]
            text-neutral-700

            sm:block
          "
        >
          {meta}
        </span>
      )}
    </header>
  )
}


export default PageHeader