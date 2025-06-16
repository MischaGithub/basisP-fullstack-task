import { getCurrentUser } from "@/lib/current-user";
import SendPingClient from "./SendPingClient";

const SendPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="text-center text-red-500 mt-20">
        <p>You must be logged in to send a ping.</p>
      </div>
    );
  }

  return <SendPingClient userId={user.id} />;
};

export default SendPage;
