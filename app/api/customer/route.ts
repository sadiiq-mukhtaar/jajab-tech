import authOptions from "@/app/auth/authOptions";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const customers = await prisma.customer.findMany({});

  if (!customers)
    return NextResponse.json(
      { message: "the customer is not exist" },
      { status: 400 }
    );

  return NextResponse.json(customers, { status: 200 });
};

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      {
        message: "🔒 Unauthorized - Please sign in to access this resource",
        solution:
          "Try signing in at /login or contact support if you believe this is an error",
      },
      { status: 401 }
    );
  }

  const body = await req.json();

  // Check if body is empty
  if (!body) {
    return NextResponse.json(
      { message: "The input must be filled" },
      { status: 400 }
    );
  }

  // Check if customer with the same email already exists
  const customer = await prisma.customer.findUnique({
    where: { email: body.email },
  });

  if (customer) {
    return NextResponse.json(
      { message: "The customer email already exists" },
      { status: 400 }
    );
  }

  // Create a new customer
  const newUser = await prisma.customer.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phoneNumber: body.phoneNumber,
      serviceNeed: body.serviceNeed,
      serviceDetails: body.serviceDetails,
      seviceStatus: body.seviceStatus,
    },
  });

  // Return success response
  return NextResponse.json(
    { message: "You have successfully created a new customer" },
    { status: 201 }
  );
};
