import { db } from "@/lib/db";

export const getStreamByUserId = async (userId: string) => {
  const stream = await db.stream.findUnique({
    where: { userId },
  });

  return stream;
};


export const isLive = async (userId: string): Promise<boolean | null> => {
  const stream = await db.stream.findUnique({
    where: { userId },
  });

  // Return only the isLive property, or null if stream is not found
  return stream ? stream.isLive : null;
};