
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("demo@shopsphere.com");
  const [password, setPassword] = useState("Shop1234!");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      });

      if (!result || result.error) {
        setError("Invalid email or password.");
        return;
      }

      router.push("/account");
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          ShopSphere<span className="text-orange-500">.</span>
        </Link>
        <h1 className="mt-8 text-2xl font-bold">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-500">
          Sign in to access your account.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-5 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
          <p className="font-semibold">Demo account</p>
          <p>Email: demo@shopsphere.com</p>
          <p>Password: Shop1234!</p>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/" className="font-medium text-orange-600 hover:underline">
            Back to store
          </Link>
        </p>
      </div>
    </main>
  );
}
