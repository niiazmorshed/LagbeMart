import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="mt-2 text-sm text-black/70">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4 hover:opacity-80">
              Sign in
            </Link>
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
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
              placeholder="you@example.com"
              className="w-full rounded-md border border-black/15 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-md border border-black/15 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>
          <button
            type="button"
            className="w-full rounded-md bg-black text-white py-2 font-medium hover:bg-black/90 transition-colors"
          >
            Create account
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm underline underline-offset-4 hover:opacity-80">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}


