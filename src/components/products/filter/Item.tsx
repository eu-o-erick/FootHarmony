import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { IoMdArrowDropup } from "react-icons/io";

interface Props{
  label: string;
  children: React.ReactNode;
};


export default function ItemFilter({label, children}: Props) {

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
    <div className='relative'>

      <div ref={ref} className="absolute z-20 top-3/4 left-0 mt-2 bg-white shadow-md border border-gray-950 opacity-0 scale-75 pointer-events-none transition-all">
        <IoMdArrowDropup className="absolute -top-[15px] left-3 text-2xl text-gray-950" />
        { children }
      </div>
    
      <button className="button-dropdown border border-gray-950 px-3 py-1.5 font-semibold text-xs uppercase hover:bg-gray-200 transition-all" onClick={toggleOpenDropDown}>
        {label}
      </button>

    </div>
  );
};
