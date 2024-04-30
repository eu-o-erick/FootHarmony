import { stripe } from "../../../lib/stripe";
import { Offer } from "@/payload-types";
import payload from "payload";
import { AfterChangeHook } from "payload/dist/collections/config/types";



export const updateRelationTo: AfterChangeHook = async (args) => {
  if(args.req.payloadAPI !== 'REST') return console.log('payloadAPI: ', args.req.payloadAPI);

  const doc = args.doc as Offer;
  const previousItems = (args.previousDoc as Offer | undefined)?.items;
  const items = doc.items;

  if(args.operation === 'create' && items?.length){

    const promises = items.map( async (item: any) => {

      return new Promise( async (resolve) => {

        await payload.update({
          collection: item.item_type,
          id: item[item.item_type],
          data: {
            offer: {
              relationTo: doc.id,
              offer_price: item.new_price,
              delivery_free: item.discount_type === 'delivery_free'
            }
          },
        }).catch( (err) => console.error('ERROR set offer on product/variation: ', err));

        resolve({});
      });

    });

    await Promise.all(promises);


  } else if(args.operation === 'update'){

    const arr: any[] = [];

    // items modified value
    items?.forEach( (item: any) => {
      
      const changeValue = previousItems?.find( (previousItem: any) => (
        previousItem.id === item.id && 
        (previousItem.discount_type !== item.discount_type || previousItem.new_price !== item.new_price)
      ))
      
      changeValue && arr.push({ item, status: doc.id, changeValue: true });

    });

    // items added
    items?.forEach( (item: any) => {
      !previousItems?.find( (previousItem: any) => previousItem.id === item.id) && arr.push({ item, status: doc.id });

    });

    // items removed
    previousItems?.forEach( (item: any) => {
      !items?.find( (currentItem: any) => currentItem.id === item.id) && arr.push({ item, status: null });

    });

    console.log(arr)

    const promises = arr.map( async ({item, status, changeValue}: any) => {
      
      return new Promise( async (resolve) => {

        (!status && item.stripeId) && (await stripe.products.update(item.stripeId, {
          active: false,
        }).catch( err => console.error('ERROR disable price on stripe: ', err) ));

        await payload.update({
          collection: item.item_type,
          id: item[item.item_type],
          data: {
            offer: {
              relationTo: status,
              ...(changeValue && {
                offer_price: item.discount_type === 'new_price' ? item.new_price : null,
                delivery_free: item.discount_type === 'delivery_free'
              })
            }
          },
        }).catch( (err) => console.error('ERROR update offer status on product/variation: ', err));

        resolve({});

      });
    });

    await Promise.all(promises);
  };
};
