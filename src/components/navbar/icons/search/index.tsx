"use client";

import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { useRef, useState } from 'react';
import ListItems from './ListItems';
import Link from 'next/link';
import Logo from '../../logo';



export default function SearchNavbar() {
  const refInput = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  function open() {
    document.body.classList.add('no-scroll');
    setIsOpen(true);
  };

  function close() {
    document.body.classList.remove('no-scroll');
    setIsOpen(false);
  };

  function handlerClick(e: React.MouseEvent<HTMLDivElement>) {
    if(e.target === e.currentTarget) close();
  }


  return(
    <div>
      <button className='flex-center opacity-90 hover:opacity-100 hover:scale-105 transition-all' onClick={open}>
        <Search className='' />
      </button>

      <section className={cn('fixed top-0 left-0 w-full h-svh z-50 flex flex-col opacity-0 pointer-events-none transition-all', {
        'opacity-100 pointer-events-auto': isOpen
      })}>
        <div className="w-full bg-white flex justify-between items-center px-20 py-14">
          <Logo />

          <div className="flex-center overflow-hidden  shadow-md border border-gray-200">
            <button className="py-3 px-4 bg-gray-50 border-r border-gray-200 group">
              <Search className='h-5 w-5 text-gray-600 group-hover:text-gray-900 group-hover:scale-110 transition-all' />
            </button>

            <input type="text" className="focus:outline-none w-72 px-3" placeholder='Search...' />

            <button className="p-1 mx-3 rounded-full bg-gray-50">
              <X className='w-4 h-4' />
            </button>
          </div>

          <button className="rounded-full h-8 w-8 flex-center bg-gray-50" onClick={close}>
            <X className="text-gray-500 h-5 w-5" />
          </button>

        </div>


        <div className="h-full w-full backdrop-filter backdrop-blur-sm" onClick={handlerClick}>
          <ListItems value={'a'} />
        </div>

      </section>
    </div>
  )
}




  // const [value, setValue] = useState('');
  // function clear() {
  //   (refInput.current as HTMLInputElement).value = '';
  //   setValue('');
  // }
  // function search() {
  //   if(!value) {
  //     (refInput.current as HTMLInputElement).focus();
  //   } else {
  //     router.push(`/products?search=`+value)
  //   };
  // }
      {/* <div className="relative z-10 flex items-center border-b-2 border-b-neutral-400 max-lg:hidden">

        <button className='p-2 cursor-pointer opacity-60 hover:opacity-100 transition-all' onClick={search}>
          <Search className='text-gray-700' />
        </button>

        <input
          ref={refInput}
          className="p-2 w-80 focus:outline-none transition-all"
          autoComplete='off'
          id="search_input"
          placeholder="Search..."
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.code === "Enter" && search()}
          />


        <div className={cn("rounded-full bg-gray-50 p-1 cursor-pointer opacity-60 hover:opacity-100 transition-all", {
            "opacity-0 hover:opacity-0 cursor-default": !value
          })}
          onClick={clear}>
    
          <X className="w-4 h-4 text-gray-700" />
    
        </div>

      </div>

      <Link className="flex-center opacity-90 hover:scale-105 hover:opacity-100 transition-all lg:hidden" href="/products">
        <Search />
      </Link> */}

