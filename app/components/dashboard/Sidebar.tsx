"use client";
import { useMeQuery } from "@/lib/services/authApi";
import { Home, Package, Plus, ShoppingBag, User, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar({
  collapsible = false,
}: {
  collapsible?: boolean;
}) {
  const { data } = useMeQuery();
  const user = data?.data as
    | { name?: string; email?: string; role?: string }
    | undefined;
  const initials = (user?.name || user?.email || "U").charAt(0).toUpperCase();
  const [open, setOpen] = useState(!collapsible);
  const pathname = usePathname();
  const roleLabel =
    user?.role === "admin"
      ? "Admin"
      : user?.role === "seller"
      ? "Seller"
      : "Buyer";
  const roleColor =
    user?.role === "admin"
      ? "bg-red-100 text-red-700"
      : user?.role === "seller"
      ? "bg-blue-100 text-blue-700"
      : "bg-green-100 text-green-700";

  return (
    <div>
      {collapsible && (
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full px-4 py-3 text-left"
        >
          {open ? "Close" : "Menu"}
        </button>
      )}
      {open && (
        <div className="h-full flex flex-col">
          <div className="px-4 py-6 border-b border-black/10">
            <div className="h-12 w-12 rounded-full bg-black/10 flex items-center justify-center text-lg font-semibold">
              {initials}
            </div>
            <div className="mt-3 text-sm font-medium truncate">
              {user?.name || roleLabel}
            </div>
            <div className="text-xs text-black/70 truncate">{user?.email}</div>
            <div
              className={`mt-2 inline-flex items-center px-2 py-0.5 rounded-full ${roleColor} text-xs`}
            >
              {roleLabel}
            </div>
          </div>

          <nav className="flex-1 px-2 py-4 text-sm">
            {user?.role === "admin" && (
              <>
                <SidebarLink
                  href="/dashboard/admin"
                  icon={<Home size={16} />}
                  pathname={pathname}
                >
                  Dashboard
                </SidebarLink>
                <SidebarLink
                  href="/dashboard/admin/users"
                  icon={<Users size={16} />}
                  pathname={pathname}
                >
                  All Users
                </SidebarLink>
                <SidebarLink
                  href="/dashboard/profile"
                  icon={<User size={16} />}
                  pathname={pathname}
                >
                  Profile
                </SidebarLink>
              </>
            )}
            {user?.role === "seller" && (
              <>
                <SidebarLink
                  href="/dashboard/seller"
                  icon={<Home size={16} />}
                  pathname={pathname}
                >
                  Dashboard
                </SidebarLink>
                <SidebarLink
                  href="/dashboard/products"
                  icon={<Package size={16} />}
                  pathname={pathname}
                >
                  My Products
                </SidebarLink>
                <SidebarLink
                  href="/dashboard/products/add"
                  icon={<Plus size={16} />}
                  pathname={pathname}
                >
                  Add Product
                </SidebarLink>
                <SidebarLink
                  href="/dashboard/orders"
                  icon={<ShoppingBag size={16} />}
                  pathname={pathname}
                >
                  Orders
                </SidebarLink>
                <SidebarLink
                  href="/dashboard/profile"
                  icon={<User size={16} />}
                  pathname={pathname}
                >
                  Profile
                </SidebarLink>
              </>
            )}
            {user?.role === "buyer" && (
              <>
                <SidebarLink
                  href="/dashboard/buyer"
                  icon={<Home size={16} />}
                  pathname={pathname}
                >
                  Dashboard
                </SidebarLink>
                <SidebarLink
                  href="/dashboard/orders"
                  icon={<ShoppingBag size={16} />}
                  pathname={pathname}
                >
                  My Orders
                </SidebarLink>
                <SidebarLink
                  href="/dashboard/profile"
                  icon={<User size={16} />}
                  pathname={pathname}
                >
                  Profile
                </SidebarLink>
              </>
            )}
          </nav>

          <div className="mt-auto p-3 border-t border-black/10">
            <Link
              href="/"
              className="block text-center rounded-md border border-black/15 py-2 text-sm hover:bg-black/5"
            >
              Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarLink({
  href,
  icon,
  children,
  pathname,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  pathname: string;
}) {
  const isActive = pathname === href;
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
