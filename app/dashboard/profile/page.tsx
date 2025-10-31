import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/mongodb";

export default async function ProfilePage() {
  const store = await cookies();
  const raw = store.get("lm_session")?.value;
  if (!raw) redirect("/login");
  const session = JSON.parse(raw) as { id: string; email: string; name?: string; role?: string };

  // Load fresh user data from DB
  const db = await getDb();
  const user = await db.collection("userCollection").findOne({ email: session.email });

  const displayName = user?.name || session.name || "User";
  const email = session.email;
  const role = (user?.role || session.role || "buyer") as string;
  const createdAt = user?.createdAt ? new Date(user.createdAt) : null;
  const updatedAt = user?.updatedAt ? new Date(user.updatedAt) : null;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm text-black/70">Manage your account and view profile information</p>
      </div>

      <div className="rounded-xl border border-black/10 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500/15 to-purple-500/15 px-6 py-5">
          <div className="text-sm font-medium">Account Overview</div>
          <div className="text-xs text-black/70">Your profile details</div>
        </div>
        <div className="px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-orange-200 flex items-center justify-center text-xl font-semibold">
              {(displayName || email)[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="font-semibold truncate">{displayName}</div>
              <div className="text-sm text-black/70 truncate">{email}</div>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600" />
                {role?.charAt(0).toUpperCase() + role?.slice(1)}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-md border border-black/10 p-4">
              <div className="text-xs uppercase text-black/60">Display Name</div>
              <div className="mt-1 font-medium">{displayName}</div>
            </div>
            <div className="rounded-md border border-black/10 p-4">
              <div className="text-xs uppercase text-black/60">Account Status</div>
              <div className="mt-1 text-green-700">Active</div>
            </div>
            <div className="rounded-md border border-black/10 p-4">
              <div className="text-xs uppercase text-black/60">Permissions</div>
              <div className="mt-1">{role === "admin" ? "Full Access" : role === "seller" ? "Seller Access" : "Standard"}</div>
            </div>
            <div className="rounded-md border border-black/10 p-4 md:col-span-3">
              <div className="text-xs uppercase text-black/60">Last Updated</div>
              <div className="mt-1">{updatedAt ? updatedAt.toLocaleDateString() : "—"}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


