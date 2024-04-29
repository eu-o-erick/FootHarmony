'use client';

import { colors } from "@/constants/colors";
import { cn } from "@/lib/utils";
import { Variation } from "@/payload-types";


interface Props {
  variations: Variation[]
  | {
    primary_color: string;
    secondary_color?: string;
  }[];
  limit?: number;
  variationIndex: number;
  setVariationIndex: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
}

export default function VariantIcon({ variations, limit, variationIndex, setVariationIndex, className }: Props) {


  function getClassName(variationColor: string) {
    return colors.find((color) => color.label === variationColor)?.className;
  };

  

  return(
    <ul className={cn("flex gap-1.5", className)}>

      { variations.map(({primary_color, secondary_color}: any, i: number) => {

        if(limit && i >= limit) return <></>;

        return(
          <li key={i} className="relative flex items-center justify-center">

            <div className={cn("absolute rounded-full transform top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 outline outline-transparent outline-1 outline-offset-1", {
              "outline-zinc-500": variationIndex === i
            })} />


            <button className={cn("flex overflow-hidden rounded-full w-4 h-4 bg-red-100 rotate-45 border border-gray-300 transition-all", {
              "scale-110": variationIndex === i,
            })} onClick={ () => setVariationIndex(i) }>

              { primary_color && 
                <div className={"w-4 h-4 "+ getClassName(primary_color) } />
              }
                
              { secondary_color &&
                <div className={"w-4 h-4 "+ getClassName(secondary_color) } />
              }

            </button>

          </li>
        );
      })}

    </ul>
  )
}