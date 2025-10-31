"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProductMutation } from "@/lib/services/productApi";
import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const schema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  category: z.string().min(2),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().nonnegative(),
});

type FormValues = z.infer<typeof schema>;

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const prodId = params.id;
    if (!prodId) return;
    fetch(`/api/products/${prodId}`)
      .then(r => r.json())
      .then((data) => {
        if (data.success && data.data) {
          const p = data.data;
          setValue("title", p.title);
          setValue("description", p.description);
          setValue("category", p.category);
          setValue("price", p.price);
          setValue("stock", p.stock);
          if (p.images && p.images.length) {
            setExistingImages(p.images);
            setPreviewImages(p.images);
          }
        }
      }).catch(() => toast.error("Failed to load product"));
  }, [params.id, setValue]);

  const onSubmit = async (values: FormValues) => {
    try {
      const files = imageInputRef.current?.files;
      let finalImages = existingImages;
      if (files && files.length > 0) {
        const base64s: string[] = [];
        for (const file of Array.from(files)) {
          const url = await fileToDataUrl(file);
          base64s.push(url);
        }
        const uploadRes = await fetch("/api/uploads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ images: base64s }),
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok || !uploadData?.success) throw new Error(uploadData?.error || "Image upload failed");
        finalImages = [...existingImages, ...(uploadData.urls || [])].slice(0, 6);
      }
      const payload = { ...values, images: finalImages } as any;
      const res = await updateProduct({ id: String(params.id), body: payload }).unwrap();
      if (!res?.success) throw new Error(res?.error || "Failed to update product");
      toast.success("Product updated");
      router.push("/dashboard/products");
    } catch (e: any) {
      toast.error(e?.message || "Failed");
    }
  };

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input className="w-full rounded-md border border-black/15 px-3 py-2" {...register("title")} />
            {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea className="w-full rounded-md border border-black/15 px-3 py-2" rows={5} {...register("description")} />
            {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input className="w-full rounded-md border border-black/15 px-3 py-2" {...register("category")} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input type="number" step="0.01" className="w-full rounded-md border border-black/15 px-3 py-2" {...register("price")} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock</label>
              <input type="number" className="w-full rounded-md border border-black/15 px-3 py-2" {...register("stock")} />
            </div>
          </div>
        
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Images (up to 6)</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="rounded-md border border-black/15 px-3 py-2 text-sm hover:bg-black/5"
              >
                Choose New Images
              </button>
              <input
                ref={imageInputRef}
                className="hidden"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  if (!files) return;
                  const urls = Array.from(files).slice(0, 6).map((f) => URL.createObjectURL(f));
                  setPreviewImages(urls);
                }}
              />
            </div>
            {previewImages.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {previewImages.map((src, i) => (
                  <div key={i} className="relative group">
                    <img src={src} alt="preview" className="h-24 w-full object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => {
                        const newImgs = [...previewImages];
                        newImgs.splice(i, 1);
                        setPreviewImages(newImgs);
                        if (newImgs.length === 0 && imageInputRef.current) imageInputRef.current.value = "";
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="pt-2 flex items-center gap-3">
            <button disabled={isLoading} className="rounded-md bg-black text-white px-4 py-2 text-sm disabled:opacity-60">
              {isLoading ? "Updating..." : "Update Product"}
            </button>
            <button type="button" onClick={() => router.push("/dashboard/products")} className="rounded-md border border-black/15 px-4 py-2 text-sm">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}


