import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await req.json();
  const today = new Date();

  let streak = await prisma.streak.findUnique({
    where: { userId }
  });

  if (!streak) {
    streak = await prisma.streak.create({
      data: { userId, days: 1, lastStudy: today }
    });
  } else {
    streak = await prisma.streak.update({
      where: { userId },
      data: { days: streak.days + 1, lastStudy: today }
    });
  }

  return NextResponse.json(streak);
}
