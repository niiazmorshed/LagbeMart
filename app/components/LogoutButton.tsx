"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Logout failed");
      }
      toast.success("Logged out");
      router.push("/login");
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message || "Logout failed");
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center gap-2 rounded-md border border-black/10 px-3 py-2 text-sm hover:bg-black/5 transition-colors"
    >
      Logout
    </button>
  );
}


