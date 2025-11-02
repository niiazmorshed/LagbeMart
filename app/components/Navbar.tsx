import { cookies } from "next/headers";
import Link from "next/link";
import UserMenu from "./UserMenu";
import NavLinks from "./NavLinks";

export const dynamic = "force-dynamic";

export default async function Navbar() {
  const store = await cookies();
  const raw = store.get("lm_session")?.value;
  const session = raw
    ? (JSON.parse(raw) as { email: string; name?: string; role?: string })
    : null;
  return (
    <header className="border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-lg font-semibold">
            LagbeMart
          </Link>
        </div>
        <NavLinks />
        <div className="flex items-center gap-3">
          {session ? (
            <UserMenu name={session.name} email={session.email} />
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-md border border-black/10 px-3 py-2 text-sm hover:bg-black/5 transition-colors"
            >
              Sign in
            </Link>
          )}
          {session && (
            <Link
              href="/dashboard/profile"
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              <span>Dashboard</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
