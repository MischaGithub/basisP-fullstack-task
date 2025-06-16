import Link from "next/link";
import { getCurrentUser } from "@/lib/current-user";
import LogoutButton from "./LogoutButton";
import { FiZap } from "react-icons/fi";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-700 bg-[#111] sticky top-0 z-50">
      <Link
        href="/"
        className="flex items-center space-x-2 text-4xl font-extrabold text-[#ff2da0] hover:underline"
      >
        <span>Chain</span>
        <FiZap size={36} />
      </Link>

      {user && (
        <div className="space-x-4 text-xl">
          <Link href="/dashboard" className="text-[#00ffff] hover:underline">
            Dashboard
          </Link>
          <Link href="/send" className="text-[#00ffff] hover:underline">
            Send Ping
          </Link>
          <Link href="/pings" className="text-[#00ffff] hover:underline">
            All Pings
          </Link>
          <LogoutButton />
        </div>
      )}
    </nav>
  );
}
