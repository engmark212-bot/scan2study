import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await req.json();

  const results = await prisma.result.findMany({
    where: { userId }
  });

  const weakTopics = results
    .filter(r => r.score < 60)
    .map(r => r.topic);

  return NextResponse.json({ weakTopics });
}
