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
