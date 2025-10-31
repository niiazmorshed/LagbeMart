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
    const col = db.collection("products");
    const filter: any = { sellerEmail: session.email };
    if (q) filter.title = { $regex: q, $options: "i" };
    if (category) filter.category = category;
    const data = await col.find(filter).skip(skip).limit(limit).toArray();
    return NextResponse.json({ success: true, data });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || "Failed" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const store = await cookies();
    const raw = store.get("lm_session")?.value;
    if (!raw) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    const session = JSON.parse(raw) as { email: string; name?: string };
    const body = await request.json();
    const now = new Date();
    const doc = {
      sellerEmail: session.email,
      sellerName: session.name,
      title: body.title,
      description: body.description,
      category: body.category,
      price: Number(body.price),
      discountedPrice: Number(body.discountedPrice || 0),
      stock: Number(body.stock || 0),
      images: Array.isArray(body.images) ? body.images.slice(0, 6) : [],
      video: body.video || null,
      status: "active",
      createdAt: now,
      updatedAt: now,
    };
    const db = await getDb();
    const col = db.collection("products");
    const result = await col.insertOne(doc);
    return NextResponse.json({ success: true, data: { _id: result.insertedId, ...doc } }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || "Failed" }, { status: 500 });
  }
}


