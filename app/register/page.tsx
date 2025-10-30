"use client";
import { useRegisterUserMutation, useLoginMutation } from "@/lib/services/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [registerUser] = useRegisterUserMutation();
  const [login] = useLoginMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!name || !email || !password) {
      setError("Please provide name, email and password.");
      setSubmitting(false);
      return;
    }

    try {
      const data = await registerUser({ name, email, password }).unwrap();
      if (!data?.success) {
        const errMsg =
          (data as { error?: string })?.error || "Failed to create account";
        throw new Error(errMsg);
      }
      // Auto-login the new user so navbar shows their name immediately
      await login({ email, password }).unwrap();
      toast.success("Account created successfully");
      setMessage("Account created successfully.");
      form.reset();
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="mt-2 text-sm text-black/70">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline underline-offset-4 hover:opacity-80"
            >
              Sign in
            </Link>
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Niaz Morshed"
              className="w-full rounded-md border border-black/15 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="niazmorshedrafi@gmail.com"
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
          {error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : message ? (
            <p className="text-sm text-green-600">{message}</p>
          ) : null}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-black text-white py-2 font-medium hover:bg-black/90 transition-colors disabled:opacity-60"
          >
            {submitting ? "Creating..." : "Create account"}
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
