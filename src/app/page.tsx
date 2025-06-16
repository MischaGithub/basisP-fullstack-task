import Link from "next/link";
import { FiLogIn, FiUserPlus } from "react-icons/fi";

export default function HomePage() {
  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl md:text-7xl font-extrabold text-[#ff2da0] mb-8 drop-shadow-lg">
        Welcome, Bond Doe
      </h1>
      <p className="text-[#00ffff] text-xl md:text-2xl mb-12 max-w-xl drop-shadow-md">
        Your mission awaits. Send encrypted pings now.
      </p>
      <div className="flex space-x-8">
        <Link
          href="/login"
          className="flex items-center space-x-3 bg-[#00ffff] text-black font-extrabold px-8 py-4 rounded-lg hover:bg-[#00cccc] transition-colors shadow-lg"
        >
          <FiLogIn size={24} />
          <span className="text-lg md:text-xl">Login</span>
        </Link>
        <Link
          href="/signup"
          className="flex items-center space-x-3 bg-[#ff2da0] text-black font-extrabold px-8 py-4 rounded-lg hover:bg-[#e60080] transition-colors shadow-lg"
        >
          <FiUserPlus size={24} />
          <span className="text-lg md:text-xl">Sign Up</span>
        </Link>
      </div>
    </div>
  );
}
