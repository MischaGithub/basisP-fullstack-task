// hooks/useCacheUser.ts
"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function useCacheUser(user: any) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user) {
      queryClient.setQueryData(["currentUser"], user);
    }
  }, [user, queryClient]);
}
