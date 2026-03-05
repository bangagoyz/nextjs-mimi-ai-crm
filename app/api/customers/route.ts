import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { customerSchema } from "@/lib/validations/customers";
import { authMiddleware } from "@/lib/auth";

export async function GET(req: Request) {
  const auth = authMiddleware(req);

  if (auth.error) {
    return new Response(auth.error, { status: 401 });
  }

  try {
    const customers = await db.customer.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = customerSchema.parse(body);

    const customer = await db.customer.create({
      data: validated,
    });
    return NextResponse.json(customer, { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: 500 },
    );
  }
}
