"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { registerUser } from "@/actions/auth.actions";
import Spinner from "@/components/Spinner";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

const SignUpForm = () => {
  const intialState = {
    success: false,
    message: "",
  };

  const router = useRouter();
  const [state, formAction] = useActionState(registerUser, intialState);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state) {
      if (state.success) {
        setErrorMsg(null);
        setLoading(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 1200);
      } else if (!state.success && state.message) {
        setErrorMsg(state.message);
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
        className="bg-[#111] p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-5xl font-extrabold text-[#ff2da0] mb-8 text-center drop-shadow-md">
          Sign Up
        </h1>

        {errorMsg && (
          <p className="mb-4 text-center text-red-500 font-semibold">
            {errorMsg}
          </p>
        )}

        {/* Full Name */}
        <div className="flex items-center mb-6 bg-black border border-gray-700 rounded px-3 py-2">
          <FiUser className="text-[#00ffff] mr-3" size={20} />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full bg-transparent text-[#00ffff] placeholder-[#00ffff] focus:outline-none"
          />
        </div>

        {/* Email */}
        <div className="flex items-center mb-6 bg-black border border-gray-700 rounded px-3 py-2">
          <FiMail className="text-[#00ffff] mr-3" size={20} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            autoComplete="email"
            className="w-full bg-transparent text-[#00ffff] placeholder-[#00ffff] focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="flex items-center mb-6 bg-black border border-gray-700 rounded px-3 py-2">
          <FiLock className="text-[#00ffff] mr-3" size={20} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            minLength={6}
            autoComplete="new-password"
            className="w-full bg-transparent text-[#00ffff] placeholder-[#00ffff] focus:outline-none"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex items-center mb-8 bg-black border border-gray-700 rounded px-3 py-2">
          <FiLock className="text-[#00ffff] mr-3" size={20} />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            minLength={6}
            autoComplete="new-password"
            className="w-full bg-transparent text-[#00ffff] placeholder-[#00ffff] focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#ff2da0] hover:bg-pink-600 text-black font-extrabold py-3 rounded-lg transition-colors duration-300 shadow-md"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
