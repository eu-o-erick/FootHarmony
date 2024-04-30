import Image from "next/legacy/image";
import Link from "next/link";


const items = [
  {
    desc: [
      {
        text: 'Unleash your',
        bold: false
      },{
        text: 'potential',
        bold: true
      },{
        text: 'with our range of ',
        bold: false
      },{
        text: 'high-performance',
        bold: true
      },{
        text: 'sports shoes',
        bold: false
      }
    ],
    img: '/sport-shoes.png',
    link: '/products?category=running'
  },{
    desc: [
      {
        text: 'Fly high with the iconic',
        bold: false
      },{
        text: 'Air Jordans',
        bold: true
      },{
        text: 'the ultimate fusion of',
        bold: false
      },{
        text: 'style',
        bold: true
      },{
        text: 'and',
        bold: false
      },{
        text: 'performance',
        bold: true
      }
    ],
    img: '/air-jordan-shoes.png',
    link: '/products?category=air%20jordan'
  }
]


export default function Categories() {

  return(
    <section className="relative w-full flex gap-5 max-w-[1024px] mx-auto mt-20 max-lg:px-10 max-md:gap-10 max-md:flex-col max-[480px]:px-3 max-[480px]:mt-5">

      { items.map((item, i) => (
        <div key={i} className="relative h-48 bg-gray-100 shadow-lg w-full overflow-hidden py-6 px-10 flex flex-col justify-between gap-5 max-lg:px-6 max-[500px]:h-auto max-[500px]:px-3 max-[500px]:py-5">

          <div className="absolute -right-10 top-2/4 -translate-y-2/4 h-full w-60 flex-center max-lg:w-52 max-md:w-60 max-[500px]:w-48">
            <Image src={item.img} alt='IMAGE' width={1000} height={1000} />
          </div>

          <h4 className="relative font-semibold text-xl text-gray-500 w-4/5 z-50 max-lg:text-lg max-md:text-xl max-[500px]:text-base">

            { item.desc.map(({text, bold}, i) => (
              !bold ? text : <span key={i} className="font-bold text-gray-900"> {text} </span>
            ))}

          </h4>

          <Link href={item.link} className="z-50 py-1.5 w-36 bg-gray-900 text-gray-200 flex-center max-[500px]:text-sm max-[500px]:w-28">
            See More
          </Link>

        </div>
      ))}
      
    </section>
  );
};
