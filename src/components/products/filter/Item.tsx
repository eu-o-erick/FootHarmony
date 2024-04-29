import { useRef } from "react";
import { IoMdArrowDropup } from "react-icons/io";

interface Props{
  label: string;
  children: React.ReactNode;
};


export default function ItemFilter({label, children}: Props) {

  const ref = useRef<null | HTMLDivElement>(null);

  function toggleOpenDropDown(e: React.MouseEvent<HTMLButtonElement>) {
    const elem = ref.current;
    const button = e.target as HTMLButtonElement;

    if(!elem) return;

    console.log(elem.className)

    if(elem.className.includes('show-dropdown')) {
      elem.classList.remove('show-dropdown');
      // button.classList.remove('button-dropdown-is-open');
      
    } else {
      elem.classList.add('show-dropdown');
      // button.classList.add('button-dropdown-is-open');

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
