"use client";

import { Signal , SignalHigh , SignalLow , PlugZap , SignalMedium    } from 'lucide-react';

import { Hint } from "@/components/hint";
import { Slider } from "@/components/ui/slider";

interface ConnectionProps {
  connection: string,
};

export const Connection = ({
  connection,
}: ConnectionProps) => {

    let content ;

    if(connection==="excellent"){
        content = <SignalHigh />

    }else if( connection==="good"){
        content = <SignalMedium />


    }else if (connection==="poor"){
        content =  <SignalLow />


    }else {
        content = <PlugZap />


    }

  

  return (
    <div className="flex justify-end gap-2">

        

        {content} 

     
    </div>
  );
};