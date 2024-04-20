import Image from "next/image";

const manyTimes = [0,1,2,3,4,5,6,7];

export default function SpecialBrand() {

  return (
    <article className='flex flex-col w-full'>

      <div className="flex bg-gray-200">

        <div className="w-2/4 h-full relative">
          <Image src={'/category.jpg'} alt='SKIPE' width={1000} height={1000} />
        </div>

        <div className="relative w-2/4 flex justify-center flex-col gap-10 px-24">

          <div className="w-full h-full absolute top-0 left-0 opacity-20 blur-sm">
            <Image src={'/category.jpg'} alt='SKIPE' width={1000} height={1000} />
          </div>

          <h3 className="text-6xl font-semibold">Spike: Stride in <br></br>Style Comfortably</h3>

          <p className="text-lg">
            At Spike, we&apos;re more than just a shoe resellling brand;<br></br>
            we&apos;re curators of style and quality. With a parssion for footwear, we handpick each pair, ensuring every step
            you take is a stride in fashion-forward confidfence.
          </p>
        </div>
      </div>

      <ul className="flex justify-around items-center py-4  my-2 border-y-2 border-y-gray-500">

        { manyTimes.map(item => (
          <>
            <li className="text-3xl font-semibold opacity-70">SPIKE</li>

            { item + 1 < manyTimes.length &&
            
              <li className="w-2 h-2 bg-gray-500" />
            
            }
          </>
        )) }

      </ul>


    </article>
  );
}
