"use client";

import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  className?: string;
  link?: string;
  handler?: () => void;
};


export default function ButtonUI(props: Props) {
  const { children, className, link, handler } = props;

  const router = useRouter();


  function handlerClick() {

    link && router.push(link);

    handler && handler();

  };


  return(
    <button className={cn(
      "w-full py-3 flex-center uppercase font-light border border-gray-900 bg-gray-900 text-gray-200 hover:bg-gray-200 hover:text-gray-900 hover:shadow-md transition-all",
      className ?? ''
    )} onClick={handlerClick}>
      
      {children}
    </button>
  );
};


{/* <button className={cn("relative min-h-12 mb-2 bg-gray-900 shadow-md overflow-hidden group ", className ?? '')} onClick={handlerClick}>

<div className="absolute left-2/4 -translate-x-2/4 top-2/4 -translate-y-2/4 w-0 h-0 rounded-xl bg-gray-800 group-hover:rounded-none group-hover:w-full group-hover:h-full transition-all" />

<div className="relative z-50 h-full flex-center gap-1 py-2 font-light text-gray-100 group-hover:font-normal transition-all">
  {children}
</div>

</button> */}