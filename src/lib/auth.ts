import { NextApiRequest } from "next";
import { jwtVerify } from "jose";
import { prisma } from "@/db/prisma";

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_AUTH_SECRET);

export async function getUserFromToken(req: NextApiRequest) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    const user = await prisma.user.findUnique({
      where: { id: payload.sub as string },
    });
    return user;
  } catch (error) {
    return null;
  }
}
