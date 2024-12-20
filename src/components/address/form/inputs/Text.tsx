import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useRef, useState } from "react";

interface PropsInput {
  id: string;
  placeholder: string;
  handlerKeyDown: (e: React.KeyboardEvent<any>) => void;
};



export default function InputTextAddress({ id, placeholder, handlerKeyDown }: PropsInput) {

  const refInput = useRef<null | HTMLInputElement>(null);

  const [showClearBtn, setShowClearBtn] = useState(false);



  function handlerChange(e: React.ChangeEvent<any>) {
    e.target.value ?
      setShowClearBtn(true)
    :
      setShowClearBtn(false);

  };

  function handlerClear(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if(!refInput.current) return;

    refInput.current.value = '';
    setShowClearBtn(false);
  };



  return(
    <div className="relative">

      <input
        ref={refInput}
        type="text"
        id={id}
        name={id}
        className="w-full py-2 pl-3 pr-9 border focus:outline-none"
        placeholder={placeholder}
        autoComplete='off'
        onChange={handlerChange}
        onKeyDown={handlerKeyDown}/>


      <button
        className={cn("absolute right-3 top-2/4 -translate-y-2/4 h-4 w-4 bg-gray-50 rounded-full flex-center", {
          'hidden': !showClearBtn
         })}
        onClick={handlerClear}>
        
        <X className="h-3 w-3 text-gray-600" />
      
      </button>

    </div>
  );
};