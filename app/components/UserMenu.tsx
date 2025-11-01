"use client";
import { useState } from "react";
import LogoutButton from "./LogoutButton";

export default function UserMenu({ name, email }: { name?: string; email: string }) {
  const [open, setOpen] = useState(false);
  const initial = (name || email || "U").charAt(0).toUpperCase();
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="h-8 w-8 rounded-full bg-black/10 flex items-center justify-center text-sm font-medium"
        aria-label="User menu"
      >
        {initial}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-md border border-black/10 bg-white shadow-lg z-50">
          <div className="px-3 py-2 text-sm">
            <div className="font-medium">{name || "User"}</div>
            <div className="text-black/70 truncate">{email}</div>
          </div>
          <div className="border-t border-black/10" />
          <div className="px-3 py-2">
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
}


