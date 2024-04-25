import { publicProcedure } from "../trpc";
import { getPayloadClient } from "../../get-payload";
import { Brand } from "../../payload-types";

export const getBrandsRouter = publicProcedure.query( async () => {

  const payload = await getPayloadClient({});

  const { docs: brands } = await payload.find({
    collection: 'brand',
    sort: 'quantity'
  }) as { docs: Brand[] | null };

  return brands;
});
