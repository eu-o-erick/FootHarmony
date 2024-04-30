'use client';

import Image from "next/legacy/image";
import Link from 'next/link';


const name = ['F', 'O', 'O', 'T', 'H', 'A', 'R', 'M', 'O', 'N', 'Y']

export default function Banner() {

  return (
    <section className='w-full bg-white py-16 max-sm:pt-0'>

      <div className="flex max-w-[1600px] m-auto max-md:flex-col">

        <article className="flex flex-col gap-10 px-32 py-20 w-2/4 max-xl:px-20 max-md:w-full max-sm:px-5  max-sm:pb-5">
          <h1 className="text-5xl font-semibold max-xl:text-3xl max-sm:w-3/4">
            The journey begins with the pair perfect
          </h1>

          <p>
            Discover unparalleled style and unmatch comfort with FootHarmony. Our miticulously crafted shoes redefine
            fashion, ensuring every step you take is a statement. Elevate your footwear game
          </p>

          <Link href={'/products'} className="bg-gray-950 h-12 w-36 flex-center text-gray-200 shadow-md hover:shadow-lg hover:bg-gray-900 transition-all max-sm:my-10">
            Shop Now!
          </Link>
        </article>

        <div className="relative flex justify-end items-center gap-20 w-2/4 max-2xl:gap-5 max-lg:gap-0 max-md:w-full max-md:px-4 max-md:gap-5">

          <div className="relative w-full">
            <Image src={'/shoe-banner.png'} alt='BANNER SHOE' layout="responsive" width={550} height={550} />
          </div>

          <div className="group relative flex-center mx-10 px-6 text-xl font-bold max-lg:mx-4 max-lg:px-2 max-sm:mx-0 max-sm:text-base cursor-default">

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
    </section>
  );
};
