"use client";

import { toast } from "sonner";
import { Heart , HeartCrack } from "lucide-react";
import { useTransition } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, } from "react";


import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { onFollow, onUnfollow } from "@/actions/follow";

interface ActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
};

export const Actions = ({
  hostIdentity,
  isFollowing,
  isHost,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { userId } = useAuth();
  const [isHovering, setIsHovering] = useState(false);


  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) => toast.success(`You are now following ${data.following.username}`))
        .catch(() => toast.error("Something went wrong"))
    });
  }

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
        .catch(() => toast.error("Something went wrong"))
    });
  }

  const toggleFollow = () => {
    if (!userId) {
      return router.push("/sign-in");
    }

    if (isHost) return;

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  }

  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  
  // Handler for mouse leave
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <Button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant="spical"
      size="sm"
      className="w-full lg:w-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}

    >
    {(isFollowing && isHovering) ? (
    <HeartCrack className="h-4 w-4 mr-2 fill-special" />
  ) : (
    <Heart
      className={cn(
        "h-4 w-4 mr-2",
        isFollowing ? "fill-special stroke-special hover:fill-black" : "color-special"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    />
  )}
  {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  )
};

export const ActionsSkeleton = () => {
  return (
    <Skeleton className="h-10 w-full lg:w-24" />
  );
};
