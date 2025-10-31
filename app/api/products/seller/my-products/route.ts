import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const store = await cookies();
    const raw = store.get("lm_session")?.value;
    if (!raw) return NextResponse.json({ success: true, data: [] });
    const session = JSON.parse(raw) as { email: string };

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";
    const category = searchParams.get("category") || undefined;
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const skip = (page - 1) * limit;

    const db = await getDb();
    const users = db.collection("userCollection");
    const seller = await users.findOne({ email: session.email });
    const sellerId = seller?._id;
    const col = db.collection("productCollection");
    const filter: any = { sellerId };
    if (q) filter.title = { $regex: q, $options: "i" };
    if (category) filter.category = category;
    const data = await col.find(filter).skip(skip).limit(limit).toArray();
    return NextResponse.json({ success: true, data });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || "Failed" }, { status: 500 });
  }
}


