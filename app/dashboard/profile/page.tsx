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

  // Role-based colors and permissions
  const roleColors = {
    admin: {
      bg: "bg-gradient-to-br from-red-500 to-orange-500",
      text: "text-white",
      badge: "bg-red-100 text-red-700",
      lightBg: "bg-red-50",
      border: "border-red-200",
    },
    seller: {
      bg: "bg-gradient-to-br from-blue-500 to-cyan-500",
      text: "text-white",
      badge: "bg-blue-100 text-blue-700",
      lightBg: "bg-blue-50",
      border: "border-blue-200",
    },
    buyer: {
      bg: "bg-gradient-to-br from-green-500 to-emerald-500",
      text: "text-white",
      badge: "bg-green-100 text-green-700",
      lightBg: "bg-green-50",
      border: "border-green-200",
    },
  };

  const colors = roleColors[role as keyof typeof roleColors] || roleColors.buyer;
  const permissions = role === "admin" ? "Full Access" : role === "seller" ? "Seller Access" : "Standard Access";

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-sm text-gray-600 mt-2">Manage your account and view profile information</p>
      </div>

      {/* Profile Header Card */}
      <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-lg mb-6">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
          <div className="text-sm font-medium text-white">Account Overview</div>
          <div className="text-xs text-white/80 mt-1">Your profile details</div>
        </div>
        <div className="p-8 bg-white">
          <div className="flex items-center gap-6">
            <div className={`h-24 w-24 rounded-full ${colors.bg} flex items-center justify-center text-3xl font-bold ${colors.text} shadow-lg`}>
              {(displayName || email)[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-gray-900 truncate">{displayName}</h2>
              <p className="text-gray-600 text-sm truncate mt-1">{email}</p>
              <div className="mt-3">
                <span className={`inline-flex items-center gap-2 rounded-full ${colors.badge} px-3 py-1 text-xs font-semibold`}>
                  <span className="inline-block h-2 w-2 rounded-full bg-current" />
                  {role?.charAt(0).toUpperCase() + role?.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-xs uppercase text-gray-500 font-semibold mb-2">Display Name</div>
          <div className="text-lg font-semibold text-gray-900">{displayName}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-xs uppercase text-gray-500 font-semibold mb-2">Account Status</div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-lg font-semibold text-green-700">Active</span>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-xs uppercase text-gray-500 font-semibold mb-2">Permissions</div>
          <div className="text-lg font-semibold text-blue-700">{permissions}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-xs uppercase text-gray-500 font-semibold mb-2">Member Since</div>
          <div className="text-lg font-semibold text-gray-900">{createdAt ? createdAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "—"}</div>
        </div>
      </div>

      {/* Role-Specific Stats */}
      <div className={`${colors.lightBg} rounded-xl border ${colors.border} p-6`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {role === "admin" ? "Administrator" : role === "seller" ? "Seller" : "Buyer"} Profile
        </h3>
        <p className="text-sm text-gray-700">
          {role === "admin" 
            ? "You have full access to manage users, view all orders, and oversee the entire platform."
            : role === "seller"
            ? "You can add products, manage your inventory, and track your sales and orders."
            : "You can browse products, place orders, and track your purchase history."}
        </p>
        {updatedAt && (
          <div className="mt-4 text-xs text-gray-600">
            Last updated: {updatedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </div>
        )}
      </div>
    </main>
  );
}


