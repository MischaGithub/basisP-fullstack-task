// app/dashboard/page.tsx
import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/db/prisma";
import { redirect } from "next/navigation";
import Layout from "@/components/Layout";
export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const latestPings = await prisma.ping.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: {
      parent: {
        select: { id: true, latitude: true, longitude: true, createdAt: true },
      },
    },
  });

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-[#ff2da0] text-center mb-6">
        Dashboard
      </h1>
      {latestPings.length === 0 ? (
        <p className="text-[#00ffff]">No pings found.</p>
      ) : (
        <ul className="space-y-4 max-w-3xl mx-auto">
          {latestPings.map((ping) => (
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
                {new Date(ping.createdAt).toLocaleString()}
              </p>
              {ping.parent ? (
                <p>
                  <strong>In response to Ping ID:</strong> {ping.parent.id}{" "}
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
