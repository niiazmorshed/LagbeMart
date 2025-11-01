"use client";
import { useListProductsQuery } from "@/lib/services/productApi";
import { useRouter } from "next/navigation";
import { useMeQuery } from "@/lib/services/authApi";

export default function ShopPage() {
  const router = useRouter();
  const { data, isLoading } = useListProductsQuery();
  const { data: userData } = useMeQuery();
  const products = data?.data || [];
  const currentUser = userData?.data;
  const userRole = currentUser?.role;
  // Default to true if no user is logged in (buyers can add to cart)
  const canAddToCart = !userRole || (userRole !== "admin" && userRole !== "seller");

  return (
    <div className="min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700">Explore All Products</h1>
          <p className="mt-3 text-black/70 max-w-2xl mx-auto">
            Browse our curated list of approved products and start shopping today.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-black/70">No products available yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: any) => {
              const productId = String(product._id);
              return (
                <div key={productId} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer" onClick={() => router.push(`/products/${productId}`)}>
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center overflow-hidden">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="text-4xl">📦</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-center mb-1 text-lg">{product.title}</h3>
                  <p className="text-sm text-blue-600 text-center mb-2">By {product.sellerName || "Seller"}</p>
                  <p className="text-sm text-black/70 text-center mb-6 min-h-[2.5rem]">{product.description || "Discover amazing products"}</p>
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-50 text-blue-700 font-semibold px-3 py-1 rounded-full text-sm">
                      ${product.price}
                    </span>
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (canAddToCart) {
                          router.push(`/products/${productId}`);
                        }
                      }}
                      disabled={!canAddToCart}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                        canAddToCart 
                          ? "bg-blue-700 text-white hover:bg-blue-800 cursor-pointer" 
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


