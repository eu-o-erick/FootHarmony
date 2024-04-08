import { stripe } from "../../../lib/stripe";
import { Coupon } from "@/payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";


export const handlerBeforeChanges: BeforeChangeHook = async (args) => {
  console.log('====== before change coupon ======');
  // console.log('');
  
  const data = (args.data as Coupon);
  const operation = args.operation;
  // const originalItems = (args.originalDoc as Offer )?.items;

  console.log('data: ', data);
  console.log('');
  console.log('');
  console.log('');

  if (operation === 'create') {

    const coupon = await stripe.coupons.create({
      name: data.name,
      currency: 'USD',
      ...{ percent_off: data.discount === 'percentage' ? (data.percentage_value as number) : undefined },
      ...{ amount_off: data.discount === 'value' ? (data.fixed_value as number) : undefined },
    });

    const promotionCode = await stripe.promotionCodes.create({
      coupon: coupon.id,
      code: data.code,
      active: data.enable,
    });

    console.log(promotionCode)

  } else if (operation === 'update') {


  };

};

