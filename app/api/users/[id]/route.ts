import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "niaz@gmail.com";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const store = await cookies();
    const raw = store.get("lm_session")?.value;
    if (!raw) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    const session = JSON.parse(raw) as { role?: string };
    if (session.role !== "admin") return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });

    const db = await getDb();
    const col = db.collection("userCollection");
    const existing = await col.findOne({ _id: new ObjectId(id) });
    if (!existing) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    
    // Prevent deletion of default admin
    if (existing.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.json({ success: false, error: "Cannot delete the default admin account" }, { status: 403 });
    }
    
    // Delete all orders related to this user (both as buyer and seller)
    const ordersCol = db.collection("orderCollection");
    await ordersCol.deleteMany({
      $or: [
        { buyerId: existing._id },
        { sellerId: existing._id }
      ]
    });
    
    // Delete the user
    await col.deleteOne({ _id: existing._id });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || "Failed" }, { status: 500 });
  }
}

