import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const images: string[] = Array.isArray(body.images) ? body.images : body.image ? [body.image] : [];
    if (images.length === 0) {
      return NextResponse.json({ success: false, error: "No images provided" }, { status: 400 });
    }
    const uploads = await Promise.all(
      images.slice(0, 6).map((img) =>
        cloudinary.uploader.upload(img, {
          folder: "lagbemart/products",
          resource_type: "image",
        })
      )
    );
    const urls = uploads.map((u) => u.secure_url);
    return NextResponse.json({ success: true, urls });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || "Upload failed" }, { status: 500 });
  }
}


