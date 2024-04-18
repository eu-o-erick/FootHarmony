import { stripe } from "../../../lib/stripe";
import { Product } from "@/payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";


export const handlerBeforeChange: BeforeChangeHook = async (args) => {
  console.log('====== before change product ======');

  const data = args.data as Product;

  console.log('before change product: ', data);

  const originalPrice = (args.originalDoc as Product | undefined)?.standard_price;
  const price = data.standard_price;

  console.log('previous price: ', originalPrice)
  console.log('current price: ', price)

  if (args.operation === 'update' && price !== originalPrice) {
    console.log('disable previous price');

    await stripe.products.update(data.stripeId!, {
      active: false,
    }).catch( err => console.error('ERROR disable previous price of product: ', err));
  };

  let stripeOptions = undefined;

  if (price !== originalPrice) {
    console.log('create new price for product');

    stripeOptions = await stripe.products.create({
      name: data.name,
      default_price_data: {
        currency: 'USD',
        unit_amount: Math.round(price * 100),
      },
    }).then( data => ({
      stripeId: data.id,
      priceId: data.default_price as string

    })).catch( err => console.error('ERROR create new price for product: ', err));
  };

  console.log('');

  return {
    ...data,
    ...stripeOptions
  };
};
