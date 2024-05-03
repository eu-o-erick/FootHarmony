import { Offer, Product, Variation } from "@/payload-types";
import { useEffect, useState } from "react";

interface Props{
  product: Product;
  variation: Variation;
};

export default function OfferComponent({product, variation}: Props) {

  const [relatedTo, setRelatedTo] = useState<'product' | 'variation' | undefined>(undefined);
  const [offer, setOffer] = useState<Offer | undefined>(undefined);


  useEffect(() => {
    const productOffer = product.offer?.relationTo as Offer | undefined;
    const variationOffer = variation.offer?.relationTo as Offer | undefined;

    if(variationOffer) {
      setOffer(variationOffer);
      setRelatedTo('variation');
    
    } else if(productOffer){
      setOffer(productOffer);
      setRelatedTo('product');

    } else {
      setOffer(undefined);
      setRelatedTo(undefined);

    };

  }, [variation]);

  if(!offer) return <></>;

  return (
    <div className='mt-5 py-3 !px-4 bg-gray-50 rounded-md shadow-inset'>
      <h3 className="font-semibold text-gray-600">{offer.name}</h3>
      <p className="text-sm text-gray-500">offer qualquer coisa que vem na minha cabeça my mama call,</p>
    </div>
  );
};
