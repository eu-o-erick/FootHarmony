import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useRef, useState } from "react";

interface PropsComponentInput {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  className?: string;
}


export default function ComponentInputAddress({ id, label, placeholder, className = '', type = 'text' }: PropsComponentInput) {

  const refInput = useRef<null | HTMLInputElement>(null);

  const [showClearBtn, setShowClearBtn] = useState(false);



  function handlerChange(e: React.ChangeEvent<HTMLInputElement>) {
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
    <div className={"flex flex-col gap-2 "+ className}>
      <span className='font-semibold'>{label}</span>

      <div className="relative">
        { type === 'text' && <InputText id={id} placeholder={placeholder} refInput={refInput} handlerChange={handlerChange} /> }
        { type === 'email' && <InputText id={id} placeholder={placeholder} refInput={refInput} handlerChange={handlerChange} /> }
        

        <button className={cn("absolute right-3 top-2/4 -translate-y-2/4 h-4 w-4 bg-gray-50 rounded-full flex-center", {
          'hidden': !showClearBtn
        })} onClick={handlerClear}>
          <X className="h-3 w-3 text-gray-600" />
        </button>
      </div>
    </div>
  );
};



interface PropsInput {
  id: string;
  placeholder: string;
  refInput: React.MutableRefObject<HTMLInputElement | null>;
  handlerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


function InputText({ id, placeholder, refInput, handlerChange }: PropsInput) {

  return(
    <input
      ref={refInput}
      type="text"
      id={id}
      name={id}
      className="w-full py-2 pl-3 pr-9 border focus:outline-none"
      placeholder={placeholder}
      autoComplete='off'
      onChange={handlerChange}/>
  );
};



function InputEmail({ id, placeholder, refInput, handlerChange }: PropsInput) {

  return(
    <input
      ref={refInput}
      type="email"
      id={id}
      name={id}
      className="w-full py-2 pl-3 pr-9 border focus:outline-none"
      placeholder={placeholder}
      autoComplete='off'
      onChange={handlerChange}/>
  );
};