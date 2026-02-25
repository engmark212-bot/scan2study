import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function chatTutor(message: string, avatarType: string) {
  const personalities: any = {
    professor: "You are a strict GCSE/A-Level teacher.",
    coach: "You are energetic and motivating.",
    sage: "You are calm and patient.",
    gamer: "You reward effort and gamify explanations."
  };

  const systemPrompt = personalities[avatarType] || personalities.professor;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message }
    ]
  });

  return response.choices[0].message.content;
}

export async function generateFlashcards(text: string) {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: `Create GCSE flashcards from:\n${text}` }
    ]
  });

  return res.choices[0].message.content;
}

export async function generateMockTest(topic: string, difficulty: string) {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Create a ${difficulty} GCSE mock test on ${topic}`
      }
    ]
  });

  return res.choices[0].message.content;
}
