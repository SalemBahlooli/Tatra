"use server";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { getUserById } from "./user_service";
import { getStreamByUserId } from "./stream-service";
import { getStreams } from "./feed-service";

import {
  RoomServiceClient

} from "livekit-server-sdk";

import { useParticipantInfo } from "@livekit/components-react";


const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

export const isModeratorByStream = async (id: string) => {
    try {
      const self = await getSelf();
  
      const stream = await db.stream.findUnique({
        where: { id },
      });

      if (!self) {
        return false;
      }
  
      if (!stream) {
        throw new Error("Stream not found");
      }
  
      if (stream.userId=== self.id) {
        return true;
      }
  
      const existingModerator = await db.moderator.findFirst({
        where: {
          userId: self?.id,
          streamId: stream?.id,
        },
      });

      if (existingModerator){
        const data = JSON.stringify({
          moderator: true,
        });
        await roomService.updateParticipant(stream.userId, self.id, data);

      }
  
      return !!existingModerator;
    } catch {
      return false;
    }
  };

  export const isModeratorByUserId = async (id: string , userId: string) => {
    try {
      const self = await getUserById(userId);

      const stream = await db.stream.findUnique({
        where: { id },
      });


      if (!self) {
        return false;
      }
  
      if (!stream) {
        throw new Error("Stream not found");
      }
  
      if (stream.userId=== self?.id) {
        return true;
      }
  
      const existingModerator = await db.moderator.findFirst({
        where: {
          userId: self?.id,
          streamId: stream.id,
        },
      });
  
      return !!existingModerator;
    } catch {
      return false;
    }
  };


  export const promoteModerator = async (id: string, userId: string) => {
    const user = await getUserById(userId);
    const stream = await getStreamByUserId(id);
  
    if (!user) {
      throw new Error("User not found");
    }
  
    if (!stream || !stream.id) {
      throw new Error("Stream not found or Stream ID must be defined");
    }
  
    if (user.id === stream.userId) {
      throw new Error("Cannot promote yourself to Moderator");
    }
  
    const existingModerator = await db.moderator.findFirst({
      where: {
        userId: user.id,
        streamId: stream.id,
      },
    });
  
    if (existingModerator) {
      throw new Error("User is already a Moderator");
    }
  
    const moderator = await db.moderator.create({
      data: {
        userId: user.id,
        streamId: stream.id,
      },
      include: {
        user: true,
        stream: true,
      },
    });
  
    if (moderator) {
      const data = JSON.stringify({
        moderator: true,
      });
     const  mode = await roomService.updateParticipant(stream.userId, user.id, data);
    
    }
  
    return moderator;
  };