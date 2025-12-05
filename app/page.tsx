import Link from "next/link";
import {
  Truck,
  Shield,
  CreditCard,
  Star,
  Package,
  Users,
  TrendingUp,
  Award,
} from "lucide-react";
import Footer from "./components/Footer";

export default async function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[20px]">
            {/* Decorative background circles - positioned exactly like original */}
            <div className="absolute inset-0">
              <div className="absolute top-10 left-20 w-[350px] h-[350px] rounded-full bg-blue-500/15 blur-3xl" />
              <div className="absolute top-20 left-0 w-[400px] h-[400px] rounded-full bg-purple-500/15 blur-3xl" />
              <div className="absolute top-10 right-20 w-[380px] h-[380px] rounded-full bg-purple-500/15 blur-3xl" />
            </div>

            {/* Chess pieces pattern - very subtle */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute left-20 top-1/2 -translate-y-1/2 w-64 h-64">
                <div className="text-[300px] leading-none">♞</div>
              </div>
              <div className="absolute right-20 top-1/2 -translate-y-1/2 w-64 h-64">
                <div className="text-[300px] leading-none text-white/20">♞</div>
              </div>
            </div>

            {/* Gradient background - professional blue gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#172142] via-[#3b83f6c7] to-[#0a4bd8d7]" />

            {/* Content */}
            <div className="relative px-8 sm:px-12 lg:px-16 py-16 md:py-20">
              <div className="text-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                  Discover Deals on <span className="opacity-95">Everything</span>{" "}
                  You Need
                </h1>
                <p className="mt-4 text-white/90 max-w-2xl mx-auto text-lg md:text-xl">
                  Shop thousands of products with fast delivery, adaptive deals,
                  and personalized shopping pathways.
                </p>
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/shop"
                    className="inline-flex items-center rounded-lg bg-blue-600 text-white px-8 py-3.5 text-base font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                  >
                    Start Shopping Today
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-lg bg-white/10 text-white border border-white/30 px-8 py-3.5 text-base font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose LagbeMart?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide the best shopping experience with unmatched service and
              quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Truck className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Quick and reliable shipping to your doorstep within 2-5 business
                days
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Secure Shopping
              </h3>
              <p className="text-gray-600">
                100% secure payment processing with buyer protection guarantee
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Easy Payments
              </h3>
              <p className="text-gray-600">
                Multiple payment options including cards, mobile money, and COD
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Quality Products
              </h3>
              <p className="text-gray-600">
                Verified sellers offering authentic and high-quality products
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <p className="text-lg text-gray-600">
              Explore our wide range of product categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { name: "Electronics", icon: "📱", color: "bg-blue-50" },
              { name: "Sports", icon: "⚽", color: "bg-orange-50" },
              { name: "Books", icon: "📚", color: "bg-yellow-50" },
            ].map((category, index) => (
              <Link
                key={index}
                href="/shop"
                className="group bg-gray-50 hover:bg-blue-50 rounded-xl p-6 text-center transition-all hover:shadow-lg transform hover:scale-105"
              >
                <div
                  className={`text-5xl mb-3 ${category.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}
                >
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Start shopping in just 3 easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                1
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                Create Account
              </h3>
              <p className="text-gray-600 text-center">
                Sign up for free and set up your buyer or seller profile in
                minutes
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                2
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                Browse & Select
              </h3>
              <p className="text-gray-600 text-center">
                Explore thousands of products and add your favorites to cart
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                3
              </div>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                Checkout & Enjoy
              </h3>
              <p className="text-gray-600 text-center">
                Complete your purchase securely and get fast delivery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-16 h-16 mx-auto mb-6 text-yellow-500" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands of happy customers and discover amazing deals today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 justify-center rounded-lg bg-blue-600 text-white px-8 py-4 text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Create Account
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 justify-center rounded-lg bg-gray-100 text-gray-900 border-2 border-gray-300 px-8 py-4 text-lg font-semibold hover:bg-gray-200 transition-all"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
