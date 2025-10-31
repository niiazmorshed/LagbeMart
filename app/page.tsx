export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Banner - Deep blue-purple gradient, viewport height */}
        <section className="relative min-h-[90vh] overflow-hidden rounded-2xl mx-4 my-4">
          {/* Decorative background circles - positioned exactly like reference */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full bg-blue-500/15 blur-3xl" />
            <div className="absolute top-40 left-0 w-[600px] h-[600px] rounded-full bg-purple-500/15 blur-3xl" />
            <div className="absolute top-24 right-20 w-[550px] h-[550px] rounded-full bg-purple-500/15 blur-3xl" />
          </div>

          {/* Chess pieces pattern - very subtle */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute left-20 top-1/2 -translate-y-1/2 w-96 h-96">
              <div className="text-[400px] leading-none">♞</div>
            </div>
            <div className="absolute right-20 top-1/2 -translate-y-1/2 w-96 h-96">
              <div className="text-[400px] leading-none text-white/20">♞</div>
            </div>
          </div>

          {/* Gradient background - darker shades */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2561] via-[#4c1d95] to-[#5b21b6]" />

          {/* Content */}
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex items-center min-h-[90vh]">
            <div className="text-center text-white w-full">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Discover Deals on <span className="opacity-95">Everything</span>{" "}
                You Need
              </h1>
              <p className="mt-4 text-white/90 max-w-2xl mx-auto text-lg md:text-xl">
                Shop thousands of products with fast delivery, adaptive deals,
                and personalized shopping pathways.
              </p>
              <div className="mt-12 flex items-center justify-center gap-4">
                <a
                  href="/shop"
                  className="inline-flex items-center rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 text-base font-medium hover:from-blue-700 hover:to-purple-700 transition-colors shadow-lg"
                >
                  Start Shopping Today
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center rounded-md bg-white/10 text-white border border-white/30 px-6 py-3 text-base font-medium hover:bg-white/15 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
