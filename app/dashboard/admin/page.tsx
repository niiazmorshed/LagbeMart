"use client";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ totalUsers: 0, totalOrders: 0, revenue: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/users").then((r) => r.json()).then((d) => (d.success ? d.data?.length || 0 : 0)),
      Promise.resolve(0),
      Promise.resolve(0),
    ]).then(([users]) => setStats({ totalUsers: users, totalOrders: 0, revenue: 0 }));
  }, []);

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="rounded-md border border-black/10 p-4">
          <div className="text-sm text-black/60">Total Users</div>
          <div className="text-2xl font-semibold">{stats.totalUsers}</div>
        </div>
        <div className="rounded-md border border-black/10 p-4">
          <div className="text-sm text-black/60">Total Orders</div>
          <div className="text-2xl font-semibold">{stats.totalOrders}</div>
        </div>
        <div className="rounded-md border border-black/10 p-4">
          <div className="text-sm text-black/60">Revenue</div>
          <div className="text-2xl font-semibold">${stats.revenue}</div>
        </div>
      </div>
      <div className="rounded-md border border-black/10 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3 text-sm font-medium">Quick Actions</div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/dashboard/admin/users" className="rounded-md border border-black/15 px-4 py-3 text-sm hover:bg-black/5">
            View All Users →
          </a>
        </div>
      </div>
    </div>
  );
}
