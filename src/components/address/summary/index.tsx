import Checkout from "./Checkout";
import Values from "./Values";

interface Props{
};

export default function SummaryAddress({}: Props) {


  return (
    <div className='w-[30%] flex flex-col bg-white shadow-md'>

      <h2 className="p-4 mb-4 text-lg font-semibold bg-gray-950 text-gray-200">SUMMARY</h2>

      <Values />

      <Checkout />

    </div>
  );
};
