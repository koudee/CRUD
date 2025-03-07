import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("OutsideJWT");
  return NextResponse.json({ message: "Logout successful" }, { status: 200 });
}

