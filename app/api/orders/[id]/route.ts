import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { ObjectId, UpdateFilter } from "mongodb";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const store = await cookies();
    const raw = store.get("lm_session")?.value;
    if (!raw) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    const session = JSON.parse(raw) as { email: string; id: string; role?: string };

    // Only sellers can update order status
    if (session.role !== "seller") {
      return NextResponse.json({ success: false, error: "Only sellers can update order status" }, { status: 403 });
    }

    const body = await request.json();
    const { newStatus, note } = body;

    const validStatuses = [
      "Pending Approval",
      "Processing",
      "Out for Delivery",
      "Completed",
      "Cancelled/Rejected",
    ];

    if (!validStatuses.includes(newStatus)) {
      return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 });
    }

    const db = await getDb();
    const usersCol = db.collection("userCollection");
    const seller = await usersCol.findOne({ email: session.email });

    if (!seller) {
      return NextResponse.json({ success: false, error: "Seller not found" }, { status: 404 });
    }

    const ordersCol = db.collection("orderCollection");
    const order = await ordersCol.findOne({ _id: new ObjectId(id) });

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    // Verify seller owns this order
    if (String(order.sellerId) !== String(seller._id)) {
      return NextResponse.json({ success: false, error: "Not authorized to update this order" }, { status: 403 });
    }

    // Don't allow updating if already completed or cancelled
    if (order.currentStatus === "Completed" || order.currentStatus === "Cancelled/Rejected") {
      return NextResponse.json(
        { success: false, error: "Cannot update completed or cancelled orders" },
        { status: 400 }
      );
    }

    const now = new Date();

    // Add status to history
    const statusUpdate = {
      status: newStatus,
      triggeredBy: "Seller",
      timestamp: now,
      note: note || "",
    };

    // Update order
    await ordersCol.updateOne(
      { _id: order._id },
      {
        $set: {
          currentStatus: newStatus,
          updatedAt: now,
        },
        $push: {
          statusHistory: statusUpdate,
        },
      } as unknown as UpdateFilter<any>
    );

    // Get updated order
    const updatedOrder = await ordersCol.findOne({ _id: order._id });

    return NextResponse.json({ success: true, data: updatedOrder });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || "Failed" }, { status: 500 });
  }
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const store = await cookies();
    const raw = store.get("lm_session")?.value;
    if (!raw) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    const session = JSON.parse(raw) as { email: string; id: string; role?: string };

    const db = await getDb();
    const ordersCol = db.collection("orderCollection");
    const order = await ordersCol.findOne({ _id: new ObjectId(id) });

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    // Verify user has access to this order
    const usersCol = db.collection("userCollection");
    const user = await usersCol.findOne({ email: session.email });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    if (
      session.role !== "admin" &&
      String(order.buyerId) !== String(user._id) &&
      String(order.sellerId) !== String(user._id)
    ) {
      return NextResponse.json({ success: false, error: "Not authorized" }, { status: 403 });
    }

    return NextResponse.json({ success: true, data: order });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || "Failed" }, { status: 500 });
  }
}

