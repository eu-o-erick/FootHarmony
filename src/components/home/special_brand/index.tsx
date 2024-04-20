import Image from "next/image";
import Link from "next/link";

const manyTimes = [0,1,2,3,4];

export default function SpecialBrand() {

  return (
    <article className='flex flex-col w-full'>

      <div className="flex bg-gray-200">

        <div className="w-2/4 h-full relative">
          <Image src={'/category.jpg'} alt='SKIPE' width={1000} height={1000} />
        </div>

        <div className="relative w-2/4">

          <div className="w-full h-full absolute top-0 left-0 opacity-20 blur-sm">
            <Image src={'/category.jpg'} alt='SKIPE' width={1000} height={1000} />
          </div>

          <div className="relative z-10 flex justify-center flex-col gap-10 px-24 h-full">

            <h3 className="text-5xl font-semibold">FootHarmony: Stride in <br></br>Style Comfortably</h3>

            <p className="text-lg">
              At FootHarmony, we&apos;re more than just a shoe resellling brand;<br></br>
              we&apos;re curators of style and quality. With a parssion for footwear, we handpick each pair, ensuring every step
              you take is a stride in fashion-forward confidfence.
            </p>

            <Link href={'/products?alou=yep'} className="rounded-full w-36 h-12 bg-gray-900 flex-center text-gray-200 shadow-md hover:bg-gray-950 hover:text-gray-50 hover:shadow-lg transition-all">
              Shop Now! 
            </Link>

          </div>
        </div>
      </div>

      <ul className="flex justify-around items-center py-5 px-10  my-4 border-y-2 border-y-gray-500">

        { manyTimes.map(item => (
          <>
            <li className="text-3xl font-semibold opacity-70">FOOTHARMONY</li>

            { item + 1 < manyTimes.length &&
            
              <li className="w-3 h-3 bg-gray-500" />
            
            }
          </>
        )) }

      </ul>


    </article>
  );
}
