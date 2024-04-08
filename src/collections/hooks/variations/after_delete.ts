import { stripe } from "../../../lib/stripe";
import { Offer, Product, Variation } from "@/payload-types";
import payload from "payload";
import { AfterDeleteHook } from "payload/dist/collections/config/types";



export const removeOfProduct: AfterDeleteHook = async (args) => {
  console.log('====== after delete variation ======');
  console.log('remove variotion of product');

  const { stripeId } = args.doc as Variation;
  const product = args.doc.product as Product | null;

  console.log('product related variation: ', product);

  stripeId && await stripe.products.update(stripeId!, {
    active: false,
  }).catch( err => console.error('ERROR disable stripe price: ', stripeId, err));

  if(!product?.variations) return console.log("don't have product or variations");

  const variations = product.variations.filter( variation => variation !== args.id ) as string[];

  console.log('variations filtered:', variations);

  await payload.update({
    collection: 'product',
    id: product.id,
    data: {
      variations
    }
  }).catch( (err) => console.error('ERROR update variations of product: ', err));
  
  console.log('');
};


export const removeOfOffer: AfterDeleteHook = async (args) => {
  console.log('====== after delete offer ======');

  if(!args.doc.offer) return console.log("don't have offer related variation");

  const { id, items } = args.doc.offer as Offer;
  console.log('id and items of offer related variation: ', id, items);

  const newItems: any[] = items?.filter( item => item.variation !== args.id ) ?? [];
  console.log('list items filtered: ', newItems);

  await payload.update({
    collection: 'offer',
    id,
    data: {
      items: newItems
    }
  }).catch( (err) => console.error('ERROR update offer without variation deleted: ', err));

  console.log('');
};

