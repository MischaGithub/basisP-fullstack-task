// app/dashboard/page.tsx
import { getCurrentUser } from "@/lib/auth.server";
import DashboardClient from "./DashboardClient";
import { prisma } from "@/db/prisma";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  const latestPings = await prisma.ping.findMany({
    where: { userId: user?.id },
    take: 3,
    orderBy: { createdAt: "desc" },
    include: { parent: true },
  });

  return <DashboardClient user={user} latestPings={latestPings} />;
}
