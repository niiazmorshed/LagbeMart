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
  RotateCcw,
  Headphones,
  Quote,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";

const BANNER_IMAGE =
  "https://i.ibb.co.com/8nk4dM2Y/shutter-speed-BQ9usyz-Hx-w-unsplash.jpg";

export default async function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with banner image */}
      <section className="relative overflow-hidden py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[24px] shadow-2xl">
            {/* Banner background image — clean, no colour tint */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${BANNER_IMAGE}")` }}
              aria-hidden="true"
            />

            {/* Minimal bottom-up gradient only for text readability */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
              aria-hidden="true"
            />

            {/* Content */}
            <div className="relative px-6 sm:px-12 lg:px-16 py-16 md:py-24">
              <div className="text-center text-white max-w-4xl mx-auto">
                <Reveal direction="down" duration={600}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs sm:text-sm font-medium backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    Bangladesh&apos;s growing online marketplace
                  </span>
                </Reveal>

                <Reveal delay={120}>
                  <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
                    Discover Deals on{" "}
                    <span className="bg-gradient-to-r from-sky-300 via-white to-indigo-200 bg-clip-text text-transparent">
                      Everything
                    </span>{" "}
                    You Need
                  </h1>
                </Reveal>

                <Reveal delay={240}>
                  <p className="mt-4 text-white/90 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
                    Shop thousands of products from verified sellers with fast
                    delivery, secure payments, and a curated experience built
                    for shoppers who care about quality.
                  </p>
                </Reveal>

                <Reveal delay={360}>
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      href="/shop"
                      className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-8 py-4 text-base font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5"
                    >
                      Start Shopping Today
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center rounded-xl bg-white/10 text-white border border-white/30 px-8 py-4 text-base font-semibold hover:bg-white/20 transition-colors backdrop-blur-md"
                    >
                      Contact Us
                    </Link>
                  </div>
                </Reveal>

                <Reveal delay={500}>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/80 text-sm">
                    <span className="inline-flex items-center gap-2">
                      <BadgeCheck className="w-4 h-4 text-emerald-300" />
                      Verified sellers
                    </span>
                    <span className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
                    <span className="inline-flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-sky-300" />
                      Secure payments
                    </span>
                    <span className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
                    <span className="inline-flex items-center gap-2">
                      <Truck className="w-4 h-4 text-amber-300" />
                      Fast delivery
                    </span>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 lm-bounce-soft">
              <ChevronDown className="w-6 h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-8 md:py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center md:text-left">
              {[
                {
                  icon: Truck,
                  title: "Free Delivery",
                  desc: "On orders over ৳1,000",
                  color: "text-blue-600 bg-blue-50",
                },
                {
                  icon: ShieldCheck,
                  title: "Secure Payment",
                  desc: "Encrypted checkout",
                  color: "text-emerald-600 bg-emerald-50",
                },
                {
                  icon: RotateCcw,
                  title: "Easy Returns",
                  desc: "7-day return policy",
                  color: "text-purple-600 bg-purple-50",
                },
                {
                  icon: Headphones,
                  title: "24/7 Support",
                  desc: "We’re here to help",
                  color: "text-amber-600 bg-amber-50",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center md:justify-start gap-4"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm md:text-base">
                      {item.title}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-900 via-[#0b1224] to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Trusted by Thousands
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Numbers that show why shoppers love LagbeMart
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: "10K+", label: "Happy Customers" },
              { value: "5K+", label: "Products Listed" },
              { value: "500+", label: "Verified Sellers" },
              { value: "99%", label: "Satisfaction Rate" },
            ].map((stat, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                  <p className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-sky-300 to-blue-500 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-gray-300 text-sm md:text-base">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">
                Our Promise
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose LagbeMart?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We provide the best shopping experience with unmatched service
                and quality
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "Quick and reliable shipping to your doorstep within 2-5 business days",
                accent: "bg-blue-100 text-blue-600",
              },
              {
                icon: Shield,
                title: "Secure Shopping",
                desc: "100% secure payment processing with buyer protection guarantee",
                accent: "bg-green-100 text-green-600",
              },
              {
                icon: CreditCard,
                title: "Easy Payments",
                desc: "Multiple payment options including cards, mobile money, and COD",
                accent: "bg-purple-100 text-purple-600",
              },
              {
                icon: Star,
                title: "Quality Products",
                desc: "Verified sellers offering authentic and high-quality products",
                accent: "bg-orange-100 text-orange-600",
              },
            ].map((feature, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 h-full">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${feature.accent}`}
                  >
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">
                Shop By Category
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Popular Categories
              </h2>
              <p className="text-lg text-gray-600">
                Explore our wide range of product categories
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { name: "Electronics", icon: "📱", color: "from-blue-50 to-blue-100" },
              { name: "Sports", icon: "⚽", color: "from-orange-50 to-orange-100" },
              { name: "Books", icon: "📚", color: "from-yellow-50 to-yellow-100" },
            ].map((category, idx) => (
              <Reveal key={idx} delay={idx * 120}>
                <Link
                  href="/shop"
                  className="group block bg-white border border-gray-100 hover:border-blue-200 rounded-2xl p-6 text-center transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div
                    className={`text-5xl mb-4 bg-gradient-to-br ${category.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-lg">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Browse <ArrowRight className="w-3 h-3" />
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Quality Showcase — split image + text */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0b1224] to-[#10183a] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal direction="right">
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-500/20 blur-3xl rounded-full" />
                <div
                  className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-cover bg-center shadow-2xl ring-1 ring-white/10"
                  style={{ backgroundImage: `url("${BANNER_IMAGE}")` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-blue-500/10" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm font-medium">Hand-picked quality</span>
                    </div>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((n) => (
                        <div
                          key={n}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 border-2 border-[#10183a]"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-white text-gray-900 rounded-2xl shadow-2xl px-5 py-4 lm-float">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-amber-500" />
                    <div>
                      <p className="text-xs text-gray-500">Trusted by</p>
                      <p className="text-lg font-bold">10,000+ buyers</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="left" delay={120}>
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest text-sky-300 uppercase mb-4">
                  Curated for you
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                  Premium quality without the premium hassle
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Every seller on LagbeMart is verified, every transaction is
                  protected, and every product is reviewed by real shoppers
                  like you. Get the deals you love without compromising on
                  quality.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Hand-picked products across every category",
                    "Verified sellers with proven track records",
                    "Transparent ratings and authentic reviews",
                    "Buyer protection on every order",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <BadgeCheck className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-gray-200">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white text-gray-900 px-6 py-3 font-semibold hover:bg-gray-100 transition-all shadow-lg"
                >
                  Explore Products
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">
                Get Started
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600">
                Start shopping in just 3 easy steps
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line (decorative) */}
            <div
              className="hidden md:block absolute top-24 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200"
              aria-hidden="true"
            />

            {[
              {
                step: "1",
                icon: Users,
                title: "Create Account",
                desc: "Sign up for free and set up your buyer or seller profile in minutes",
                iconBg: "bg-blue-100 text-blue-600",
              },
              {
                step: "2",
                icon: Package,
                title: "Browse & Select",
                desc: "Explore thousands of products and add your favorites to cart",
                iconBg: "bg-green-100 text-green-600",
              },
              {
                step: "3",
                icon: TrendingUp,
                title: "Checkout & Enjoy",
                desc: "Complete your purchase securely and get fast delivery",
                iconBg: "bg-purple-100 text-purple-600",
              },
            ].map((step, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow h-full">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                    {step.step}
                  </div>
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${step.iconBg}`}
                  >
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3">
                What Shoppers Say
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Loved by customers across Bangladesh
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real stories from people who shop with us every day
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                quote:
                  "Lightning-fast delivery and the product was exactly as described. LagbeMart has become my go-to for online shopping.",
                name: "Rafiq Ahmed",
                role: "Dhaka",
                rating: 5,
              },
              {
                quote:
                  "I love how easy it is to browse and the variety is amazing. Customer support helped me out within minutes when I had a question.",
                name: "Nadia Hasan",
                role: "Chittagong",
                rating: 5,
              },
              {
                quote:
                  "Switched from other marketplaces and never looked back. Quality is consistent and prices are unbeatable.",
                name: "Tariq Islam",
                role: "Sylhet",
                rating: 5,
              },
            ].map((review, idx) => (
              <Reveal key={idx} delay={idx * 120}>
                <div className="relative bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all h-full">
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-100" />
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-semibold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {review.name}
                      </p>
                      <p className="text-sm text-gray-500">{review.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${BANNER_IMAGE}")` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#0b1224]/92 via-[#0b1224]/85 to-[#0a4bd8]/70"
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <Reveal>
            <Award className="w-16 h-16 mx-auto mb-6 text-amber-400 lm-float" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Start Shopping?
            </h2>
            <p className="text-xl text-white/85 mb-10 max-w-2xl mx-auto">
              Join thousands of happy customers and discover amazing deals
              today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 justify-center rounded-xl bg-blue-600 text-white px-8 py-4 text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5"
              >
                Create Account
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 justify-center rounded-xl bg-white/10 text-white border border-white/30 px-8 py-4 text-lg font-semibold hover:bg-white/20 transition-all backdrop-blur-md"
              >
                Browse Products
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
