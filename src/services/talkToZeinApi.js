const normalizeMessages = (messages = []) => {
  return messages
    .filter((item) => {
      const role =
        item.role ??
        (item.type === "user"
          ? "user"
          : item.type === "assistant"
            ? "assistant"
            : null)

      const content =
        item.content ?? item.text

      return (
        (role === "user" ||
          role === "assistant") &&
        typeof content === "string"
      )
    })
    .map((item) => ({
      role:
        item.role ??
        (item.type === "user"
          ? "user"
          : "assistant"),

      content:
        item.content ?? item.text,
    }))
    .slice(-8)
}

export const sendTalkToZeinMessage =
  async ({
    message,
    messages = [],
    signal,
  }) => {
    const response = await fetch(
      "/api/talk",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        signal,

        body: JSON.stringify({
          message,
          messages:
            normalizeMessages(messages),
        }),
      },
    )

    const data =
      await response
        .json()
        .catch(() => null)

    if (!response.ok) {
      throw new Error(
        data?.error ??
          "Unable to connect to Talk to Zein.",
      )
    }

    if (!data?.reply) {
      throw new Error(
        "Talk to Zein returned an empty response.",
      )
    }

    return data.reply
  }