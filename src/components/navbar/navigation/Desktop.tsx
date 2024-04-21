import Link from "next/link";

const NAV_ITEMS = [
  {
    label: 'home',
    link: '/'
  },{
    label: 'all products',
    link: '/products'
  },{
    label: 'new arrivals',
    link: '/products?sort=createAt'
  },{
    label: 'best sallers',
    link: '/products?sort=sold'
  }
];


export default function NavigationDesktop() {


  return (
    <nav>

      <ul className="flex gap-8 max-md:hidden max-lg:gap-2">

        { NAV_ITEMS.map(({label, link}, i) => 
          <li key={i}>
            <Link href={link} className="relative h-8 px-3 flex-center font-semibold text-gray-700 hover:text-gray-800 group transition-all max-lg:text-sm max-sm:px-1">
              {label.toUpperCase()}

              <div className="absolute left-0 bottom-0 w-0 h-px group-hover:w-full bg-gray-800 transition-all " />
            </Link>
          </li>
        )}
      </ul>

    </nav>
  );
}
