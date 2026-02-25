import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { topic } = await req.json();

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Create a 20-question mock test with MCQs and 3 long-answer questions on ${topic}`
      }
    ]
  });

  return NextResponse.json({ test: response.choices[0].message.content });
}
