"use client";
import { useListProductsQuery } from "@/lib/services/productApi";
import { useRouter } from "next/navigation";
import { useMeQuery } from "@/lib/services/authApi";
import { useState, useMemo } from "react";

export default function ShopPage() {
  const router = useRouter();
  const { data, isLoading } = useListProductsQuery();
  const { data: userData } = useMeQuery();
  const allProducts = data?.data || [];
  const currentUser = userData?.data;
  const userRole = currentUser?.role;
  // Default to true if no user is logged in (buyers can add to cart)
  const canAddToCart = !userRole || (userRole !== "admin" && userRole !== "seller");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"relevance" | "price-low" | "price-high" | "name">("relevance");

  // Filter and sort products
  const products = useMemo(() => {
    let filtered = allProducts;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = allProducts.filter((product: any) => {
        const titleMatch = product.title?.toLowerCase().includes(query);
        const descriptionMatch = product.description?.toLowerCase().includes(query);
        const categoryMatch = product.category?.toLowerCase().includes(query);
        const sellerMatch = product.sellerName?.toLowerCase().includes(query);
        const priceMatch = product.price?.toString().includes(query);
        return titleMatch || descriptionMatch || categoryMatch || sellerMatch || priceMatch;
      });
    }

    // Sort products
    const sorted = [...filtered].sort((a: any, b: any) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return (a.title || "").localeCompare(b.title || "");
        case "relevance":
        default:
          // Relevance: exact title match first, then title contains, then others
          if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            const aTitle = (a.title || "").toLowerCase();
            const bTitle = (b.title || "").toLowerCase();
            
            const aExact = aTitle === query;
            const bExact = bTitle === query;
            if (aExact && !bExact) return -1;
            if (!aExact && bExact) return 1;
            
            const aStarts = aTitle.startsWith(query);
            const bStarts = bTitle.startsWith(query);
            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;
          }
          return 0;
      }
    });

    return sorted;
  }, [allProducts, searchQuery, sortBy]);

  return (
    <div className="min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700">Explore All Products</h1>
          <p className="mt-3 text-black/70 max-w-2xl mx-auto">
            Browse our curated list of approved products and start shopping today.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Products
              </label>
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, category, price..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
          {searchQuery && (
            <div className="mt-4 text-sm text-gray-600">
              Found {products.length} {products.length === 1 ? "product" : "products"} matching "{searchQuery}"
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-black/70">
            {searchQuery ? `No products found matching "${searchQuery}"` : "No products available yet."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product: any) => {
              const productId = String(product._id);
              const isOutOfStock = product.stock === 0;
              return (
                <div 
                  key={productId} 
                  className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl border border-gray-100 hover:border-blue-200 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 relative overflow-hidden"
                  onClick={() => router.push(`/products/${productId}`)}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-purple-50/0 to-pink-50/0 group-hover:from-blue-50/50 group-hover:via-purple-50/30 group-hover:to-pink-50/20 transition-all duration-500 pointer-events-none" />
                  
                  {/* Out of Stock badge */}
                  {isOutOfStock && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-lg">
                        Out of Stock
                      </span>
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    {product.images?.[0] ? (
                      <img 
                        src={product.images[0]} 
                        alt={product.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">📦</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="relative z-10">
                    <h3 className="font-bold text-center mb-2 text-lg text-gray-900 group-hover:text-blue-700 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-blue-600 font-medium text-center mb-2">
                      By {product.sellerName || "Seller"}
                    </p>
                    <p className="text-sm text-gray-600 text-center mb-4 min-h-[2.5rem] line-clamp-2">
                      {product.description || "Discover amazing products"}
                    </p>

                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-between gap-3">
                      <span className="bg-blue-50 text-blue-700 font-semibold px-3 py-1 rounded-full text-sm">
                        ${product.price.toLocaleString()}
                      </span>
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (canAddToCart && !isOutOfStock) {
                            router.push(`/products/${productId}`);
                          }
                        }}
                        disabled={!canAddToCart || isOutOfStock}
                        className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                          canAddToCart && !isOutOfStock
                            ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer shadow-md hover:shadow-lg" 
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                      </button>
                    </div>
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


