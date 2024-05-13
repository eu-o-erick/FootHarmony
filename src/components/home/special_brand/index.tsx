"use client";

import Button from "@/components/ui/MyButton";
import Image from "next/legacy/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

export default function SpecialBrand() {

  const [manyTimes, setManyTimes] = useState<number[]>([])
  const [widthImage, setWidthImage] = useState(0)
  const [widthHeight, setHeightImage] = useState(0)

  useEffect(() => {

    function handlerResize() {
      const width = window.innerWidth;

      if(width > 768) {
        setWidthImage(width / 2);
        setHeightImage(width / 2.6);

      } else {
        setWidthImage(width);
        setHeightImage(width / 1.3);

      }


      if(width > 1000) {
        setManyTimes([0,1,2,3,4])
      
      } else if(width > 680) {
        setManyTimes([0,1,2,3])

      } else if(width > 480) {
        setManyTimes([0,1,2])

      } else {
        setManyTimes([0,1])

      }
    }

    handlerResize();

    window.addEventListener('resize', handlerResize);

    return () => window.removeEventListener('resize', handlerResize);
  
  }, []);


  
  return (
    <section className='flex flex-col w-full max-w-[2000px] mx-auto'>

      <article className="flex bg-gray-200 max-md:flex-col">

        <div className="w-2/4 max-md:w-full">
          <Image src={'/category.jpg'} alt='IMAGE' width={widthImage} height={widthHeight} objectFit="cover" />
        </div>

        <div className="relative w-2/4 max-md:w-full">

          <div className="w-full opacity-20 blur-sm">
            <Image src={'/category.jpg'} alt='' width={widthImage} height={widthHeight} objectFit="cover" />
          </div>

          <div className="absolute top-0 left-0 z-10 flex h-full justify-center flex-col gap-10 px-24 max-xl:gap-4 max-lg:px-10 max-md:px-24 max-sm:px-4 max-sm:gap-4">

            <h3 className="text-4xl font-semibold max-xl:text-2xl max-md:text-4xl max-sm:text-2xl">FootHarmony: Stride in <br></br>Style Comfortably</h3>

            <p className="text-lg max-xl:text-base max-xl:mb-4 max-lg:text-sm max-md:text-base  max-sm:mb-2">
              At FootHarmony, we&apos;re more than just a shoe resellling brand;<br></br>
              we&apos;re curators of style and quality. With a parssion for footwear, we handpick each pair, ensuring every step
              you take is a stride in fashion-forward confidfence.
            </p>

            <Button href="/products?category=running" className="!text-base h-12 w-36 max-sm:h-10 max-sm:w-32 max-sm:my-10 ">
              SHOP NOW
            </Button>

          </div>
        </div>
      </article>

      <ul className="flex justify-around items-center py-5 px-10 my-4 border-y-2 border-y-gray-500 max-lg:px-2">

        { manyTimes.map(i => (
          <Fragment key={i}>
            <li className="text-3xl font-semibold opacity-70 max-2xl:text-xl max-md:text-lg">FOOTHARMONY</li>

            { i + 1 < manyTimes.length &&
              <li className="w-3 h-3 bg-gray-500 max-md:w-2 max-md:h-2" />
            
            }
          </Fragment>
        )) }

      </ul>


    </section>
  );
}
