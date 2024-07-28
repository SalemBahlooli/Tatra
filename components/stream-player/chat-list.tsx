"use client";

import { ReceivedChatMessage } from "@livekit/components-react";

import { Skeleton } from "@/components/ui/skeleton";

import { ChatMessage } from "./chat-message";
import { isModeratorByUserId } from "@/lib/moderator-service";
import { useEffect, useState } from "react";

interface ChatListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
  isHost: boolean;
  isModerator: boolean;
  hostIdentity: string;


};

export const ChatList = ({
  messages,
  isHidden,
  isHost,
  isModerator,
  hostIdentity,
}: ChatListProps) => {

  
   
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {isHidden ? "Chat is disabled" : "Welcome to the chat!"}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
      {messages.map((message) => (
        <ChatMessage
          key={message.timestamp}
          data={message}
          isHost={isHost}
          isModerator={isModerator}
          hostId={hostIdentity}
        />
      ))}
    </div>
  );
};

export const ChatListSkeleton = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="w-1/2 h-6" />
    </div>
  );
};
