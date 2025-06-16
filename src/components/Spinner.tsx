// components/Spinner.tsx
"use client";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <svg
        className="animate-spin-slow h-10 w-10"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pink circle */}
        <circle
          className="opacity-75"
          cx="25"
          cy="25"
          r="20"
          stroke="#ff2da0"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="90 150"
        />
        {/* Blue circle, rotate opposite */}
        <circle
          className="opacity-50 animate-spin-reverse"
          cx="25"
          cy="25"
          r="15"
          stroke="#00ffff"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="60 100"
        />
      </svg>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 2s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}
