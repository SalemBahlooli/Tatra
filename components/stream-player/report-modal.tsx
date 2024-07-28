"use client";

import { toast } from "sonner";
import { useState, useTransition, useRef, ElementRef } from "react";


import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert";
  import { AlertTriangle ,  MessageSquareWarning } from "lucide-react";



import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { colors } from "@clerk/themes/dist/clerk-js/src/ui/foundations/colors";








interface RepoetModalProps {
  initialValue: string | null;
  hostName: string;
};

export const RepoetModal = ({
  initialValue,
  hostName,
}: RepoetModalProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(initialValue || "");
  const [isHovering, setIsHovering] = useState(false);


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      
        
    });
  }

// Handler for mouse enter
const handleMouseEnter = () => {
  setIsHovering(true);
};

// Handler for mouse leave
const handleMouseLeave = () => {
  setIsHovering(false);
};
  return (
    <Dialog>
      <DialogTrigger >
      <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
           

           {isHovering ? <MessageSquareWarning style={{color:'red'}} /> : <MessageSquareWarning />}


      </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit a complaint and report on {hostName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            placeholder="Explain the complaint"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            disabled={isPending}
            className="resize-none"
          />
         <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
          Any false report or lack of a real reason for the report, you will be held accountable and your account will be suspended from the platform.
          </AlertDescription>
        </Alert>
          <div className="flex justify-between">
            <DialogClose  >
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isPending}
              type="submit"
              variant="primary"
            >
              submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
