const PageContainer = ({
  children,
  className = "",
}) => {
  return (
    <main
      className={`
        mx-auto
        w-full
        max-w-[1250px]

        px-5
        py-10

        sm:px-8
        sm:py-14

        lg:px-14
        lg:py-16

        ${className}
      `}
    >
      {children}
    </main>
  )
}


export default PageContainer