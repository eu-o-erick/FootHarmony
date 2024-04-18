import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { stripe } from "../../../lib/stripe";
import { Variation } from "@/payload-types";


export const handlerBeforeChange: BeforeChangeHook = async (args) => {
  if(args.req.payloadAPI !== 'REST') return console.log('payloadAPI: ', args.req.payloadAPI);

  const data = args.data as Variation;

  const originalPrice = (args.originalDoc as Variation | undefined)?.standard_price;
  const price = data.standard_price;

  if (args.operation === 'update' && data.stripeId && price !== originalPrice) {

    await stripe.products.update(data.stripeId, {
      active: false,
    }).catch( err => console.error('ERROR disable price of variation: ', err));
  };

  
  let stripeOptions = undefined;

  if (price && price !== originalPrice) {

    stripeOptions = await stripe.products.create({
      name: data.name,
      default_price_data: {
        currency: 'USD',
        unit_amount: Math.round(price * 100),
      },
    }).then( data => ({
      stripeId: data.id,
      priceId: data.default_price as string

    })).catch( err => console.error('ERROR create price for variation: ', err));
  };

  return {
    ...data,
    ...stripeOptions
  };
};