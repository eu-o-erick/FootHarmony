import Link from "next/link";
import NavigationMobile from "../navigation/Mobile";
import Messages from "./message";
import SearchNavbar from "./search";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useEffect, useState } from "react";


export default function IconsNavbar() {
  const { items } = useCart();

  const [manyItems, setManyItems] = useState(0);

  useEffect(() => {
    setManyItems( items.reduce((acc, item) => acc + item.variations.length, 0) )

  }, [items]);

  return(
    <div className="flex items-center justify-end gap-10 max-lg:w-auto max-lg:ml-8 max-lg:gap-6 max-sm:ml-5 max-sm:gap-3.5">
      <SearchNavbar />
      <Messages />
    
      <div className="relative flex-center group opacity-90 hover:opacity-100 transition-all">

        <Link href="/cart" className="relative text-gray-800 group-hover:scale-105 transition-all">
          <ShoppingCart className="w-7 h-7 max-sm:w-6 max-sm:h-6" />
        </Link>

        <span className={`
          w-3.5 h-3.5 !text-[10px] font-bold text-center bg-white flex-center pointer-events-none
          absolute top-px left-4 -translate-x-1/2
          max-sm:w-3 max-sm:h-3 max-sm:text-[8px] max-sm:left-[13px]
        `}>
          {manyItems}
        </span>

      </div>

      <NavigationMobile />
    </div>
  );
};

