import Button from "@/components/ui/MyButton";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props{

};

export default function PromoCode(props: Props) {

  const [isError, setIsError] = useState(false);

  const refInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if(!isError) return;

    setTimeout(() => {
      setIsError(false);

    }, 2000)

  }, [isError])

  function handler() {
    if(!refInput.current) return;

    setIsError(true);

    refInput.current.value = '';
  };

  return (
    <div className="relative p-4 flex flex-col items-start">

      <h3 className="text-gray-600 font-bold text-sm">PROMOTION CODE</h3>
      <p className="text-xs font-light text-gray-500 mb-3 mt-1">Remove any spaces or dashes before hitting apply</p>

      <div className="flex justify-between gap-3">
        
        <input
          ref={refInput}
          type="text"
          id="promoCode"
          className="
            w-full px-3 shadow-md border border-gray-500 text-sm uppercase placeholder:text-gray-300
            font-bold text-gray-700 tracking-wider focus:outline-none
          "
          placeholder="CODE"
          maxLength={10}
          autoComplete="off"/>

        <Button handler={handler} className="min-w-24 h-9 !border !bg-gray-100 text-gray-950 hover:text-gray-200">APPLY</Button>
      </div>


      <div className={cn("fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 scale-75 opacity-0 flex items-center gap-2 text-red-400 bg-red-100 px-3 py-2 mt-2 rounded-sm transition-all ", {
        'opacity-100 scale-100': isError
      })}>
        <Info className="w-4 h-4" />
        <span className="text-sm whitespace-nowrap">Promotion code invalid</span>
      </div>

    </div>
  );
}
