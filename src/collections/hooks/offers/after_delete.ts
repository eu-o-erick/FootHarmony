import { stripe } from "../../../lib/stripe";
import payload from "payload";
import { AfterDeleteHook } from "payload/dist/collections/config/types";


export const deleteOffer: AfterDeleteHook = async (args) => {
  console.log('====== after delete offer ======');
  console.log('delete offer');

  const items = await payload.findByID({
    collection: 'offer',
    id: args.id,
    depth: 0
  }).then( (data) => data.items );

  console.log('items of offer: ', items);

  if(!items?.length) return;

  const promises = items.map( async (item) => {
    console.log('promise: item', item);

    return new Promise( async (resolve) => {

      item.stripeId && await stripe.products.update(item.stripeId, {
        active: false,
      }).catch( err => console.error('ERROR disable price on stripe: ', err) );
      
      await payload.update({
        collection: item.item_type,
        id: item[item.item_type] as string,
        data: {
          offer: null,
        }
      }).catch( (err) => console.error('ERROR remove offer of product/variation: ', err));

      resolve({});
    });
  });

  await Promise.all(promises);

  console.log('ended delete offer operation');
  console.log('');
}
