import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface PropsInput {
  handlerKeyDown: (e: React.KeyboardEvent<any>) => void;
};


export default function InputPhoneAddress({ handlerKeyDown }: PropsInput) {

  const [phone, setPhone] = useState('');


  function handlerChange(e: React.ChangeEvent<any>) {
    const value = e.target.value;
    const cleaned = value.replace(/\D/g, '').substring(0, 10);
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (!match || cleaned.length !== 10) {
      setPhone(cleaned);
    
    } else {
      setPhone(`(${match[1]}) ${match[2]}-${match[3]}`);

    };
  };


  function handlerClear(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setPhone('');
  };


  useEffect(() => {
    console.log('phone: ', phone)

  }, [phone])


  return(
    <div className="relative">

      <input
        type="tel"
        id="phone_number"
        name="phone_number"
        className="w-full py-2 pl-3 pr-9 border focus:outline-none"
        placeholder='(XXX) XXX-XXXX'
        autoComplete='off'
        value={phone}
        onChange={handlerChange}
        onKeyDown={handlerKeyDown}/>


      <button
        className={cn("absolute right-3 top-2/4 -translate-y-2/4 h-4 w-4 bg-gray-50 rounded-full flex-center", {
          'hidden': !phone
         })}
        onClick={handlerClear}>
        
        <X className="h-3 w-3 text-gray-600" />
      
      </button>

    </div>
  );
};