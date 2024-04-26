"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


const NAV_ITEMS = [
  {
    label: 'home',
    link: '/'
  },{
    label: 'all products',
    link: '/products'
  },{
    label: 'new arrivals',
    link: '/products?sort=createAt'
  },{
    label: 'best sallers',
    link: '/products?sort=sold'
  }
];

export default function NavigationMobile() {

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {

    function handlerResize() {
      setIsOpen(false);
    };

    window.addEventListener('resize', handlerResize);

    return () => window.removeEventListener('resize', handlerResize);
  }, []);

  return (
    <nav className='max-[830px]:flex flex-center hidden '>

      <button className="-m-1" onClick={() => setIsOpen(!isOpen)}>
        <Menu className="w-7 h-7 max-sm:w-6 max-sm:h-6" />
      </button>

      <div className={cn("absolute w-full right-0 top-14 bg-white flex flex-col p-6 shadow-lg opacity-0 pointer-events-none transition-all", {
        'top-16 opacity-100 pointer-events-auto': isOpen
      })}>

        <button className="absolute top-2 right-2" onClick={() => setIsOpen(!isOpen)}>
          <X />
        </button>

        <ul className="flex flex-col gap-3">
          { NAV_ITEMS.map(({label, link}, i) => 
            <li key={i}>
              <Link href={link} className="relative font-semibold text-gray-800">
                {label.toUpperCase()}
              </Link>
            </li>
          )}
        </ul>

      </div>
    </nav>
  );
}
