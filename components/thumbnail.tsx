"use client"

import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import { LiveBadge } from "@/components/live-badge";
import { UserAvatar } from "@/components/user-avatar";
import { useEffect, useRef, useState } from "react";
import { useImageContext } from "./ImageProvider ";
import { useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import { lk } from "@/lib/livekit";

interface ThumbnailProps {
  src: string | null;
  fallback: string;
  isLive: boolean;
  username: string;
  participantId: string;
};

export const Thumbnail = ({ 
  src,
  fallback,
  isLive,
  username,
  participantId,
 }: ThumbnailProps) => {
  let content;

  // const { capturedImages, triggerCapture } = useImageContext(p);

  // useEffect(() => {
  //   triggerCapture(participantId);
  // }, [triggerCapture, participantId]);



  // const captureImage = ( id : string) => {
  //   const capturRef = useRef<HTMLVideoElement>(null);
    


  //   useTracks([Track.Source.Camera])
  //   .filter((track) => track.participant.identity === id)
  //   .forEach((track) => {
  //     if (capturRef.current) {
  //       track.publication.track?.attach(capturRef.current)
  //     }
  //   });

  //   if (capturRef.current) {
  //     const canvas = document.createElement("canvas");
  //     canvas.width = capturRef.current.videoWidth;
  //     canvas.height = capturRef.current.videoHeight;
  //     const context = canvas.getContext("2d");
  //     if (context) {
  //       context.drawImage(capturRef.current, 0, 0, canvas.width, canvas.height);
  //       const imageUrl = canvas.toDataURL("image/png");
  //       return imageUrl ; 
         
  //     }
  //   }
  // };

    const capturedImage = null;


  if (!capturedImage) {
    content = (
      <div className="bg-background flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md">
        <UserAvatar
          size="lg"
          showBadge
          username={username}
          imageUrl={fallback}
          isLive={isLive}
        />
      </div>
    )
  } else {
    content = (
      <Image
        src={capturedImage}
        fill
        alt="Thumbnail"
        className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"
      />
    )
  }



  return (
    <div className="group aspect-video relative rounded-md cursor-pointer">
      <div className="rounded-md absolute inset-0 bg-special opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
      {content}
      {isLive && src && (
        <div className="absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

export const ThumbnailSkeleton = () => {
  return (
    <div className="group aspect-video relative rounded-xl cursor-pointer">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
