"use client";
import Link from "next/link";
import { useState } from "react";
import { Home, Package, Plus, ShoppingBag, User } from "lucide-react";
import { useMeQuery } from "@/lib/services/authApi";

export default function Sidebar({ collapsible = false }: { collapsible?: boolean }) {
  const { data } = useMeQuery();
  const user = data?.data as { name?: string; email?: string; role?: string } | undefined;
  const initials = (user?.name || user?.email || "U").charAt(0).toUpperCase();
  const [open, setOpen] = useState(!collapsible);

  return (
    <div>
      {collapsible && (
        <button onClick={() => setOpen((v) => !v)} className="w-full px-4 py-3 text-left">
          {open ? "Close" : "Menu"}
        </button>
      )}
      {open && (
        <div className="h-full flex flex-col">
          <div className="px-4 py-6 border-b border-black/10">
            <div className="h-12 w-12 rounded-full bg-black/10 flex items-center justify-center text-lg font-semibold">
              {initials}
            </div>
            <div className="mt-3 text-sm font-medium truncate">{user?.name || "Seller"}</div>
            <div className="text-xs text-black/70 truncate">{user?.email}</div>
            <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs">Seller</div>
          </div>

          <nav className="flex-1 px-2 py-4 text-sm">
            <SidebarLink href="/dashboard" icon={<Home size={16} />}>Dashboard</SidebarLink>
            <SidebarLink href="/dashboard/products" icon={<Package size={16} />}>My Products</SidebarLink>
            <SidebarLink href="/dashboard/products/add" icon={<Plus size={16} />}>Add Product</SidebarLink>
            <SidebarLink href="/dashboard/orders" icon={<ShoppingBag size={16} />}>Orders</SidebarLink>
            <SidebarLink href="/dashboard/profile" icon={<User size={16} />}>Profile</SidebarLink>
          </nav>

          <div className="mt-auto p-3 border-t border-black/10">
            <Link href="/" className="block text-center rounded-md border border-black/15 py-2 text-sm hover:bg-black/5">Home</Link>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  const isActive = typeof window !== "undefined" && window.location.pathname === href;
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-black/5 ${
        isActive ? "bg-gradient-to-r from-indigo-100 to-purple-100" : ""
      }`}
    >
      <span>{icon}</span>
      <span>{children}</span>
    </Link>
  );
}


