import { stripe } from "../../../lib/stripe";
import { Offer } from "@/payload-types";
import payload from "payload";
import { AfterChangeHook } from "payload/dist/collections/config/types";



export const updateRelationTo: AfterChangeHook = async (args) => {
  const doc = args.doc as Offer;
  const previousItems = (args.previousDoc as Offer | undefined)?.items;
  const items = doc.items;
  console.log('====== after change offer ======')

  if(args.operation === 'create' && items?.length){
    console.log('create operation')

    const promises = items.map( async (item: any) => {

      return new Promise( async (resolve) => {
        console.log('promise: set offer on product/variation', item)

        await payload.update({
          collection: item.item_type,
          id: item[item.item_type],
          data: {
            offer: doc.id,
          },
        }).catch( (err) => console.error('ERROR set offer on product/variation: ', err));

        resolve({});
      });

    });

    await Promise.all(promises);
    console.log('ended create operation')


  } else if(args.operation === 'update'){
    // retrieve the differences from the document and return an object with the item and the 
    // status whether it was added or removed, added = offer ID | removed = null.
    const arr: any = [];
    console.log('update operation')


    items?.forEach( (item: any) => {
      !previousItems?.find( (previousItem: any) => previousItem.id === item.id) && arr.push({ item, status: doc.id });

    });

    previousItems?.forEach( (item: any) => {
      !items?.find( (currentItem: any) => currentItem.id === item.id) && arr.push({ item, status: null });

    });

    console.log('"arr" with status: ', arr)

    const promises = arr.map( async ({item, status}: any) => {
      
      console.log('promise: update status, item: ', item, 'status: ', status)

      return new Promise( async (resolve) => {

        (!status && item.stripeId) && await stripe.products.update(item.stripeId, {
          active: false,
        }).catch( err => console.error('ERROR disable price on stripe: ', err) );

        await payload.update({
          collection: item.item_type,
          id: item[item.item_type],
          data: {
            offer: status,
          },
        }).catch( (err) => console.error('ERROR update offer status on product/variation: ', err));

        resolve({});

      });
    });

    await Promise.all(promises);

    console.log('ended update operation')
    console.log('');
  };
};
