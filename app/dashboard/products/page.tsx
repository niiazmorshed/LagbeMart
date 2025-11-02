"use client";
import { useListMyProductsQuery, useDeleteProductMutation } from "@/lib/services/productApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const { data, isLoading, refetch } = useListMyProductsQuery({ q });
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const products = data?.data || [];

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Products</h1>
        <a href="/dashboard/products/add" className="rounded-md bg-black text-white px-3 py-2 text-sm">Add Product</a>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="rounded-md border border-black/15 px-3 py-2 w-full max-w-xs" />
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b border-black/10">
              <th className="py-2 pr-4">Image</th>
              <th className="py-2 pr-4">Title</th>
              <th className="py-2 pr-4">Category</th>
              <th className="py-2 pr-4">Price</th>
              <th className="py-2 pr-4">Stock</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td className="py-4" colSpan={6}>Loading...</td></tr>
            ) : products.length === 0 ? (
              <tr><td className="py-4" colSpan={6}>No products found.</td></tr>
            ) : (
              products.map((p: any) => (
                <tr key={String(p._id)} className="border-b border-black/5">
                  <td className="py-2 pr-4">
                    {p.images?.[0] ? <img src={p.images[0]} alt={p.title} className="h-12 w-12 object-cover rounded" /> : <div className="h-12 w-12 bg-black/10 rounded" />}
                  </td>
                  <td className="py-2 pr-4">{p.title}</td>
                  <td className="py-2 pr-4">{p.category}</td>
                  <td className="py-2 pr-4">${p.price}</td>
                  <td className="py-2 pr-4">
                    {p.stock === 0 ? (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                        Out of Stock
                      </span>
                    ) : (
                      p.stock
                    )}
                  </td>
                  <td className="py-2 pr-4">
                    <button onClick={() => router.push(`/dashboard/products/edit/${p._id}`)} className="text-blue-600 hover:underline mr-3">Edit</button>
                    <button
                      className="text-red-600 hover:underline"
                      disabled={isDeleting}
                      onClick={async () => {
                        if (!confirm("Delete this product?")) return;
                        try {
                          await deleteProduct(String(p._id)).unwrap();
                          toast.success("Product deleted");
                          refetch();
                        } catch (e: any) {
                          toast.error(e?.message || "Failed to delete");
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


