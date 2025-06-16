"use client";

import { useLogout } from "@/hooks/useLogout";

const LogoutButton = () => {
  // Clear user from cache
  const logout = useLogout();

  return (
    <button onClick={logout} className="text-[#ff2da0] hover:underline">
      Logout
    </button>
  );
};

export default LogoutButton;
