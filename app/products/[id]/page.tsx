"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMeQuery } from "@/lib/services/authApi";
import { useCreateOrderMutation } from "@/lib/services/orderApi";
import toast from "react-hot-toast";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: userData } = useMeQuery();
  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();
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

  const handleAddToCart = async () => {
    if (!canAddToCart || isCreatingOrder || !product._id) return;
    
    const isOutOfStock = product.stock === 0;
    if (isOutOfStock) {
      toast.error("This product is out of stock");
      return;
    }
    
    try {
      const result = await createOrder({ productId: product._id }).unwrap();
      if (result.success) {
        toast.success("Order placed successfully!");
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error(error?.data?.error || "Failed to place order. Please try again.");
    }
  };

  const isOutOfStock = product.stock === 0;

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left side - Image */}
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-8 md:p-12">
              <div className="relative group">
                {isOutOfStock && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="bg-black/60 backdrop-blur-sm rounded-2xl px-6 py-3">
                      <span className="text-white font-bold text-lg">Out of Stock</span>
                    </div>
                  </div>
                )}
                <div className="w-72 h-72 rounded-2xl bg-white shadow-2xl flex items-center justify-center overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-8xl">📦</span>
                  )}
                </div>
              </div>
            </div>

            {/* Right side - Details */}
            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{product.title}</h1>
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm text-gray-600">Sold by</span>
                  <span className="font-semibold text-blue-700">{product.sellerName || "Seller"}</span>
                </div>
                
                <p className="text-gray-600 text-base mb-6 leading-relaxed">{product.description || "Discover amazing products"}</p>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ${product.price.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Product Info Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8 p-4 bg-gray-50 rounded-xl">
                <div>
                  <span className="text-sm text-gray-600 block mb-1">Category</span>
                  <span className="font-semibold text-gray-900">{product.category}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600 block mb-1">Availability</span>
                  <span className="font-semibold">
                    {isOutOfStock ? (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                        Out of Stock
                      </span>
                    ) : (
                      <span className="text-green-700">{product.stock} in stock</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart}
                disabled={!canAddToCart || isCreatingOrder || isOutOfStock}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  canAddToCart && !isCreatingOrder && !isOutOfStock
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl cursor-pointer" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isCreatingOrder ? "Placing Order..." : isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

