import { paymenteRouter } from "./payment-router";
import { publicProcedure, router } from "./trpc";


export const appRouter = router({
  payment: paymenteRouter,
  
});


export type AppRouter = typeof appRouter;