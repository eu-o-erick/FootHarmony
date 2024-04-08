import { stripe } from "../../../lib/stripe";
import { Offer } from "@/payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";


export const updateProducts: BeforeChangeHook = async (args) => {
  console.log('====== before change offer ======');
  console.log('update products/variations of offer');
  
  const items = (args.data as Offer).items;
  const originalItems = (args.originalDoc as Offer )?.items;

  console.log('items: ', items)
  console.log('originalItems: ', originalItems)

  if(!items?.length) return console.log("don't have items in offer");

  const promises = items.map( async (item) => {
    console.log('promise: ', item)

    return new Promise( async (resolve) => {
    
      const update = await updatePrice(item, args, originalItems);

      resolve(update);
    });
  });
    
  const result = await Promise.all(promises);

  console.log('result: ', result)
  console.log('');

  return {
    ...args.data,
    items: result
  };
};



async function updatePrice(item: any, args: any, originalItems: any) {
  console.log('++++++ function update price ++++++')

  const originalItem = originalItems?.find( (data: any) => data.id === item.id );

  console.log('originalItem: ', originalItem)

  const { stripeId: originalStripeId, new_price: originalPrice } = originalItem ?? { stripeId: null, new_price: undefined };
  const { item_type, new_price, discount_type } = item;

  let stripeOptions = undefined;

  if( discount_type === 'new_price' && (!originalItem || new_price !== originalPrice)) {
    console.log('create new price for product/variation on offer')

    stripeOptions = await stripe.products.create({
      name: args.data.name + ' - ' + item[item_type],
      default_price_data: {
        currency: 'USD',
        unit_amount: Math.round((item.new_price as number) * 100),
      },
    
    }).then( data => ({
      stripeId: data.id,
      priceId: data.default_price as string,
    
    })).catch( err => console.error('ERROR create new price for product/variation of offer: ', err));

  } else if(discount_type !== 'new_price' && originalStripeId) {
    console.log('clear stripe options on offer product/variation');

    stripeOptions = {
      stripeId: null,
      priceId: null,
    };

  };

  if(originalStripeId && new_price !== originalPrice) {
    console.log('disable price of offer product/variation');

    await stripe.products.update(originalStripeId, {
      active: false,
    }).catch( err => console.error('ERROR disable price of offer product on variation: ', err));
  };

  return {
    ...item,
    ...stripeOptions
  };
};

