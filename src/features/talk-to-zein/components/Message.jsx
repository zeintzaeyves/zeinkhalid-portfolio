const Message = ({
  message,
}) => {
  const isUser =
    message.type === "user"


  return (
    <div
      className={`
        zein-message-enter

        ${
          isUser
            ? ""
            : "zein-answer-enter"
        }
      `}
    >

      <p
        className="
          mb-3

          text-[10px]
          uppercase
          tracking-[0.18em]

          text-neutral-700
        "
      >
        {isUser
          ? "you"
          : "zein"}
      </p>


      <p
        className={`
          max-w-[850px]

          font-mono

          text-lg
          leading-8

          md:text-xl

          ${
            isUser
              ? "text-neutral-200"
              : "text-neutral-400"
          }
        `}
      >
        {message.text}
      </p>

    </div>
  )
}


export default Message