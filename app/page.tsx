// Home contains only the banner; navbar is rendered via layout

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Banner - Solid gradient background */}
      <main className="flex-1">
        {/* Gradient banner similar to the example (orange → blue) */}
        <section className="relative py-10 md:py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl overflow-hidden border border-black/10">
              <div className="bg-[linear-gradient(135deg,#e26a2c_0%,#ef8354_15%,#6aa7ff_100%)] text-white">
                <div className="px-6 md:px-12 py-16 md:py-24 text-center">
                  <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                    Learn Through <span className="opacity-95">Interactive</span> Experience
                  </h1>
                  <p className="mt-4 text-white/90 max-w-2xl mx-auto">
                    Discover curated products with fast delivery, adaptive deals, and personalized shopping pathways.
                  </p>
                  <div className="mt-8 flex items-center justify-center gap-4">
                    <a
                      href="/shop"
                      className="inline-flex items-center rounded-md bg-white text-black px-4 py-2 text-sm md:text-base hover:bg-white/90 transition-colors"
                    >
                      Start Shopping Today
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center rounded-md bg-white/10 text-white border border-white/30 px-4 py-2 text-sm md:text-base hover:bg-white/15 transition-colors"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
