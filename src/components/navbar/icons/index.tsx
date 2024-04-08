import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Mail, ShoppingCart } from "lucide-react";
import Cart from "./Cart";


const SHOES = [
  {
    name: 'Shoe Under Armour',
    brand: "Under Armour",
    variations: [
      {
        colors: ['gray'],
        img: '/shoes/D_NQ_NP_929581-MLA51356222200_082022-O.webp',
        price: 130,
        price_offer: null
      },{
        colors: ['lime', 'gray'],
        img: '/shoes/D_NQ_NP_694209-MLA51356202561_082022-O.webp',
        price: 120,
        price_offer: null
      },{
        colors: ['white'],
        img: '/shoes/D_NQ_NP_694209-MLA51356202561_082022-O.webp',
        price: 120,
        price_offer: null
      },
    ]
  },{
    name: 'Shoe Under Armour',
    brand: "Under Armour",
    variations: [
      {
        colors: ['lime', 'gray'],
        img: '/shoes/D_NQ_NP_694209-MLA51356202561_082022-O.webp',
        price: 130,
        price_offer: 109
      },
    ]
  }
]


export default function IconsNavbar() {

  return(
    <div className="w-44 h-14 flex items-center justify-end gap-10">

      <button className="relative text-gray-800 flex items-center justify-center opacity-90 hover:scale-105 hover:opacity-100 transition-all">
        <Mail className="w-7 h-7" />

        {/* VALIDATION IF HAVE NEWS MSG */}
        <span className="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0" />
      </button>

      <Sheet>
        <SheetTrigger className="relative text-gray-800 flex items-center justify-center opacity-90 hover:scale-105 hover:opacity-100 transition-all">
          <ShoppingCart className="w-7 h-7" />

          <span className="max-w-3.5 h-3 p-2 text-xs font-bold text-center bg-white flex items-center justify-center absolute top-0 left-4 -translate-x-1/2 scale-90">
            {SHOES.length}
          </span>
        </SheetTrigger>

        <Cart shoes={SHOES} />
      </Sheet>

    </div>
  );
};