import prisma from "@/lib/db";
import { generateFlashcards } from "@/lib/ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await req.json();

  const notes = await prisma.note.findMany({
    where: { userId }
  });

  const combined = notes.map(n => n.content).join("\n");

  const flashcards = await generateFlashcards(combined);

  return NextResponse.json({ flashcards });
}
