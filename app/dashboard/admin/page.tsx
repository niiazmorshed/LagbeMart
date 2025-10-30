export default function AdminDashboardPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-md border border-black/10 p-4">
          <div className="text-sm text-black/60">Users</div>
          <div className="text-2xl font-semibold">—</div>
        </div>
        <div className="rounded-md border border-black/10 p-4">
          <div className="text-sm text-black/60">Orders</div>
          <div className="text-2xl font-semibold">—</div>
        </div>
        <div className="rounded-md border border-black/10 p-4">
          <div className="text-sm text-black/60">Revenue</div>
          <div className="text-2xl font-semibold">—</div>
        </div>
      </div>
    </main>
  );
}


