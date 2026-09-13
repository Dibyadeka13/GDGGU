import { NextResponse } from "next/server";
import getClientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, branch, year, phone } = body;

    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and email are required" },
        { status: 400 }
      );
    }

    const client = await getClientPromise();
    const db = client.db("GDGGU");

    await db.collection("form submission").insertOne({
      name,
      email,
      branch: branch || "",
      year: year || "",
      phone: phone || "",
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
