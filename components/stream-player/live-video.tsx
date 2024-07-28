"use client";

import { useRef, useState, useEffect , useMemo } from "react";
import { Participant, Track } from "livekit-client";
import { useTracks  , useChat} from "@livekit/components-react";
import { useEventListener } from "usehooks-ts";

import { VolumeControl } from "./volume-control";
import { FullscreenControl } from "./fullscreen-control";
import { useImageContext } from "../ImageProvider ";
import { Connection } from "./connection";
import { Chat } from "./chat";
import { ChatList } from "./chat-list";

interface LiveVideoProps {
  participant: Participant;

  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  viewerName: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
  isModerator: boolean;


};

export const LiveVideo = ({
  participant,


  hostName,
  hostIdentity,
  viewerIdentity,
  viewerName,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
  isModerator,
}: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(5);

  const { setCapturedImage } = useImageContext(); // Use the context

  const connection = participant.connectionQuality;


  const onVolumeChange = (value: number) => {
    setVolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0;

    setVolume(isMuted ? 50 : 0);

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };
  
  useEffect(() => {
    onVolumeChange(0);
  }, []);

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen()
    } else if (wrapperRef?.current) {
      wrapperRef.current.requestFullscreen()
    }
  };

  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentlyFullscreen);
  }

  useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current)
      }
    });

     const captureImage = ( id : string) => {
      const capturRef = useRef<HTMLVideoElement>(null);

      useTracks([Track.Source.Camera])
      .filter((track) => track.participant.identity === id)
      .forEach((track) => {
        if (capturRef.current) {
          track.publication.track?.attach(capturRef.current)
        }
      });

      if (capturRef.current) {
        const canvas = document.createElement("canvas");
        canvas.width = capturRef.current.videoWidth;
        canvas.height = capturRef.current.videoHeight;
        const context = canvas.getContext("2d");
        if (context) {
          context.drawImage(capturRef.current, 0, 0, canvas.width, canvas.height);
          const imageUrl = canvas.toDataURL("image/png");
          return imageUrl ; 
           
        }
      }
    };

    const { chatMessages: messages } = useChat();
    const reversedMessages = useMemo(() => {
      return messages.sort((a, b) => b.timestamp - a.timestamp);
    }, [messages]);

    // useEffect(() => {
    //   const handleCapture = () => {
    //     captureImage();
    //   };
  
    //   document.addEventListener("capture-image", handleCapture);
  
    //   return () => {
    //     document.removeEventListener("capture-image", handleCapture);
    //   };
    // }, []);

  return (
    <div ref={wrapperRef} className="relative h-full flex" >
       <video ref={videoRef} width="100%"/>

      


      

      {/* <Chat

          viewerName={viewerName}
          hostName={hostName}
          hostIdentity={hostIdentity}
          viewerIdentity={viewerIdentity}
          isFollowing={isFollowing}
          isChatEnabled={isChatEnabled}
          isChatDelayed={isChatDelayed}
          isChatFollowersOnly={isChatFollowersOnly}
          isModerator={isModerator}
      
      
      
      /> */}

        <div className="absolute right-0 items-center justify-center">
        <ChatList
            messages={reversedMessages}
            isHidden={false}
            isHost={true}
            isModerator={isModerator}
            hostIdentity={hostIdentity}

          />
                    </div>

     <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">

      


    <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
      <VolumeControl
        onChange={onVolumeChange}
        value={volume}
        onToggle={toggleMute}
        
      />
      {/* <div className=" justify-end">
                  <Connection connection={connection}/>

      </div> */}
      <FullscreenControl
        isFullscreen={isFullscreen}
        onToggle={toggleFullscreen}
        connection={connection}
      />
    </div>
  </div>
</div>
  );
};
