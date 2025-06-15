import Link from "next/link";
import { getCurrentUser } from "@/lib/auth.server";
import { logoutUser } from "@/actions/auth.actions";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-700 bg-[#111] sticky top-0 z-50">
      <Link
        href="/"
        className="text-2xl font-bold text-[#ff2da0] hover:underline"
      >
        JB Ping
      </Link>

      {user && (
        <div className="space-x-4 text-sm">
          <Link href="/dashboard" className="text-[#00ffff] hover:underline">
            Dashboard
          </Link>
          <Link href="/send" className="text-[#00ffff] hover:underline">
            Send Ping
          </Link>
          <Link href="/pings" className="text-[#00ffff] hover:underline">
            All Pings
          </Link>
          <button
            onClick={logoutUser}
            className="text-[#ff2da0] hover:underline"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
