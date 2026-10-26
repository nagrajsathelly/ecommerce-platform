import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl border bg-white p-8">
        <Link href="/" className="text-xl font-bold text-gray-900">
          ShopSphere<span className="text-orange-500">.</span>
        </Link>

        <h1 className="mt-8 text-3xl font-bold">My Account</h1>
        <p className="mt-3 text-gray-600">You are signed in successfully.</p>

        <div className="mt-6 rounded-xl bg-gray-50 p-5">
          <p className="text-sm text-gray-500">Name</p>
          <p className="mt-1 font-semibold">
            {session.user.name ?? "Customer"}
          </p>
          <p className="mt-4 text-sm text-gray-500">Email</p>
          <p className="mt-1 font-semibold">{session.user.email}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/cart"
            className="rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white hover:bg-orange-600"
          >
            View Cart
          </Link>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="rounded-lg border px-4 py-3 font-semibold hover:bg-gray-50"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
