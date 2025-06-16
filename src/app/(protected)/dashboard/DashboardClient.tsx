// app/dashboard/DashboardClient.tsx
"use client";

import { useCacheUser } from "@/hooks/useCacheUser";

export default function DashboardClient({ user, latestPings }: any) {
  useCacheUser(user); // Cache user into React Query for the rest of the app

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-[#ff2da0] text-center mb-6">
        Dashboard
      </h1>

      <div className="text-center mb-6">
        <p className="text-[#00ffff] text-sm">Welcome, {user.email}</p>
        <p className="text-gray-400 text-xs">
          Joined: {new Date(user.createdAt).toLocaleDateString("en-GB")}
        </p>
      </div>

      {latestPings.length === 0 ? (
        <p className="text-[#00ffff]">No pings found.</p>
      ) : (
        <ul className="space-y-4 max-w-3xl mx-auto">
          {latestPings.map((ping: any) => (
            <li
              key={ping.id}
              className="bg-[#111] p-4 rounded shadow-md border border-[#ff2da0]"
            >
              <p>
                <strong>Coordinates:</strong> {ping.latitude.toFixed(4)},{" "}
                {ping.longitude.toFixed(4)}
              </p>
              <p>
                <strong>Timestamp:</strong>{" "}
                {new Date(ping.createdAt).toLocaleString("en-GB")}
              </p>
              {ping.parent ? (
                <p>
                  <strong>In response to Ping ID:</strong> {ping.parent.id}
                  <br />
                  <strong>Parent Coordinates:</strong>{" "}
                  {ping.parent.latitude.toFixed(4)},{" "}
                  {ping.parent.longitude.toFixed(4)}
                </p>
              ) : (
                <p>This ping has no parent (initial ping).</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
