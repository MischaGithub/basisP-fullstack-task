// actions/ping.actions.ts
"use server";

import { prisma } from "@/db/prisma";
import { getCurrentUser } from "@/lib/current-user";
import { revalidatePath } from "next/cache";

/**
 * Fetch all pings
 */
export async function getAllPings() {
  return prisma.ping.findMany({
    include: {
      user: true,
      parent: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Send a new ping with location data
 */
export async function sendPing({
  latitude,
  longitude,
  parentId,
}: {
  latitude: number;
  longitude: number;
  parentId?: string;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  await prisma.ping.create({
    data: {
      userId: user.id,
      latitude,
      longitude,
      parentId: parentId || null,
    },
  });

  revalidatePath("/pings"); // Optional: so All Pings page refreshes
}
