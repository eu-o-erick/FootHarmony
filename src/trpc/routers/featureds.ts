import { publicProcedure } from "../trpc";
import { getPayloadClient } from "../../get-payload";
import { Featured } from "../../payload-types";

export const getFeaturedsRouter = publicProcedure.query( async () => {

  const payload = await getPayloadClient({});

  const { docs: featured } = await payload.find({
    collection: 'featured',
    limit: 1,
    depth: 3
  }) as { docs: (Featured | string)[] | null };

  return featured;
});
