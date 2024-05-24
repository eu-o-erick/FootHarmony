import { publicProcedure } from "../trpc";
import EasyPost from '@easypost/api';
import { z } from "zod";

const api = new EasyPost(process.env.EASY_POST_KEY!);

export const getCalculateShipping = publicProcedure
  .input( z.object({
    zipCode: z.string()
    
  })).query( async ({input}) => {
    const { zipCode } = input;

    if( isNaN( Number(zipCode) ) || zipCode.toString().length !== 5 ) return null; 
  
    const parcel = {
      length: 10, // comprimento em polegadas
      width: 6,   // largura em polegadas
      height: 4,  // altura em polegadas
      weight: 2,  // peso em libras
    };

    try {

      const fromAddress = await api.Address.create({
        street1: 'YOUR_ADDRESS_STREET',
        city: 'BOGARD',
        state: 'MISSOURI',
        country: 'US',
        zip: '64622',
      });

      const toAddress = await api.Address.create({
        zip: zipCode,
      });

      const shipment = await api.Shipment.create({
        to_address: toAddress,
        from_address: fromAddress,
        parcel: parcel,
      });

      const rates = shipment.lowestRate(['UPS']);

      return rates;

    } catch (error) {
      console.error(error)
      return null;

    }
  }
);
