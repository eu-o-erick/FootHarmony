import { stripe } from "../../../lib/stripe";
import { Offer, Product, Variation } from "@/payload-types";
import payload from "payload";
import { AfterDeleteHook } from "payload/dist/collections/config/types";


export const removeOfProduct: AfterDeleteHook = async (args) => {
  const { stripeId } = args.doc as Variation;
  const product = args.doc.product as Product | null;
  const variations = product?.variations as string[] | undefined;


  stripeId && (await stripe.products.update(stripeId!, {
    active: false,
  }).catch( err => console.error('ERROR disable stripe price: ', stripeId, err)));

  if(!variations?.length) return;

  const variationsFiltered = variations.filter( variation => variation !== args.id );

  await payload.update({
    collection: 'product',
    id: product!.id,
    data: {
      variations: variationsFiltered
    },
  }).catch( (err) => console.error('ERROR update variations of product: ', err));

};


export const removeOfOffer: AfterDeleteHook = async (args) => {
  const offer = args.doc.offer.relationTo as Offer | undefined;

  if(!offer) return;

  const { id, items } = offer;

  const newItems: any[] = items?.filter( item => item.variation !== args.id ) ?? [];

  await payload.update({
    collection: 'offer',
    id,
    data: {
      items: newItems
    }
  }).catch( (err) => console.error('ERROR update offer without variation deleted: ', err));
};