import Image from "next/image";
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
    img: '/0.png',
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
    img: '/1.png',
    link: '/products?category=air%20jordan'
  }
]


export default function Categories() {

  return(
    <article className="relative w-full flex gap-5 max-w-[1024px] mx-auto mt-20">

      { items.map((item, i) => (
        <div key={i} className="relative h-48 bg-gray-100 shadow-lg w-full overflow-hidden py-6 px-10 flex flex-col justify-between">

          <div className="absolute -right-10 top-2/4 -translate-y-2/4 h-full w-60 flex-center">
            <Image src={item.img} alt='IMAGE' width={1000} height={1000} />
          </div>

          <h4 className="relative font-semibold text-xl text-gray-400 w-4/5 z-50">

            { item.desc.map(({text, bold}, i) => (
              !bold ? text : <span key={i} className="font-bold text-gray-900"> {text} </span>
            ))}

          </h4>

          <Link href={item.link} className="w-36 h-10 bg-gray-900 text-gray-200 flex-center ">
            See More
          </Link>

        </div>
      ))}
      
    </article>
  );
};
