"use server";
import { revalidatePath } from "next/cache";


import { promoteModerator } from "@/lib/moderator-service";
import { getStreamByUserId } from "@/lib/stream-service";
import { db } from "@/lib/db";

export const onModerator = async (id: string , userId: string) => {
    try {
      const Moderator = await promoteModerator(id ,userId );
  
      revalidatePath("/");

      const stream = await db.stream.findUnique({
        where: { id },
          include:{
            user:true,
          }
      });
  
      if (Moderator) {
        revalidatePath(`/${stream?.user.username}`);
      }
  
      return Moderator;
    } catch (error) {
      throw new Error("Interal Error");
    };
  };
