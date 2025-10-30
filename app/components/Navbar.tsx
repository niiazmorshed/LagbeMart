import Link from "next/link";
import { cookies } from "next/headers";
import UserMenu from "./UserMenu";

export const dynamic = "force-dynamic";

export default async function Navbar() {
  const store = await cookies();
  const raw = store.get("lm_session")?.value;
  const session = raw ? JSON.parse(raw) as { email: string; name?: string; role?: string } : null;
  return (
    <header className="border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">LagbeMart</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
          <Link href="/shop" className="hover:opacity-70 transition-opacity">Shop</Link>
          <Link href="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          {session ? (
            <UserMenu name={session.name} email={session.email} />
          ) : (
            <Link href="/login" className="inline-flex items-center gap-2 rounded-md border border-black/10 px-3 py-2 text-sm hover:bg-black/5 transition-colors">Sign in</Link>
          )}
          <button className="inline-flex items-center gap-2 rounded-md bg-black text-white px-3 py-2 text-sm hover:bg-black/90 transition-colors">
            <span>Cart</span>
          </button>
        </div>
      </div>
    </header>
  );
}


