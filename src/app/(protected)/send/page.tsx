// src/app/send/page.tsx
import { getCurrentUser } from "@/lib/auth.server";
import { SendPingClient } from "./SendPingClient";

export default async function SendPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="text-center text-red-500 mt-20">
        <p>You must be logged in to send a ping.</p>
      </div>
    );
  }

  return <SendPingClient userId={user.id} />;
}
