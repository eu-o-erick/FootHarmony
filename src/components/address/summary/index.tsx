import { ItemCart } from "@/components/cart";
import ListProducts from "./Product";
import Values from "./Values";
import Checkout from "./Checkout";

interface Props{
  itemsCart: ItemCart[];
  status: "success" | "loading" | "error";
};

export default function SummaryAddress({ itemsCart, status }: Props) {


  return (
    <div className='w-[30%] flex flex-col bg-white shadow-md'>

      <h2 className="p-4 mb-4 text-lg font-semibold bg-gray-950 text-gray-200">SUMMARY</h2>

      <ListProducts itemsCart={itemsCart} status={status} />

      <Values itemsCart={itemsCart} />

      <Checkout />

    </div>
  );
};
