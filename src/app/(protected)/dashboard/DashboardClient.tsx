"use client";

export default function DashboardClient({ user, latestPings }: any) {
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-[#ff2da0] mb-8">Dashboard</h1>

      <div className="text-center mb-10">
        <p className="text-[#00ffff] text-lg font-medium">
          Welcome, {user.name}
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Joined: {new Date(user.createdAt).toLocaleDateString("en-GB")}
        </p>
      </div>

      {latestPings.length === 0 ? (
        <p className="text-[#00ffff] text-xl">No pings found.</p>
      ) : (
        <ul className="w-full max-w-4xl space-y-5">
          {latestPings.map((ping: any) => (
            <li
              key={ping.id}
              className="bg-[#111] p-5 rounded-lg shadow-lg border border-[#ff2da0]"
            >
              <p className="text-[#00ffff] font-semibold mb-1">
                Coordinates: {ping.latitude.toFixed(4)},{" "}
                {ping.longitude.toFixed(4)}
              </p>
              <p className="text-gray-300 mb-2">
                Timestamp: {new Date(ping.createdAt).toLocaleString("en-GB")}
              </p>
              {ping.parent ? (
                <div className="text-gray-400 text-sm">
                  <p>
                    <strong>In response to Ping ID:</strong> {ping.parent.id}
                  </p>
                  <p>
                    <strong>Parent Coordinates:</strong>{" "}
                    {ping.parent.latitude.toFixed(4)},{" "}
                    {ping.parent.longitude.toFixed(4)}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 italic text-sm">
                  This ping has no parent (initial ping).
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
