import { Offer, Product, Variation } from "@/payload-types";
import { stripe } from "../../../lib/stripe";
import payload from "payload";
import { AfterDeleteHook } from "payload/dist/collections/config/types";


export const deleteOffer: AfterDeleteHook = async (args) => {
  const items = (args.doc as Offer).items;

  if(!items?.length) return;

  const promises = items.map( async (item) => {

    return new Promise( async (resolve) => {

      item.stripeId && (await stripe.products.update(item.stripeId, {
        active: false,
      }).catch( err => console.error('ERROR disable price on stripe: ', err) ));
      
      await payload.update({
        collection: item.item_type,
        id: (item[item.item_type] as Product | Variation ).id as string,
        data: {
          offer: {
            relationTo: null,
            offer_price: null
          }
        }
      }).catch( (err) => console.error('ERROR remove offer of product/variation: ', err));

      resolve({});
    });
  });

  await Promise.all(promises);
};