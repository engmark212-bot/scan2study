import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, amount } = await req.json();

  const user = await prisma.user.update({
    where: { id: userId },
    data: { xp: { increment: amount } }
  });

  return NextResponse.json(user);
}
