"use client";

import { format } from "date-fns";
import { ReceivedChatMessage, useParticipantInfo } from "@livekit/components-react";
// icons 
import { ShieldCheck } from 'lucide-react';
import { User } from 'lucide-react';
import { getSelf } from "@/lib/auth-service";




import { stringToColor } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuLabel,
} from "@/components/ui/context-menu"
import { Hint } from "../hint";
import { startTransition, useEffect, useState } from "react";
import { onRemove } from "@/actions/block";
import { toast } from "sonner";
import { getUserByUsername } from "@/lib/user_service";
import { TimeAgo } from "./time-ago";
import { useTransition } from "react";
import { onModerator } from "@/actions/modertor";
import { isModeratorByUserId } from "@/lib/moderator-service";

import { ParticipantInfo } from "livekit-server-sdk/dist/proto/livekit_models";


interface Metadata {
  moderator: boolean;
}

interface From {
  metadata: Metadata;
}

interface Data {
  from?: From;
}

interface ChatMessageProps {
  data: ReceivedChatMessage;
  isHost: boolean;
  isModerator: boolean;
  hostId: string;


};

export const ChatMessage = ({
  data,
  isHost,
  isModerator,
  hostId,

}: ChatMessageProps) => {
  const color = stringToColor(data.from?.name || "");
  const [isPending, startTransition] = useTransition();
  // const [metadata, setMetadata] = useState<ParticipantInfo | null>(null);

  const [ismode , setIsmode] = useState(false);

  console.log('isHost:', isHost);



  // Parse the JSON string into a JavaScript object
  const jsonString: string | undefined = data.from?.metadata;

  let modMark ;

  if (jsonString) {
    // Parse the JSON string into a JavaScript object
    const metadata = JSON.parse(jsonString);

    
    if (metadata.moderator === true) {
        modMark = <Hint label="Moderator" side="left" asChild>
        <ShieldCheck className=" h-3 w-3 stroke-special"  />
       </Hint>
    } else {
        modMark = null;
    }
} else {
    modMark = null ; 
}
 






  const participantId = data.from?.identity.replace(/^host-/, '') ;




    //  const metadata = lk.getParticipant(hostId ,participantId!);
  // const isMode = isModeratorByUserId(hostId ,participantId!);



  const handleRemove = () => {
    // if (  !isModerator || !isHost) return;


    if(hostId === participantId){
      toast.error("you can not remove the stream host")
      return
    }

      onRemove(participantId!)
        .then(() => toast.success("Removed"))
        .catch(() => toast.error("Something went wrong"));
    
  }

  const handleModerator = () => {
    startTransition(() => {
      onModerator(hostId, participantId!)
        .then((data) => toast.success(`${data.user.username} is Moderator Now`))
        .catch((error) => {
          const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
          toast.error(errorMessage);
        });
    });
  }


  return (

 <ContextMenu>
  <ContextMenuTrigger>
    <div className="flex gap-2 p-2 rounded-md hover:bg-white/5">
      {/* <p className="text-sm text-white/40">
        {format(data.timestamp, "HH:mm")}
      </p> */}
      <div className="flex flex-wrap items-baseline gap-1 grow">

              {/** Display Badges for Host , Mode and Elese  */}
                
                {hostId===participantId ? 
                 <Hint label="Stream Host" side="left" asChild>
                  <User className="h-3 w-3 stroke-special" /> 
                 </Hint>
                
                
                : null}
                {/* {isModerator ? 
                 <Hint label="Moderator" side="left" asChild>
                  <ShieldCheck className=" h-3 w-3 stroke-special"  />
                 </Hint>
                
                
                : null} */}


                  {modMark}
              
              

        <p className="text-sm font-semibold whitespace-nowrap">
       
  
     <span className="truncate" style={{ color: color }}>
            
            {data.from?.name}
          </span>:
        </p>
        <p className="text-sm break-all">
          {data.message}
          
          
   
                  

          
          
         
         
        </p>
      </div>
    </div>

    
</ContextMenuTrigger>
<ContextMenuContent>
    <ContextMenuLabel><p style={{ color: color }} >{data.from?.name}</p></ContextMenuLabel>
           <TimeAgo date={data.from?.joinedAt!}/>
          <p style={{fontSize:10}}>
            send: {format(data.timestamp, "HH:mm:ss")}
          </p>
    <ContextMenuSeparator></ContextMenuSeparator>

    
    <ContextMenuItem>Profile</ContextMenuItem>
    {isHost && (
      
  <>
    <text>
      {isHost? "true" : "false"}
    </text>

    <ContextMenuSeparator></ContextMenuSeparator>
   <ContextMenuItem onClick={handleModerator} disabled={isPending}> <p>Moderate </p></ContextMenuItem>
    <ContextMenuItem><p className=" text-red-700">Block</p></ContextMenuItem>

    <ContextMenuItem onClick={handleRemove} > <p className=" text-red-700">Kick </p></ContextMenuItem>



  </>
)}

    
    {isHost || isModerator && (
  <>
    

    <ContextMenuSeparator></ContextMenuSeparator>

  </>
)}
    
   
    
  </ContextMenuContent>

    </ContextMenu>




  );
};
