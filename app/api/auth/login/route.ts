import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "niaz@gmail.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "email and password are required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const collection = db.collection("userCollection");

    let user = await collection.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // NOTE: Plain-text comparison. In production, use hashed passwords.
    if (user.password !== password) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Ensure role exists, default admin for configured email
    const computedRole = user.role || (email === ADMIN_EMAIL ? "admin" : "buyer");
    if (!user.role || user.role !== computedRole) {
      await collection.updateOne({ _id: user._id }, { $set: { role: computedRole } });
      user = { ...user, role: computedRole };
    }

    // Set a simple session cookie on the response
    const sessionValue = JSON.stringify({ email: user.email, name: user.name, id: String(user._id), role: user.role });
    const res = NextResponse.json({ success: true, data: { _id: user._id, email: user.email, name: user.name } });
    res.cookies.set("lm_session", sessionValue, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });
    return res;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to login" },
      { status: 500 }
    );
  }
}


