import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { IoMdArrowDropup } from "react-icons/io";

interface Props{
  children: React.ReactNode;
  classNames?: string;
  label: string;
  right?: boolean;
  using: boolean;
};


export default function ItemFilter({children, classNames, label, right, using}: Props) {

  const ref = useRef<null | HTMLDivElement>(null);

  const searchParams = useSearchParams().toString();

  useEffect(() => {
    const dropdowns = document.getElementsByClassName('show-dropdown');

    Array.from(dropdowns).forEach(elem => elem.classList.remove('show-dropdown'))

  }, [searchParams]);


  function toggleOpenDropDown() {
    const elem = ref.current;

    if(!elem) return;

    if(elem.className.includes('show-dropdown')) {
      elem.classList.remove('show-dropdown');
      
    } else {
      elem.classList.add('show-dropdown');

    };
  };


  return (
    <div className={'relative h-[30px] ' + (classNames ?? '')}>

      <div ref={ref} className={cn(`
        absolute z-20 top-3/4 left-0 mt-2 bg-white shadow-md border border-gray-950
        opacity-0 scale-75 pointer-events-none transition-all
      `, {
        '!left-auto right-0': right
      })}>

        <IoMdArrowDropup className={cn("absolute -top-[15px] left-3 text-2xl text-gray-950",{
          '!left-auto right-3': right
        })} />
        
        { children }

      </div>
    
      <button className={`
        relative shadow-sm button-dropdown flex-center gap-2 border border-gray-950 px-3 py-1.5
        font-semibold text-xs uppercase hover:bg-gray-200 transition-all
      `}
      onClick={toggleOpenDropDown}>

        <div className={cn("w-2 h-full absolute top-0 right-0 bg-gray-950 hidden", {
          'block': using
        })} />

        {label}
        <ChevronDown className="pointer-events-none w-4 h-4 transition-all" />
      </button>

    </div>
  );
};
