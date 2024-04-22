import { ChevronRight } from "lucide-react";
import Link from "next/link";


const items = [
  {
    label: 'MEN',
    link: '/products?genere=men'
  },{
    label: 'WOMEN',
    link: '/products?genere=women'
  },{
    label: 'UNISEX',
    link: '/products?genere=unisex'
  }

]

export default function Generes() {

  return (
    <nav className='w-full flex-center bg-gray-950 p-2'>

      <ul className='flex gap-20 max-sm:gap-14 max-sm:scale-90'>
        { items.map(({label, link}, i) => (
          <li key={i}>
            <Link href={link} className="group">
              <span className="text-xs text-gray-400 block mt-1.5 -mb-1.5">SHOP ALL</span>
              
              <span className="relative font-semibold text-gray-200">
                {label}

                <ChevronRight className="absolute -right-4 top-2/4 -translate-y-2/4 w-4 h-4 font-semibold text-gray-600 group-hover:text-gray-300 transition-all" />
                <ChevronRight className="absolute -right-5 -mr-px top-2/4 -translate-y-2/4 w-4 h-4 font-semibold text-gray-300 opacity-0 group-hover:opacity-100 transition-all" />
              </span>
            </Link>
          </li>
        )) }
      </ul>

    </nav>
  );
}
