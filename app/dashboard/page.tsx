import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardHome() {
  const store = await cookies();
  const raw = store.get("lm_session")?.value;
  if (!raw) redirect("/login");
  const session = JSON.parse(raw) as { name?: string };

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold">Welcome back{session?.name ? `, ${session.name}` : ""} 👋</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          ["Total Products", "—"],
          ["Total Orders", "—"],
          ["Pending Orders", "—"],
          ["Revenue", "—"],
        ].map(([label, val]) => (
          <div key={label} className="rounded-md border border-black/10 p-4">
            <div className="text-sm text-black/60">{label}</div>
            <div className="text-2xl font-semibold">{val}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-md border border-black/10 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3 text-sm font-medium">Recent Orders</div>
        <div className="p-4 text-sm text-black/70">No orders yet.</div>
      </div>
    </div>
  );
}


