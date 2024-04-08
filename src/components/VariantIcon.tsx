'use client';

import { cn } from "@/lib/utils";
import { useState } from "react";


interface Props {
  variations: {
    colors: string[];
  }[];
  variationIndex: number;
  setVariationIndex: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
}

export default function VariantIcon({ variations, variationIndex, setVariationIndex, className }: Props) {


  return(
    <ul className={cn("flex gap-1.5", className)}>

      { variations.map((item: any, i: number) => {
        const colors = item.colors;

        return(
          <li key={i} className="relative flex items-center justify-center">

            <div className={cn("absolute rounded-full transform top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 outline outline-transparent outline-1 outline-offset-1", {
              "outline-zinc-500": variationIndex === i
            })} />


            <button className={cn("flex overflow-hidden rounded-full w-4 h-4 bg-red-100 rotate-45 border border-gray-300 transition-all", {
              "scale-110": variationIndex === i,
            })} onClick={ () => setVariationIndex(i) }>

              { colors[0] && 
                <div className="w-4 h-4" style={{background: colors[0]}} />
              }
                
              { colors[1] &&
                <div className="w-4 h-4" style={{background: colors[1]}} />
              }

            </button>

          </li>
        );
      })}

    </ul>
  )
}