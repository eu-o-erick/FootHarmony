import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import Cart from "./cart";
import Messages from "./message";

export interface TShoesShoppingCart{
  information: {
    variationIndex: number;
    sizeIndex: number; 
  };
  shoe: {
    name: string;
    brand: string;
    variations:{
      colors: string[];
      img: string;
      price: number;
      price_offer?: number;
      stock:{
        size: string
        amount: number;
      }[];
    }[];
  };
};



const SHOES: TShoesShoppingCart[] = [
  {
    information: {
      variationIndex: 0,
      sizeIndex: 0 
    },
    shoe: {
      name: 'Shoe Under Armour',
      brand: "Under Armour",
      variations: [
        {
          colors: ['gray'],
          img: '/shoes/D_NQ_NP_929581-MLA51356222200_082022-O.webp',
          price: 130,
          price_offer: 119,
          stock: [
            {
              size: '6',
              amount: 9
            },{
              size: '6.5',
              amount: 4
            },{
              size: '7',
              amount: 0
            }
          ]
        },{
          colors: ['lime', 'gray'],
          img: '/shoes/D_NQ_NP_694209-MLA51356202561_082022-O.webp',
          price: 120,
          stock: [
            {
              size: '6',
              amount: 9
            },{
              size: '6.5',
              amount: 4
            },{
              size: '7',
              amount: 0
            }
          ]
        },{
          colors: ['white'],
          img: '/shoes/D_NQ_NP_694209-MLA51356202561_082022-O.webp',
          price: 120,
          stock: [
            {
              size: '6',
              amount: 9
            },{
              size: '6.5',
              amount: 4
            },{
              size: '7',
              amount: 0
            }
          ]
        },
      ]
    }
  },{
    information: {
      variationIndex: 0,
      sizeIndex: 0 
    },
    shoe: {
      name: 'Shoe Under Armour',
      brand: "Under Armour",
      variations: [
        {
          colors: ['lime', 'gray'],
          img: '/shoes/D_NQ_NP_694209-MLA51356202561_082022-O.webp',
          price: 130,
          price_offer: 109,
          stock: [
            {
              size: '6',
              amount: 9
            },{
              size: '6.5',
              amount: 4
            },{
              size: '7',
              amount: 0
            }
          ]
        },
      ]
    }
  }
]


export default function IconsNavbar() {

  return(
    <div className="w-44 h-14 flex items-center justify-end gap-10">

      <Messages />

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