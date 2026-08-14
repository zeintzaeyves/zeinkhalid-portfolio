const SectionLayout = ({
  number,
  title,
  children,
  className = "",
}) => {
  return (
    <section
      className={`
        mt-24
        grid
        gap-10
        lg:grid-cols-[180px_1fr]
        lg:gap-20
        ${className}
      `}
    >

      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-neutral-600">
          {number} / {title}
        </p>
      </div>


      <div>
        {children}
      </div>

    </section>
  )
}


export default SectionLayout