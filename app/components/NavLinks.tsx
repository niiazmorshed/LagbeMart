"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="hidden md:flex items-center gap-6 text-sm">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`transition-opacity ${
              isActive
                ? "font-semibold text-blue-600 border-b-2 border-blue-600 pb-1"
                : "hover:opacity-70"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

