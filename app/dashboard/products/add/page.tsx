"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddProductMutation } from "@/lib/services/productApi";
import toast from "react-hot-toast";
import { useState, useRef } from "react";

const schema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  category: z.string().min(2),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().nonnegative(),
});

type FormValues = z.infer<typeof schema> & {
  images: FileList;
};

export default function AddProductPage() {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [addProduct, { isLoading }] = useAddProductMutation();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const images: string[] = [];
      if (values.images && values.images.length) {
        for (const file of Array.from(values.images)) {
          const url = await fileToDataUrl(file);
          images.push(url);
        }
      }
      const payload = { ...values, images } as any;
      const res = await addProduct(payload).unwrap();
      if (!res?.success) throw new Error(res?.error || "Failed to add product");
      toast.success("Product added");
      reset();
      setPreviewImages([]);
    } catch (e: any) {
      toast.error(e?.message || "Failed");
    }
  };

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
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
                Choose Images
              </button>
              <input
                ref={imageInputRef}
                className="hidden"
                type="file"
                accept="image/*"
                multiple
                {...register("images")}
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
                  <img key={i} src={src} alt="preview" className="h-24 w-full object-cover rounded" />
                ))}
              </div>
            )}
          </div>
          <div className="pt-2">
            <button disabled={isLoading} className="rounded-md bg-black text-white px-4 py-2 text-sm disabled:opacity-60">
              {isLoading ? "Submitting..." : "Add Product"}
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


