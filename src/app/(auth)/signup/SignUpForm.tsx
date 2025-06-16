"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { registerUser } from "@/actions/auth.actions";
import Spinner from "@/components/Spinner";

type RegisterResponse = {
  success: boolean;
  message: string;
};

export default function SignUpForm() {
  const initialState: RegisterResponse = {
    success: false,
    message: "",
  };

  const [state, formAction] = useActionState(registerUser, initialState);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state) {
      if (state.success) {
        setSuccessMsg(state.message);
        setErrorMsg(null);
        setLoading(true);

        // Redirect to login after short delay
        setTimeout(() => {
          router.push("/dashboard");
        }, 1200);
      } else if (!state.success && state.message) {
        setErrorMsg(state.message);
        setSuccessMsg(null);
        setLoading(false);
      }
    }
  }, [state, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        action={formAction}
        className="bg-[#111] p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h1 className="text-4xl font-bold text-[#ff2da0] mb-8 text-center">
          Sign Up
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
          type="text"
          name="name"
          placeholder="Full Name"
          required
          className="w-full mb-6 p-3 rounded border border-gray-700 bg-black text-[#00ffff] placeholder-[#00ffff] focus:outline-none focus:ring-2 focus:ring-[#ff2da0]"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          autoComplete="email"
          className="w-full mb-6 p-3 rounded border border-gray-700 bg-black text-[#00ffff] placeholder-[#00ffff] focus:outline-none focus:ring-2 focus:ring-[#ff2da0]"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          minLength={6}
          autoComplete="new-password"
          className="w-full mb-6 p-3 rounded border border-gray-700 bg-black text-[#00ffff] placeholder-[#00ffff] focus:outline-none focus:ring-2 focus:ring-[#ff2da0]"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          minLength={6}
          autoComplete="new-password"
          className="w-full mb-8 p-3 rounded border border-gray-700 bg-black text-[#00ffff] placeholder-[#00ffff] focus:outline-none focus:ring-2 focus:ring-[#ff2da0]"
        />

        <button
          type="submit"
          className="w-full bg-[#ff2da0] hover:bg-pink-600 text-black font-bold py-3 rounded transition-colors duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
