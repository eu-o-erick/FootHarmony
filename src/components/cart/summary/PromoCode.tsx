import Error from "@/components/Error";
import Button from "@/components/ui/MyButton";
import { useEffect, useRef, useState } from "react";

interface Props{

};

export default function PromoCode(props: Props) {

  const [isError, setIsError] = useState(false);

  const refInput = useRef<HTMLInputElement | null>(null);

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
          autoComplete="off"
          onKeyDown={(e) => e.code === 'Enter' && handler() }/>

        <Button handler={handler} className="min-w-24 h-9">APPLY</Button>
      </div>


      <Error isError={isError} setIsError={setIsError} label={'Promotion code invalid'} />

    </div>
  );
}
