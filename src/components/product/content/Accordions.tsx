import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils";
import { Product, Size, Variation } from "@/payload-types"
import Image from "next/legacy/image"
import { useEffect, useState } from "react";


interface Props{
  product: Product;
  variation: Variation;
};

interface SizeProps {
  size: string;
  length: string;
};


export default function Accordions({product, variation}: Props) {

  const [sizeGuide, setSizeGuide] = useState<SizeProps[]>([]);

  useEffect(() => {
    const arr: SizeProps[] = [];
    const sizes = variation.sizes as Size;

    for (const key in sizes) {

      if(key.includes('size')) {

        const size = key.replace('size', '').replace('_', '.');
        // @ts-ignore
        const length = sizes[key] as string | undefined | null;

        if(length) {

          arr.push({
            size,
            length
          });
        };
      };
    };

    setSizeGuide(arr);

  }, [variation]);




  return (
    <Accordion type="single" collapsible className="w-full my-5">

      <AccordionItem value="desc">
        <AccordionTrigger className="hover:!no-underline">DESCRIPTION</AccordionTrigger>
        
        <AccordionContent className="pb-8">
          {product.description}
        </AccordionContent>
      </AccordionItem>


      <AccordionItem value="sizes">
        <AccordionTrigger className="hover:!no-underline">SIZES GUIDE</AccordionTrigger>
        
        <AccordionContent className="pb-8">

          <ul className="grid grid-cols-1 gap-1">
            { sizeGuide.map(({size, length}, i) => (

              <li key={i} className={cn("p-3 flex justify-between items-center", {
                'bg-gray-50': i % 2 === 0
              })}>
                <span className="font-bold text-gray-500 flex-center gap-1">
                  Size:
                  <span className="font-bold text-gray-600">{size}</span>
                </span>

                <span className="font-semibold text-gray-600 text-sm">{length} inches</span> 
              </li>
          
            ))}
          </ul>

        </AccordionContent>
      </AccordionItem>



      <AccordionItem value="payment">
        <AccordionTrigger className="hover:!no-underline">PAYMENT METHODS</AccordionTrigger>
      
        <AccordionContent className="pb-8">
          <p className="mb-3">
            Payment methods encompass various ways consumers can pay for goods or services.
            These methods facilitate transactions between buyers and sellers,
            ensuring seamless and secure exchanges of value. Here&apos;s a list of common payment methods:
          </p>

          <div className="relative w-full h-32 p-10">
            <Image src="/payment-methods.jpg" objectFit="contain" layout="fill" alt="mastercard, payoneer, apple ply, stripe, paypal, visa, skrill, google pay" />
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="shipping">
        <AccordionTrigger className="hover:!no-underline">SHIPPING METHODS</AccordionTrigger>
        
        <AccordionContent className="pb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus illo sunt deserunt,
          accusamus dolore dolorum eligendi sequi velit ducimus porro voluptates architecto!
          Ab iusto fugiat assumenda eaque! Dolorum, culpa sit.
        </AccordionContent>
      </AccordionItem>

    </Accordion>
  )
}
