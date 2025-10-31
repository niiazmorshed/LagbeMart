import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const db = await getDb();
    const col = db.collection("productCollection");
    const prod = await col.findOne({ _id: new ObjectId(params.id) });
    if (!prod) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: prod });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || "Failed" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const store = await cookies();
    const raw = store.get("lm_session")?.value;
    if (!raw) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    const session = JSON.parse(raw) as { email: string };

    const db = await getDb();
    const users = db.collection("userCollection");
    const seller = await users.findOne({ email: session.email });
    const sellerId = seller?._id;

    const col = db.collection("productCollection");
    const existing = await col.findOne({ _id: new ObjectId(params.id) });
    if (!existing) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    if (!existing.sellerId || String(existing.sellerId) !== String(sellerId)) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const updates: any = {
      title: body.title,
      description: body.description,
      category: body.category,
      price: Number(body.price),
      stock: Number(body.stock),
      images: Array.isArray(body.images) ? body.images.slice(0, 6) : existing.images,
      updatedAt: new Date(),
    };
    await col.updateOne({ _id: existing._id }, { $set: updates });
    const updated = await col.findOne({ _id: existing._id });
    return NextResponse.json({ success: true, data: updated });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || "Failed" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const store = await cookies();
    const raw = store.get("lm_session")?.value;
    if (!raw) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    const session = JSON.parse(raw) as { email: string };

    const db = await getDb();
    const users = db.collection("userCollection");
    const seller = await users.findOne({ email: session.email });
    const sellerId = seller?._id;

    const col = db.collection("productCollection");
    const existing = await col.findOne({ _id: new ObjectId(params.id) });
    if (!existing) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    if (!existing.sellerId || String(existing.sellerId) !== String(sellerId)) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    await col.deleteOne({ _id: existing._id });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || "Failed" }, { status: 500 });
  }
}


