"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { loginUser } from "@/actions/auth.actions";
import { useCacheUser } from "@/hooks/useCacheUser";

type User = {
  id: string;
  email: string;
  role: string;
};

type LoginResponse = {
  success: boolean;
  message: string;
  user?: User;
};

export function LoginForm() {
  const initialState: LoginResponse = {
    success: false,
    message: "",
    user: undefined,
  };

  const [state, formAction] = useActionState(loginUser, initialState);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const router = useRouter();

  // Use your hook to cache user when state.user changes
  useCacheUser(state?.user);

  useEffect(() => {
    if (state) {
      if (state.success && state.user) {
        setSuccessMsg(state.message);
        setErrorMsg(null);

        console.log("User cached:", state.user);

        router.push("/dashboard");
      } else {
        setErrorMsg(state.message);
        setSuccessMsg(null);
      }
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        action={formAction}
        className="bg-[#111] p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h1 className="text-4xl font-bold text-[#ff2da0] mb-8 text-center">
          Login
        </h1>

        {errorMsg && (
          <p className="mb-4 text-center text-red-500 font-semibold">
            {errorMsg}
          </p>
        )}
        {successMsg && (
          <p className="mb-4 text-center text-green-400 font-semibold">
            {successMsg}
          </p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full mb-6 p-3 rounded border border-gray-700 bg-black text-[#00ffff] placeholder-[#00ffff] focus:outline-none focus:ring-2 focus:ring-[#ff2da0]"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full mb-8 p-3 rounded border border-gray-700 bg-black text-[#00ffff] placeholder-[#00ffff] focus:outline-none focus:ring-2 focus:ring-[#ff2da0]"
        />

        <button
          type="submit"
          className="w-full bg-[#ff2da0] hover:bg-pink-600 text-black font-bold py-3 rounded transition-colors duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}
