import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const hashed = await bcrypt.hash(body.password, 10);

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: hashed,
      currentGrade: body.currentGrade,
      targetGrade: body.targetGrade,
      examDate: new Date(body.examDate),
      subjects: body.subjects
    }
  });

  return NextResponse.json(user);
}
