"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-700 bg-[#111] sticky top-0 z-50">
        {/* Logo/Home link - always visible */}
        <Link
          href="/"
          className="text-2xl font-bold text-[#ff2da0] hover:underline"
        >
          JB Ping
        </Link>

        {/* Nav links only if logged in */}
        {isLoggedIn && (
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
              onClick={handleLogout}
              className="text-[#ff2da0] hover:underline"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      <main className="flex-grow max-w-5xl mx-auto p-6">{children}</main>
    </div>
  );
}
