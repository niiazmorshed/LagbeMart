import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const store = await cookies();
    const raw = store.get("lm_session")?.value;
    if (!raw) return NextResponse.json({ success: true, data: null });
    const data = JSON.parse(raw);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Failed" }, { status: 500 });
  }
}



