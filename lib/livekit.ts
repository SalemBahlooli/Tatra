"use server";
import { RoomServiceClient } from 'livekit-server-sdk';


export const lk = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
  );