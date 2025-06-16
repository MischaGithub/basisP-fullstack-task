// hooks/useLogout.ts
"use client";

import { useRouter } from "next/navigation";
import { logoutUser } from "@/actions/auth.actions";
import { useQueryClient } from "@tanstack/react-query";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    const res = await logoutUser();

    if (res.success) {
      queryClient.clear(); // Optional: if you still use React Query
      localStorage.removeItem("user"); // Optional: clear local storage cache

      router.push("/"); // Redirect to home
      router.refresh(); // Refresh server components
    } else {
      console.error("Logout failed:", res.message);
    }
  };

  return handleLogout;
}
