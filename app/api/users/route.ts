import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "niaz@gmail.com";
const DEFAULT_SELLERS = (process.env.SELLER_EMAILS || "levi@gmail.com,erwin@gmail.com")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

// GET /api/users - list users
export async function GET() {
  try {
    const db = await getDb();
    const users = await db.collection("userCollection").find({}).limit(100).toArray();
    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST /api/users - create a new user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body || {};

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "name, email and password are required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const collection = db.collection("userCollection");

    // Ensure unique email
    const existing = await collection.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "User with this email already exists" },
        { status: 409 }
      );
    }

    const now = new Date();
    const normalizedEmail = String(email).toLowerCase();
    const role = normalizedEmail === ADMIN_EMAIL
      ? "admin"
      : DEFAULT_SELLERS.includes(normalizedEmail)
      ? "seller"
      : "buyer";
    const userDoc = {
      name,
      email,
      password, // In production, hash this. Storing plaintext is not secure.
      role,
      createdAt: now,
      updatedAt: now,
    } as const;

    const result = await collection.insertOne(userDoc);
    return NextResponse.json(
      { success: true, data: { _id: result.insertedId, ...userDoc } },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to create user" },
      { status: 500 }
    );
  }
}

// duplicates removed below
