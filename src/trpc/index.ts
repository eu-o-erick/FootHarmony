import { publicProcedure, router } from "./trpc";


export const appRouter = router({
  anyApiRoute: publicProcedure.query(() => {
    return 'and you give'
  })
});


export type AppRouter = typeof appRouter;