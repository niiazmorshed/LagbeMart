import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import LogoutButton from "./components/LogoutButton";

export default async function Home() {
  const store = await cookies();
  const hasSession = Boolean(store.get("lm_session")?.value);
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block h-8 w-8 rounded bg-black/10" />
            <span className="text-lg font-semibold">LagbeMart</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#" className="hover:opacity-70 transition-opacity">
              Home
            </a>
            <a href="#" className="hover:opacity-70 transition-opacity">
              Shop
            </a>
            <a href="#" className="hover:opacity-70 transition-opacity">
              Categories
            </a>
            <a href="#" className="hover:opacity-70 transition-opacity">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-3">
            {hasSession ? (
              <LogoutButton />
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center gap-2 rounded-md border border-black/10 px-3 py-2 text-sm hover:bg-black/5 transition-colors"
              >
                <span>Sign in</span>
              </Link>
            )}
            <button className="inline-flex items-center gap-2 rounded-md bg-black text-white px-3 py-2 text-sm hover:bg-black/90 transition-colors">
              <span>Cart</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(0,0,0,0.08),transparent)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block text-xs font-medium tracking-wide uppercase text-black/60">
                Your Everyday Marketplace
              </span>
              <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
                Discover deals on everything you need
              </h1>
              <p className="mt-4 text-sm md:text-base text-black/70 max-w-prose">
                Shop thousands of products with fast delivery and secure
                checkout. From essentials to the latest trends, we have you
                covered.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#"
                  className="inline-flex items-center rounded-md bg-black text-white px-4 py-2 text-sm md:text-base hover:bg-black/90 transition-colors"
                >
                  Start Shopping
                </a>
                <a
                  href="#"
                  className="inline-flex items-center rounded-md border border-black/15 px-4 py-2 text-sm md:text-base hover:bg-black/5 transition-colors"
                >
                  Browse Categories
                </a>
              </div>
            </div>
            <div className="relative h-64 md:h-96">
              <div className="absolute -inset-x-10 -top-10 -bottom-10 rotate-6 bg-linear-to-br from-black/10 via-black/5 to-transparent blur-2xl" />
              <div className="relative h-full w-full rounded-xl border border-black/10 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                <Image
                  src="/window.svg"
                  alt="Shopping showcase"
                  width={420}
                  height={320}
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
