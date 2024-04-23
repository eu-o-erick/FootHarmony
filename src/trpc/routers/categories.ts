import { publicProcedure } from "../trpc";
import { getPayloadClient } from "../../get-payload";
import { Category } from "../../payload-types";

export const getCategoriesRouter = publicProcedure.query( async () => {

  const payload = await getPayloadClient({});

  const { docs: categories } = await payload.find({
    collection: 'category',
  }) as { docs: Category[] | null };

  return categories;
});
