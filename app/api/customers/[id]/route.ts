import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { customerSchema } from "@/lib/validations/customers";

interface Params {
  params: {
    id: string;
  };
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    const existing = await db.customer.findUnique({
      where: { id },
    });
    if (!existing) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 },
      );
    }

    const body = await req.json();
    const validated = customerSchema.parse(body);

    const updated = await db.customer.update({
      where: { id },
      data: validated,
    });
    return NextResponse.json(updated);
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to update customer" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const existing = await db.customer.findUnique({
      where: { id },
    });
    if (!existing) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 },
      );
    }
    await db.customer.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Customer deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete customer" },
      { status: 500 },
    );
  }
}
