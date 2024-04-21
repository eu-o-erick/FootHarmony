'use client';

import Link from "next/link"
import { Separator } from "../ui/separator"
import { trpc } from "@/trpc/client"
import { useEffect, useState } from "react";
import { Offer } from "@/payload-types";
import { Skeleton } from "../ui/skeleton";

interface TNavItems {
  label: string;
  link: string;
  id?: string;
}

const NAV_ITEMS: TNavItems[] = [
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



export default function Navigation() {

  const { status, data: offers } = trpc.offers.useQuery();

  const [navItems, setNavItems] = useState<null | (TNavItems | Offer)[]>(null); 

  useEffect(() => {
    if(!offers || !offers.length) return;

    setNavItems([ ...NAV_ITEMS, ...offers ])

  }, [offers])


  return(
    <nav className="w-full flex-center flex-col px-10 max-w-[1400px]">
      <Separator />

      <ul className="flex-center gap-20 w-full py-5 max-lg:gap-5 max-md:flex-col max-md:items-start max-md:p-5 max-sm:px-0">

        { (status === 'success' && navItems?.length) ?
        
          navItems.map((item, i) => {
            const label = item.id ? (item as Offer).name : (item as TNavItems).label;
            const link = item.id ? `/products?offer=${(item as Offer).id}` : (item as TNavItems).link;

            return(
              <li key={i}>
                <Link href={link} className="relative h-8 px-5 flex-center font-semibold text-gray-700 hover:text-gray-800 group transition-all max-sm:px-1">
                  {label.toUpperCase()}

                  <div className="absolute left-0 bottom-0 w-0 h-px group-hover:w-full bg-gray-800 transition-all " />
                </Link>
              </li>
            )
          })
        
          :

          [0, 1, 2, 3].map((i) => (
            <li key={i}>
              <Skeleton className="w-28 h-6 my-1" />
            </li>
          ))
        }

      </ul>

      <Separator />
    </nav>
  )
}