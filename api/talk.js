import OpenAI from "openai";
import { ZEIN_SYSTEM_PROMPT } from "./_zeinPrompt.js";

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_MESSAGES = 8;

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");

    return response.status(405).json({
      error: "Method not allowed.",
    });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is missing.");

      return response.status(500).json({
        error: "AI service is not configured.",
      });
    }

    const body =
      typeof request.body === "string"
        ? JSON.parse(request.body)
        : request.body ?? {};

    const { message, messages } = body;

    if (!message || typeof message !== "string") {
      return response.status(400).json({
        error: "Message is required.",
      });
    }

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return response.status(400).json({
        error: "Message is required.",
      });
    }

    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      return response.status(400).json({
        error: "Message is too long.",
      });
    }

    const conversationHistory = Array.isArray(messages)
      ? messages
          .filter((item) => {
            return (
              item &&
              (item.role === "user" || item.role === "assistant") &&
              typeof item.content === "string"
            );
          })
          .slice(-MAX_HISTORY_MESSAGES)
          .map((item) => ({
            role: item.role,
            content: item.content.slice(0, MAX_MESSAGE_LENGTH),
          }))
      : [];

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const aiResponse = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: ZEIN_SYSTEM_PROMPT,
        },
        ...conversationHistory,
        {
          role: "user",
          content: trimmedMessage,
        },
      ],
    });

    const reply = aiResponse.output_text?.trim();

    if (!reply) {
      return response.status(502).json({
        error: "The AI returned an empty response.",
      });
    }

    return response.status(200).json({
      reply,
    });
  } catch (error) {
    console.error("Talk to Zein API error:", error);

    return response.status(500).json({
      error: "Something went wrong while generating a response.",
    });
  }
}