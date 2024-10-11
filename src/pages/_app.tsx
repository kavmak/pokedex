import { AppType } from 'next/app';
import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { AppRouter } from '../server/routers/appRouter';
import superjson from 'superjson';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/src/styles/index.css';

// Initialize the TRPC client
const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson, 
      links: [
        httpBatchLink({
          url: '/api/trpc', 
        }),
      ],
    };
  },
  ssr: false, 
});

const queryClient = new QueryClient(); // Create a QueryClient instance

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default trpc.withTRPC(MyApp);
