"use client";

import { useRouter } from "next/navigation";
import { useGeolocation } from "@/hooks/useGeoLocation";
import { sendPing } from "@/actions/ping.actions";
import Spinner from "@/components/Spinner";

const SendPingClient = () => {
  const router = useRouter();
  const {
    coordinates,
    error: locationError,
    isLoading,
    getLocation,
  } = useGeolocation();

  // Handling send ping
  const handleSendPing = async () => {
    if (!coordinates) return;

    try {
      await sendPing({
        latitude: coordinates.lat,
        longitude: coordinates.lon,
      });
      router.push("/pings");
    } catch (error) {
      console.log("Failed to send ping:", error);
    }
  };

  return (
    <div className="h-[80vh] bg-black text-white flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold text-[#ff2da0] mb-4">Mark Your Spot</h1>
      <p className="text-[#00ffff] mb-6">Ping your coordinates securely</p>

      {isLoading ? (
        <div className="flex items-center gap-3 mb-4">
          <Spinner />
          <span className="text-white">Getting location...</span>
        </div>
      ) : (
        !coordinates && (
          <button
            onClick={getLocation}
            className="bg-[#444] text-white px-4 py-2 rounded mb-4"
          >
            Retry Geolocation
          </button>
        )
      )}

      <button
        onClick={handleSendPing}
        disabled={isLoading || !coordinates}
        className="bg-[#00ffff] text-black font-bold px-6 py-3 rounded hover:bg-[#00cccc] disabled:opacity-50"
      >
        {isLoading ? "Sending..." : "Send Ping"}
      </button>

      {locationError && <p className="mt-4 text-red-500">{locationError}</p>}
    </div>
  );
};

export default SendPingClient;
