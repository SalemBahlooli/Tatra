"use client";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

  import { format } from 'date-fns';
  


interface UsernameProps {
  username: string;
  createdAt: Date;

  
};

export const Username = ({
  username,
  createdAt,
 
}: UsernameProps) => {

    const formattedDate = createdAt ? format(createdAt, 'MMMM do, yyyy') : 'Loading date...';
  

  return (
    <div >
      

<HoverCard>
  <HoverCardTrigger> 
    <h2 className="text-lg font-semibold">
             {username} 
            </h2>
    </HoverCardTrigger>
  <HoverCardContent>

  <h1>Account created on: {formattedDate}</h1>
  
  </HoverCardContent>
</HoverCard>

    </div>
  );
};



