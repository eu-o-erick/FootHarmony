import { publicProcedure } from "../trpc";
import { z } from 'zod';
import { colors as COLORS } from "../../constants/colors";


type TSort = '';
const TGeneres = ['men', 'women', 'unisex'];

export const getProductsRouter = publicProcedure
  .input(
    z.object({
      category: z.optional( z.string() ),
      brand: z.optional( z.string() ),
      min_price: z.optional( z.string() ),
      max_price: z.optional( z.string() ),
      color: z.optional( z.string() ),
      sort: z.optional( z.string() ),
      genere: z.optional( z.string() ),
    })
  )
  .query( async ({input}) => {
    const { category, brand, min_price, max_price, color, sort, genere } = input;


    const where = {
      ...category && {
        'category.name': {
          equals: category
        }
      },

      ...brand && {
        'brand.name': {
          equals: brand
        }
      },
      
      // todas as validações de preços

      ...(color && COLORS.find( c => c.label === color)) && {
        or: [
          {
            'primary_color': {
              equals: color
            }
          },{
            'secondary_color': {
              equals: color
            }
          },
        ]
      },

      ...TGeneres.includes(genere ?? '') && {
        'genere': {
          equals: genere
        }
      },
    }

    console.log(where)


    // const payload = await getPayloadClient();
    // const { docs: product } = await payload.find({
    //   collection: 'product',
    //   where: {
    //     'category'
    //   }
    // });
    // console.log(product);
});
