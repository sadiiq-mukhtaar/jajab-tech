import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}

export const GET = async (req: NextRequest, { params }: Props) => {
  const { id } = await params;

  const customer = await prisma.customer.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!customer)
    return NextResponse.json(
      { message: "the customer is not exist" },
      { status: 400 }
    );

  return NextResponse.json(customer, { status: 200 });
};

export const PUT = async (req: NextRequest, { params }: Props) => {
  const body = await req.json();
  const { id } = await params;
  console.log(id);

  if (!body)
    return NextResponse.json(
      { message: "The inputs are required" },
      { status: 400 }
    );

  try {
    if (isNaN(parseInt(id))) {
      return NextResponse.json(
        { message: "Invalid customer ID" },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!customer)
      return NextResponse.json(
        { message: "The customer doesn't exist" },
        { status: 400 }
      );

    const updatedCustomer = await prisma.customer.update({
      where: {
        id: customer.id,
      },
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

    return NextResponse.json(
      { message: "You have successfully updated", data: updatedCustomer },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating customer:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest, { params }: Props) => {
  const { id } = await params;
  const customer = await prisma.customer.findUnique({
    where: { id: parseInt(id) },
  });

  if (!customer)
    return NextResponse.json(
      { message: "The customer is doesn't exist" },
      { status: 400 }
    );

  await prisma.customer.delete({
    where: { id: customer.id },
  });

  return NextResponse.json(
    { message: "the customer have been deleted" },
    { status: 200 }
  );
};
