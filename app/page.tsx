export default async function Home() {
  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden">
      <main className="h-full flex items-center justify-center px-4 py-8">
        {/* Hero Banner - Deep blue-purple gradient, centered with max-width */}
        <section className="relative w-full max-w-[1200px] overflow-hidden rounded-[20px]">
          {/* Decorative background circles - positioned exactly like reference */}
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
          <div className="relative px-8 sm:px-12 lg:px-16 py-16 md:py-20 flex items-center">
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
                  className="inline-flex items-center rounded-lg bg-blue-600 text-white px-8 py-3.5 text-base font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Start Shopping Today
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center rounded-lg bg-white/10 text-white border border-white/30 px-8 py-3.5 text-base font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm"
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
