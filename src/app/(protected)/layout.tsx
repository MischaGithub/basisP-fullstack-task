import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import Navbar from "@/components/Navbar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/"); // Redirect if no user found
  }

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <Navbar />
      <main className="w-full max-w-5xl mx-auto">{children}</main>
    </div>
  );
}
