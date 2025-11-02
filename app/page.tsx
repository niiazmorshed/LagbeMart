export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8 px-4">
        {/* Hero Banner - Deep blue-purple gradient, centered with max-width */}
        <section className="relative mx-auto max-w-[1200px] min-h-[70vh] overflow-hidden rounded-[20px]">
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

          {/* Gradient background - professional blue gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#000106c2] via-[#0062ff76] to-[#0452fb61]" />

          {/* Content */}
          <div className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex items-center min-h-[60vh]">
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
