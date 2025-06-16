// app/(protected)/layout.tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/"); // Redirect if no user found
  }

  return <>{children}</>;
}
