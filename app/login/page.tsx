"use client";
import { useLoginMutation } from "@/lib/services/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const [login] = useLoginMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      const email = String(formData.get("email") || "").trim();
      const password = String(formData.get("password") || "");
      if (!email || !password) {
        toast.error("Please provide email and password");
        setSubmitting(false);
        return;
      }
      const data = await login({ email, password }).unwrap();
      if (!data?.success) {
        throw new Error(data?.error || "Login failed");
      }
      toast.success("Logged in successfully");
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Sign in to LagbeMart</h1>
          <p className="mt-2 text-sm text-black/70">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="underline underline-offset-4 hover:opacity-80"
            >
              Create one
            </Link>
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full rounded-md border border-black/15 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full rounded-md border border-black/15 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-black text-white py-2 font-medium hover:bg-black/90 transition-colors disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm underline underline-offset-4 hover:opacity-80"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
