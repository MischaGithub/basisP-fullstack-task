"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllPings } from "@/actions/ping.actions";
import Spinner from "@/components/Spinner";

const AllPingsClient = () => {
  // Fetch all pings using React Query
  const {
    data: pings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allPings"],
    queryFn: getAllPings,
  });

  // Show spinner while data is loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <Spinner />
      </div>
    );
  }

  // Show error state if fetch fails
  if (isError) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <Spinner />
        <p className="text-center text-red-400">Failed to load pings.</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-[#ff2da0] text-center mb-6">
        All Pings
      </h1>

      {pings.length === 0 ? (
        <p className="text-center text-gray-400">No pings yet.</p>
      ) : (
        <div className="space-y-4 max-w-3xl mx-auto">
          {pings.map((ping: any) => (
            <div
              key={ping.id}
              className="bg-[#111] border border-gray-700 rounded-lg p-4"
            >
              <div className="flex justify-between">
                <span className="text-sm text-[#00ffff] font-semibold">
                  {ping.user?.name || ping.user?.email} ({ping.user?.role})
                </span>
                <span className="text-sm text-gray-400">
                  {new Date(ping.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-300">
                Lat: {ping.latitude.toFixed(4)}, Long:{" "}
                {ping.longitude.toFixed(4)}
              </div>
              {ping.parentId && (
                <div className="mt-1 text-xs text-gray-500">
                  Reply to Ping: {ping.parentId}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPingsClient;
