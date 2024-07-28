"use client";

import { UserIcon ,  LucideEllipsisVertical } from "lucide-react";
import { BadgeCheck } from 'lucide-react';


import { 
  useParticipants, 
  useRemoteParticipant
} from "@livekit/components-react";

import { Skeleton } from "@/components/ui/skeleton";
import { VerifiedMark } from "@/components/verified-mark";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";

import { Actions, ActionsSkeleton } from "./actions";
import { Username } from "../user-info/display-user-name";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { RepoetModal } from "./report-modal";
import { updateStreamCount } from "@/actions/stream";




interface HeaderProps {
  imageUrl: string;
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  isFollowing: boolean;
  name: string;
  createdAt: Date;
};

export const Header = ({
  imageUrl,
  hostName,
  hostIdentity,
  viewerIdentity,
  isFollowing,
  name,
  createdAt,
}: HeaderProps) => {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);

  const isLive = !!participant;
  const participantCount = participants.length - 1;
  
  

  
  

  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;
  

  

 

  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={imageUrl}
          username={hostName}
          size="lg"
          isLive={isLive}
          showBadge
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-1">
            <h2 className="text-lg font-semibold">
              <Username username={hostName} createdAt={createdAt}/>

            </h2>
            <h2 className="text-lg font-semibold">
           
            
            </h2>
            {/* <VerifiedMark /> */}
            <BadgeCheck className="h-4 w-4 stroke-special" />

          </div>
          <p className="text-sm font-semibold">
            {name}
          </p>
          {isLive? (
            <div className="font-semibold flex gap-x-1 items-center text-xs text-special"> 
              <UserIcon className="h-4 w-4" />
              <p>
                {participantCount} {participantCount === 1 ? "viewer" : "viewers"}
              </p>
            </div>
          ) : (
            <p className="font-semibold text-xs text-muted-foreground">
              Offline
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-items-center">
      <Actions
              isFollowing={isFollowing}
              hostIdentity={hostIdentity}
              isHost={isHost}
            />
         <div className="mt-1 ml-1">
            <RepoetModal hostName={hostName} initialValue="" />
        
         </div>

         

          

      </div>
         

      




    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-2">
        <UserAvatarSkeleton size="lg" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <ActionsSkeleton />
    </div>
  );
};
