"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login"); // redirect to login if no token
    }
  }, [router]);

  return (
    <Layout>
      <h2 className="text-3xl mb-4">Dashboard</h2>
      {/* Your dashboard content */}
    </Layout>
  );
}
