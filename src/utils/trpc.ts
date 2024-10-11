import { createTRPCNext } from '@trpc/next';
import { AppRouter } from '@/src/server/routers/appRouter'; // Correct path for AppRouter
import superjson from 'superjson';
import { httpBatchLink } from '@trpc/client';

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        httpBatchLink({
          url: '/api/trpc', // Correct URL for tRPC API
        }),
      ],
    };
  },
  ssr: false, // No server-side rendering
});
