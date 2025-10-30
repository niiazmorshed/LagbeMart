import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = NextResponse.json({ success: true });
    // Clear cookie by setting it expired on the response
    res.cookies.set("lm_session", "", { path: "/", maxAge: 0 });
    return res;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to logout" },
      { status: 500 }
    );
  }
}


