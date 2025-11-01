import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    const store = await cookies();
    const raw = store.get("lm_session")?.value;
    if (!raw) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    const session = JSON.parse(raw) as { email: string; id: string; role?: string };

    // Only buyers can create orders
    if (session.role === "admin" || session.role === "seller") {
      return NextResponse.json({ success: false, error: "Only buyers can place orders" }, { status: 403 });
    }

    const body = await request.json();
    const { productId, quantity = 1, paymentMethod = "COD" } = body;

    if (!productId) {
      return NextResponse.json({ success: false, error: "Product ID is required" }, { status: 400 });
    }

    const db = await getDb();
    const productsCol = db.collection("productCollection");
    const product = await productsCol.findOne({ _id: new ObjectId(productId) });

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    // Check stock availability
    if (product.stock < quantity) {
      return NextResponse.json({ success: false, error: "Insufficient stock" }, { status: 400 });
    }

    const usersCol = db.collection("userCollection");
    const buyer = await usersCol.findOne({ email: session.email });
    const seller = await usersCol.findOne({ _id: product.sellerId });

    if (!buyer || !seller) {
      return NextResponse.json({ success: false, error: "User or seller not found" }, { status: 404 });
    }

    const totalAmount = product.price * quantity;
    const now = new Date();

    // Create order with initial status
    const order = {
      buyerId: buyer._id,
      sellerId: seller._id,
      sellerName: seller.name,
      sellerEmail: seller.email,
      buyerName: buyer.name,
      buyerEmail: buyer.email,
      products: [
        {
          productId: product._id,
          title: product.title,
          price: product.price,
          quantity: quantity,
        },
      ],
      totalAmount,
      paymentMethod,
      currentStatus: "Pending Approval",
      statusHistory: [
        {
          status: "Pending Approval",
          triggeredBy: "Buyer",
          timestamp: now,
          note: "Order placed",
        },
      ],
      createdAt: now,
      updatedAt: now,
    };

    const ordersCol = db.collection("orderCollection");
    const result = await ordersCol.insertOne(order);

    // Decrease product stock
    await productsCol.updateOne(
      { _id: product._id },
      { $inc: { stock: -quantity }, $set: { updatedAt: now } }
    );

    return NextResponse.json(
      { success: true, data: { _id: result.insertedId, ...order } },
      { status: 201 }
    );
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || "Failed" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const store = await cookies();
    const raw = store.get("lm_session")?.value;
    if (!raw) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    const session = JSON.parse(raw) as { email: string; id: string; role?: string };

    const db = await getDb();
    const usersCol = db.collection("userCollection");
    const user = await usersCol.findOne({ email: session.email });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const ordersCol = db.collection("orderCollection");
    let orders;

    if (session.role === "seller") {
      // Sellers see their own orders
      orders = await ordersCol.find({ sellerId: user._id }).toArray();
    } else if (session.role === "buyer") {
      // Buyers see their own orders
      orders = await ordersCol.find({ buyerId: user._id }).toArray();
    } else if (session.role === "admin") {
      // Admins see all orders
      orders = await ordersCol.find({}).toArray();
    } else {
      orders = await ordersCol.find({ buyerId: user._id }).toArray();
    }

    return NextResponse.json({ success: true, data: orders });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || "Failed" }, { status: 500 });
  }
}

