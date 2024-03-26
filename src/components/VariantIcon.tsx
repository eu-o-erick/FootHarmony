import { cn } from "@/lib/utils";


interface Props {
  i: number;
  colors: string[];
  variationIndex: number;
  setVariantIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function VariantIcon({ i, colors, variationIndex, setVariantIndex }: Props) {

  function handlerClick() {
    setVariantIndex(i);

  };


  return(
    <li className="relative flex items-center justify-center">

      <div className={cn("absolute rounded-full transform top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 outline outline-transparent outline-1 outline-offset-1", {
        "outline-zinc-500": variationIndex === i
      })} />


      <button className={cn("flex overflow-hidden rounded-full w-4 h-4 bg-red-100 rotate-45 border border-black", {
        "opacity-70": variationIndex !== i
      })} onClick={handlerClick}>

        { colors[0] && 
          <div className="w-4 h-4" style={{background: colors[0]}} />
        }
          
        { colors[1] &&
          <>
            <div className="w-px h-full bg-black"  />
            <div className="w-4 h-4" style={{background: colors[1]}} />
          </> 
        }

      </button>

    </li>
  )
}