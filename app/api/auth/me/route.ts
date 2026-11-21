
import { NextResponse } from "next/server";
import { connection } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  await connection();

  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "You are not authenticated." },
        { status: 401 }
      );
    }

    return NextResponse.json({ data: { user } });
  } catch (error) {
    console.error("Current-user error:", error);

    return NextResponse.json(
      { error: "Unable to retrieve your account." },
      { status: 500 }
    );
  }
}
