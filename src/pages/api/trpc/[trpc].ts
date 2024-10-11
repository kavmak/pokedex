// /src/pages/api/trpc/[trpc]
import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '@/src/server/routers/appRouter'; // Import your appRouter correctly
import { createContext } from '@/src/server/trpc'; // Ensure the context is imported correctly

export default createNextApiHandler({
  router: appRouter,
  createContext,
});
