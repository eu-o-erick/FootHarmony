import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Product } from "@/payload-types"
import Image from "next/legacy/image"

export function Methods({product}: {product: Product}) {

  return (
    <Accordion type="single" collapsible className="w-full my-5">

      <AccordionItem value="desc">
        <AccordionTrigger className="hover:!no-underline">DESCRIPTION</AccordionTrigger>
        
        <AccordionContent className="pb-8">
          {product.description}
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
