import { initTRPC } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { AppRouter } from '@/src/server/routers/appRouter'; 

// Define the context creation function
const createContext = ({ req, res }: CreateNextContextOptions) => {
  return {
    // Add any context values here, e.g., user authentication
  };
};

// Type for the context
type Context = ReturnType<typeof createContext>;

// Initialize tRPC with the context type
export const t = initTRPC.context<Context>().create();

// Export the createContext function for use in other parts of your application
export { createContext };

// Export the tRPC instance for use in your components
export const trpc = t; // Add this line to export the tRPC instance
