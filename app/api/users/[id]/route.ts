import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const store = await cookies();
    const raw = store.get("lm_session")?.value;
    if (!raw) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    const session = JSON.parse(raw) as { role?: string };
    if (session.role !== "admin") return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });

    const db = await getDb();
    const col = db.collection("userCollection");
    const existing = await col.findOne({ _id: new ObjectId(params.id) });
    if (!existing) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    await col.deleteOne({ _id: existing._id });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || "Failed" }, { status: 500 });
  }
}

