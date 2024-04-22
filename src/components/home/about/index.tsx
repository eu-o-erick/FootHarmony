import { ScrollText, ShieldCheck, Truck } from "lucide-react";


const ITEMS = [
  {
    title: 'Top Notch Quality',
    description: 'At FootHarmony, we take pride in offering the finest footwear crafted with precision and dedication. Step into unmatched comfort, durability, and style.',
  },{
    title: 'Comfort and Support',
    description: 'FootHarmony shoes redefine comfort with precision. Our designs seamlessly blend style and support, ensuring every step is a delight. Elevate your comfort with FootHarmony.',
  },{
    title: 'Style and Versality',
    description: 'With trend-conscious designs, vibrant colors, and timeless patterns, FootHarmony offers a diverse range that complements every taste, Elevate your style with the perfect pairs!!.',
  }
]

export default function About() {

  return (
    <article className='flex flex-col gap-20 py-20 w-full max-w-[1024px] m-auto max-lg:px-10 max-sm:gap-10 max-sm:px-5'>

      <h5 className="text-6xl font-semibold max-sm:text-4xl">We Offer :</h5>

      <ol className="flex flex-col gap-10 max-sm:gap-6">
        { ITEMS.map((item, i) => (
          <li key={i} className="flex gap-5 max-sm:gap-3">

            <div className="w-12 h-12 bg-gray-950 text-gray-200 flex-center rounded-full text-xl font-semibold max-sm:w-8 max-sm:h-8 max-sm:text-lg">
              {i}
            </div>

            <div className="flex flex-col gap-2 w-2/3 max-sm:w-5/6">
              <h6 className="text-xl font-semibold">{item.title}</h6>
              <p className="">{item.description}</p>
            </div>
  
          </li>
        )) }
      </ol>
    </article>
  );
}
