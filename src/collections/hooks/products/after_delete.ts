import { Brand, Category, Offer, Variation } from "@/payload-types";
import { stripe } from "../../../lib/stripe";
import payload from "payload";
import { AfterDeleteHook } from "payload/dist/collections/config/types";



export const removeOfVariations: AfterDeleteHook = async (args) => {
  const variations = args.doc.variations as Variation[];

  const promises = variations.map( ({id}) => {

    return new Promise( async (resolve, reject) => {

      await payload.update({
        collection: 'variation',
        id,
        data: {
          product: null
        }
      }).catch( (err) => console.error('ERROR clean "product" of variation: ', err));

      resolve({});
    });
  });
  
  await Promise.all(promises);


  await stripe.products.update(args.doc.stripeId!, {
    active: false,
  }).catch( err => console.error('ERROR disable price on stripe: ', err));

};


export const removeOfOffer: AfterDeleteHook = async (args) => {
  const offer = args.doc.offer.relationTo as Offer | null;

  if(!offer) return;

  const items: any[] = await payload.findByID({
    collection: 'offer',
    id: offer.id,
    depth: 0
  })
  .then( (data: any) => data.items?.filter( (item: any) => item.product !== args.id ))
  .catch( err => console.error('ERROR get items of offer to remove product deleted: ', err)) ?? [];


  await payload.update({
    collection: 'offer',
    id: offer.id,
    data: {
      items
    },
  }).catch( (err) => console.error('ERROR update items offer without product removed: ', err));
  
};


export const decreaseBrands: AfterDeleteHook = async (args) => {
  const id = (args.doc.details.brand as Brand).id as string;

  const quantity = await payload.findByID({
    collection: 'brand',
    id,
  })
  .then((brand) => brand.quantity - 1)
  .catch( err => {
    console.error('ERROR get brand quantity for decrease on deleted product: ', err);
    return null;
  });

  quantity !== null && await payload.update({
    collection: 'brand',
    id,
    data: {
      quantity
    }
  }).catch( (err) => console.error('ERROR update brand and decrease 1', err));

};


export const decreaseCategories: AfterDeleteHook = async (args) => {
  const categories = args.doc.details.categories as Category[];

  const promises = categories.map( ({id}) => {

    return new Promise( async (resolve) => {

      const quantity = await payload.findByID({
        collection: 'category',
        id,
      })
      .then((category) => category.quantity - 1 )
      .catch( err => {
        console.error('ERROR get category quantity for decrease on deleted product: ', err);
        return null; 
      });


      quantity !== null && await payload.update({
        collection: 'category',
        id,
        data: {
          quantity
        }
      }).catch( (err) => console.error('ERROR update category and decrease 1', err));

      resolve({});
    });
  });

  await Promise.all(promises);
};