// app/(protected)/layout.tsx
import { getCurrentUser } from "@/lib/auth.server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    // Redirect to login if no user
    redirect("/");
  }

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      {/* Optionally render your navbar here */}
      {children}
    </div>
  );
}
