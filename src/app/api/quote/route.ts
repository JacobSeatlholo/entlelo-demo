import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  phone: z
    .string()
    .trim()
    .min(9, "Please enter a valid contact number")
    .max(20)
    .regex(/^[0-9+()\s-]+$/, "Phone number can only contain digits, spaces, +, - and brackets"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(160)
    .optional()
    .or(z.literal("")),
  clientType: z.enum(["Homeowner", "Developer", "Business", "Contractor"], {
    message: "Please select a client type",
  }),
  service: z.string().trim().min(2, "Please select a service").max(120),
  suburb: z.string().trim().min(2, "Please tell us where the site is").max(120),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = quoteSchema.safeParse(body);

    if (!parsed.success) {
      const flat = parsed.error.flatten();
      return NextResponse.json(
        { ok: false, error: "Validation failed", fieldErrors: flat.fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const saved = await db.quoteRequest.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        clientType: data.clientType,
        service: data.service,
        suburb: data.suburb,
        message: data.message || null,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        id: saved.id,
        message: "Quote request received. Our team will call you back shortly.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[api/quote] POST failed:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong saving your request. Please call us instead." },
      { status: 500 }
    );
  }
}
