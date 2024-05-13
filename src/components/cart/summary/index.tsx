import Button from "@/components/ui/MyButton";
import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";
import { useState } from "react";

interface Props{

};

export default function SummaryCart(props: Props) {

  const [total, setTotal] = useState(0);

  return (
    <div className='w-[34%]'>

      <div className="flex flex-col bg-white shadow-md mb-10">

        <h2 className="px-4 py-2 text-xl font-semibold bg-gray-950 text-gray-200">SUMMARY</h2>

        <div className="px-3 py-6 border border-t-0 border-gray-600">
          <h3 className="text-gray-600 mb-3 font-bold text-sm">PROMO CODE</h3>

          <div className="flex justify-betweenx">
            
            <input type="text" id="promoCode" className="
              w-full px-3 shadow-sm border border-gray-950
              text-sm uppercase font-bold text-gray-700 tracking-wider
              focus:outline-none
            " placeholder="CODE" maxLength={10} />

            

            <Button handler={() => {}} className="py-2 min-w-24">APPLY</Button>
          </div>

          <div className="inline-block mt-2 mb-1">
            <div className="flex items-center gap-1 text-red-400 bg-red-100 px-2 py-1 rounded-sm">
              <Info className="w-3 h-3" />
              <span className="text-xs">INVALID PROMO CODE</span>
            </div>
          </div>
        </div>

        <div className="py-10 border border-t-0 border-gray-600"></div>


      </div>

      <Button href="alou" className="py-2">CHECKOUT</Button>

    </div>
  );
}
