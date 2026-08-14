const PageIntro = ({
  label,
  children,
  description,
  className = "",
}) => {
  return (
    <section className={className}>

      {label && (
        <p
          className="
            text-[9px]
            uppercase
            tracking-[0.2em]
            text-neutral-600

            sm:text-[10px]
          "
        >
          {label}
        </p>
      )}


      <h1
        className="
          mt-5
          max-w-5xl

          text-[clamp(2.4rem,6vw,4rem)]
          font-medium

          leading-[1.02]
          tracking-[-0.045em]

          text-neutral-100

          sm:mt-6
        "
      >
        {children}
      </h1>


      {description && (
        <p
          className="
            mt-6
            max-w-2xl

            text-sm
            leading-7
            text-neutral-500

            sm:mt-7
            sm:text-base
            sm:leading-8
          "
        >
          {description}
        </p>
      )}

    </section>
  )
}


export default PageIntro