import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-extrabold text-[#ff2da0] mb-6">
        Welcome, Agent
      </h1>
      <p className="text-[#00ffff] mb-10">
        Your mission awaits. Send encrypted pings now.
      </p>
      <div className="space-x-4">
        <Link
          href="/login"
          className="bg-[#00ffff] text-black font-bold px-6 py-3 rounded hover:bg-[#00cccc]"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="bg-[#ff2da0] text-black font-bold px-6 py-3 rounded hover:bg-[#e60080]"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
