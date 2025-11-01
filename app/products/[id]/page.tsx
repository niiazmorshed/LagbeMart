"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMeQuery } from "@/lib/services/authApi";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: userData } = useMeQuery();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const currentUser = userData?.data;
  const userRole = currentUser?.role;
  // Default to true if no user is logged in (buyers can add to cart)
  const canAddToCart = !userRole || (userRole !== "admin" && userRole !== "seller");

  useEffect(() => {
    const prodId = params.id;
    if (!prodId) return;
    fetch(`/api/products/${prodId}`)
      .then(r => r.json())
      .then((data) => {
        if (data.success && data.data) {
          setProduct(data.data);
        } else {
          router.push("/shop");
        }
      })
      .catch(() => router.push("/shop"))
      .finally(() => setLoading(false));
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-12">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-black/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Left side - Image */}
            <div className="flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center overflow-hidden">
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-6xl">📦</span>
                )}
              </div>
            </div>

            {/* Right side - Details */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>
              <p className="text-blue-600 text-lg mb-2">By {product.sellerName || "Seller"}</p>
              <p className="text-black/70 mb-2">{product.sellerEmail}</p>
              <p className="text-black/70 text-base mb-8 leading-relaxed">{product.description || "Discover amazing products"}</p>
              
              <div className="flex items-center justify-between mb-8">
                <span className="text-3xl font-bold text-blue-700">${product.price}</span>
                <button 
                  disabled={!canAddToCart}
                  className={`px-8 py-3 rounded-full font-medium transition-colors ${
                    canAddToCart 
                      ? "bg-blue-700 text-white hover:bg-blue-800 cursor-pointer" 
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Add to Cart
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-black/60">Category:</span>
                  <span className="ml-2 font-medium">{product.category}</span>
                </div>
                <div>
                  <span className="text-black/60">Stock:</span>
                  <span className="ml-2 font-medium">{product.stock}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

