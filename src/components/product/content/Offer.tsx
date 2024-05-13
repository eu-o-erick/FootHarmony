import { Offer, Product, Variation } from "@/payload-types";
import { useEffect, useState } from "react";

interface Props{
  product: Product;
  variation: Variation;
};

export default function OfferComponent({product, variation}: Props) {

  const [offer, setOffer] = useState<Offer | undefined>(undefined);


  useEffect(() => {
    const productOffer = product.offer?.relationTo as Offer | undefined ?? variation.offer?.relationTo as Offer | undefined;

    setOffer(productOffer);

  }, [variation]);


  if(!offer) return <></>;

  return (
    <div className='mt-5 py-3 !px-4 bg-gray-100 rounded-md shadow-inset'>
      <h3 className="font-semibold text-gray-500">{offer.name}</h3>
      <p className="text-sm text-gray-400">offer qualquer coisa que vem na minha cabeça my mama called</p>
    </div>
  );
};
