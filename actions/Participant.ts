"use server";

import { RoomServiceClient } from "livekit-server-sdk";
import { isLive } from "@/lib/stream-service";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

export const getParticipantCount = async (hostIdentity: string): Promise<number | null> => {
  try {
    const Live = await isLive(hostIdentity);

    if (Live) {
      const participants = await roomService.listParticipants(hostIdentity);
      console.debug('salem:', participants);

      // Log the participants' information
      console.log("Participants:");
      participants.forEach((participant) => {
        console.log("Identity:", participant.identity);
        console.log("Name:", participant.name);
        console.log("Metadata:", participant.metadata);
        console.log("-------------------------");
      });

      return participants.length; // Returning the count of participants
    } else {
      // If the stream is null or the user is not live, return null
      return null;
    }
  } catch (error) {
    console.error("Error fetching participants:", error);
    // Optionally rethrow the error or handle it differently
    return 0;
  }
};