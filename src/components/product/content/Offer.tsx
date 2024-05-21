import { Offer, Product, Variation } from "@/payload-types";
import { useEffect, useState } from "react";

interface Props{
  product: Product;
  variation: Variation;
};

const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function OfferComponent({product, variation}: Props) {

  const [offer, setOffer] = useState<Offer | undefined>(undefined);
  const [expirationDate, setExpirationDate] = useState('');

  useEffect(() => {
    const productOffer = product.offer?.relationTo as Offer | undefined ?? variation.offer?.relationTo as Offer | undefined;

    setOffer(productOffer);

  }, [variation]);

  useEffect(() => {
    if(!offer) return;

    const date = new Date(offer.expiration);

    setExpirationDate( `${MONTH[date.getMonth()]} ${date.getDay()}` )

  }, [offer])


  if(!offer) return <></>;

  return (
    <div className='mt-5 py-3 !px-4 bg-gray-100 rounded-md shadow-inset'>
      <h3 className="font-semibold text-gray-500 mb-2">{offer.name}</h3>
      <p className="text-sm text-gray-400">
        This product is featured in our <strong>{offer.name}</strong> offer, available until
        <strong> {expirationDate}</strong>. Limited time only!
      </p>
    </div>
  );
};
