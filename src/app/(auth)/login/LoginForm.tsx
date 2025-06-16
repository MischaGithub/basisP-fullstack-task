"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { loginUser } from "@/actions/auth.actions";
import Spinner from "@/components/Spinner";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";

const LoginForm = () => {
  const initialState = {
    success: false,
    message: "",
    user: null,
  };

  const [state, formAction] = useActionState(loginUser, initialState);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state) {
      if (state.success && state.user) {
        setSuccessMsg(state.message);
        setErrorMsg(null);
        setLoading(true);

        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
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
    <div className="h-screen flex items-center justify-center bg-black px-4">
      <form
        action={formAction}
        className="bg-[#111] p-10 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-5xl font-extrabold text-[#ff2da0] mb-10 text-center drop-shadow-md">
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

        <div className="relative mb-6">
          <FiMail
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#00ffff]"
            size={20}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full pl-10 p-3 rounded-lg border border-gray-700 bg-black text-[#00ffff] placeholder-[#00ffff] focus:outline-none focus:ring-2 focus:ring-[#ff2da0]"
          />
        </div>

        <div className="relative mb-8">
          <FiLock
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#00ffff]"
            size={20}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full pl-10 p-3 rounded-lg border border-gray-700 bg-black text-[#00ffff] placeholder-[#00ffff] focus:outline-none focus:ring-2 focus:ring-[#ff2da0]"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-3 bg-[#ff2da0] hover:bg-pink-600 text-black font-extrabold py-4 rounded-lg transition-all duration-300 text-lg shadow-md"
        >
          <FiLogIn size={22} />
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
