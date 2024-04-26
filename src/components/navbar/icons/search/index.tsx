"use client";

import { cn, createURLQueries } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { useRef, useState } from 'react';
import ListItems from './ListItems';
import Logo from '../../logo';
import { useRouter, useSearchParams } from 'next/navigation';



export default function SearchNavbar() {
  const refInput = useRef<HTMLInputElement>(null);

  const navigation = useRouter();
  const { toString: queries  } = useSearchParams();

  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);



  function open() {
    document.body.classList.add('no-scroll');
    setIsOpen(true);
  };


  function close() {
    document.body.classList.remove('no-scroll');
    clear();
    setIsOpen(false);
  };


  function clear() {
    (refInput.current as HTMLInputElement).value = '';
    setValue('');
  };


  function handlerClick(e: React.MouseEvent<HTMLDivElement>) {
    if(e.target === e.currentTarget) close();
  };


  function search() {
    if(!value) {
      (refInput.current as HTMLInputElement).focus();

    } else {
      navigation.push( createURLQueries(queries(), { search: value }) );

    };
  };



  return(
    <div>
      <button className='flex-center opacity-90 hover:opacity-100 hover:scale-105 transition-all' onClick={open}>
        <Search className='' />
      </button>

      <section className={cn('fixed top-0 left-0 w-full h-svh z-50 hidden flex-col', {
        'flex': isOpen
      })}>
        <div className="relative w-full bg-white flex-center py-14">
          <Logo className='!absolute top-2/4 -translate-y-2/4 left-14' />

          <div className="flex-center overflow-hidden shadow-md border border-gray-950">
            <button className="py-3 px-4 bg-gray-950 border-r border-gray-300 group">
              <Search className='h-5 w-5 text-gray-200 group-hover:text-gray-100 group-hover:scale-110 transition-all' />
            </button>

            <input
              ref={refInput}
              className="px-3 w-80 focus:outline-none transition-all"
              autoComplete='off'
              id="search_input"
              placeholder="Search..."
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.code === "Enter" && search()}
              />

            <button className="p-1 mx-3 group" onClick={clear}>
              <X className="text-gray-950 h-4 w-4 group-hover:text-gray-800 group-hover:scale-110 transition-all" />
            </button>
          </div>

          <button className="absolute top-2/4 -translate-y-2/4 right-10 rounded-full h-8 w-8 flex-center bg-gray-50 group" onClick={close}>
            <X className="text-gray-500 h-4 w-4 group-hover:text-gray-800 group-hover:scale-110 transition-all" />
          </button>

        </div>


        <div className="h-full w-full backdrop-filter backdrop-blur-sm flex-center items-start" onClick={handlerClick}>
          <ListItems value={value} search={search} />
        </div>

      </section>
    </div>
  )
};
