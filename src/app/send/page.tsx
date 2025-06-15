"use client";

import { sendPing } from "@/actions/ping.actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SendPingPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSendPing = () => {
    setError("");
    setLoading(true);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await sendPing({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          router.push("/pings");
        } catch (err) {
          console.error(err);
          setError("Failed to send ping.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setError("Unable to retrieve your location.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold text-[#ff2da0] mb-4">Send a Ping</h1>
      <p className="text-[#00ffff] mb-6">Ping your coordinates securely</p>

      <button
        onClick={handleSendPing}
        disabled={loading}
        className="bg-[#00ffff] text-black font-bold px-6 py-3 rounded hover:bg-[#00cccc] disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Ping"}
      </button>

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
