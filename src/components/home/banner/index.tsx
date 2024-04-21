'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';


const name = ['F', 'O', 'O', 'T', 'H', 'A', 'R', 'M', 'O', 'N', 'Y']

export default function Banner() {

  return (
    <article className='w-full bg-white pb-20'>

      <div className="flex max-w-[1600px] m-auto max-md:flex-col">

        <div className="flex flex-col gap-10 px-32 py-20 w-2/4 max-xl:px-20 max-md:w-full max-sm:px-5">
          <h1 className="text-5xl font-semibold max-xl:text-3xl max-sm:w-3/4">
            The journey begins with the pair perfect
          </h1>

          <p className="">
            Discover unparalleled style and unmatch comfort with FootHarmony. Our miticulously crafted shoes redefine
            fashion, ensuring every step you take is a statement. Elevate your footwear game
          </p>

          <button className='flex-center w-32 h-12 rounded-full bg-gray-950 text-gray-200'>
            Shop Now!
          </button>
        </div>

        <div className="relative flex justify-end items-center gap-20 w-2/4 max-2xl:gap-5 max-lg:gap-0 max-md:w-full max-md:px-4 max-md:gap-5">

          <Image src={'/shoe-banner.png'} alt='BANNER SHOE' layout="responsive" width={550} height={550} />

          <div className="group relative flex-center mx-10 px-6 text-xl font-bold max-lg:mx-4 max-lg:px-2 max-sm:text-base cursor-default">

            <p className="flex-center flex-col">

              { name.map((letter, i) => (
                <span key={i}>{letter}</span>

              ))}
            </p>

            <p className="flex-center flex-col opacity-30 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 group-hover:mt-1 transition-all max-sm:mt-1">

              { name.map((letter, i) => (
                <span key={i}>{letter}</span>

              ))}
            </p>

          </div>
        </div>
      </div>
    </article>
  );
};
