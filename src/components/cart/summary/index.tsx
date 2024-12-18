import PromoCode from "./PromoCode";
import { CartItem } from "@/hooks/useCart";
import Checkout from "./Checkout";
import Values from "./Values";
import { ItemCart } from "..";

interface Props{
  itemsCart: ItemCart[];
  isBuyMethod: boolean;
};

export default function SummaryCart({ itemsCart, isBuyMethod }: Props) {


  return (
    <div className='w-[30%] flex flex-col bg-white shadow-md'>

      <h2 className="p-4 mb-4 text-lg font-semibold bg-gray-950 text-gray-200">SUMMARY</h2>

      <Values itemsCart={itemsCart} />

      <PromoCode />

      <Checkout isBuyMethod={isBuyMethod} itemsCart={itemsCart} />
    </div>
  );
};
