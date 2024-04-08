import { Brand, Category, Offer, Variation } from "@/payload-types";
import { stripe } from "../../../lib/stripe";
import payload from "payload";
import { AfterDeleteHook } from "payload/dist/collections/config/types";



export const removeOfVariations: AfterDeleteHook = async (args) => {
  console.log('====== after delete product ======');
  console.log('remove product of variation');

  const variations = args.doc.variations as Variation[];
  console.log('variations of product : ', variations);

  const promises = variations.map( ({id}) => {
    console.log('promise: id variation ', id);

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

  console.log('ended all promises "removeOfVariations"');

  await stripe.products.update(args.doc.stripeId!, {
    active: false,
  }).catch( err => console.error('ERROR disable price on stripe: ', err));

  console.log('');
};


export const removeOfOffer: AfterDeleteHook = async (args) => {
  console.log('====== after delete product ======');
  console.log('remove remove product of offer');

  const offer = args.doc.offer as Offer | null;
  console.log('product-related offer');

  if(!offer) return console.log("don't have offer");

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
  
  console.log('');
};


export const decreaseBrands: AfterDeleteHook = async (args) => {
  console.log('====== after delete product ======');
  console.log('decrease brand');

  const id = (args.doc.details.brand as Brand).id as string;
  console.log('id brand for decrease: ', id);

  const quantity = await payload.findByID({
    collection: 'brand',
    id,
  })
  .then((brand) => brand.quantity - 1)
  .catch( err => {
    console.error('ERROR get brand quantity for decrease on deleted product: ', err);
    return null;
  });

  console.log('quantity brand when product deleted: ', quantity)

  quantity !== null && await payload.update({
    collection: 'brand',
    id,
    data: {
      quantity
    }
  }).catch( (err) => console.error('ERROR update brand and decrease 1', err));

  console.log('');
};


export const decreaseCategories: AfterDeleteHook = async (args) => {
  console.log('====== after delete product ======');
  console.log('decrease categories');

  const categories = args.doc.details.categories as Category[];
  console.log('categories for decrease: ', categories);

  const promises = categories.map( ({id}) => {
    console.log('promise: id category for decrease: ', id);

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

      console.log('quantity category when product deleted: ', quantity)

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

  console.log('ended decrease categories');
  console.log('');
};