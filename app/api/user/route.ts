import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcyrpt from "bcrypt";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  if (!body)
    return NextResponse.json(
      { message: "the feilds is required" },
      { status: 200 }
    );

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user)
    return NextResponse.json(
      { message: "the email user is already exist" },
      { status: 400 }
    );

  const hashPassword = bcyrpt.hashSync(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: hashPassword,
    },
  });

  return NextResponse.json({ message: "the user is created" }, { status: 201 });
};
