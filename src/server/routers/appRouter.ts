// /src/server/routers/appRouter.ts
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import superjson from 'superjson'; // Import superjson for serialization
import { Pokemon } from '@/src/types/Pokemon'; // Import the Pokemon type
import { TRPCError } from '@trpc/server'; // Import TRPCError for structured error handling

const t = initTRPC.create({
  transformer: superjson, // Use superjson as the transformer
});

const prisma = new PrismaClient();

export const appRouter = t.router({
  // Fetch a Pokémon by ID
  getPokemon: t.procedure
    .input(z.object({ id: z.number() })) // Define the input using zod
    .query(async ({ input }) => {
      const pokemon = await prisma.pokemon.findUnique({
        where: { id: input.id },
        include: { types: true }, // Include related Pokémon types
      });

      if (!pokemon) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Pokémon with ID ${input.id} not found.`,
        });
      }

      // Transform the data to match the Pokemon interface
      return transformPokemonData(pokemon);
    }),

  // Fetch all Pokémon
  getAllPokemon: t.procedure.query(async () => {
    const allPokemon = await prisma.pokemon.findMany({
      include: { types: true }, // Include related Pokémon types
    });

    // Transform the data to match the Pokemon interface
    return allPokemon.map(transformPokemonData) as Pokemon[]; // Ensure to cast to Pokemon type
  }),

  // Add a new Pokémon
  addPokemon: t.procedure
    .input(
      z.object({
        name: z.string(),
        types: z.array(z.string()), // Define an array of strings for Pokémon types
        sprite: z.string(), // String for sprite URL or path
      })
    )
    .mutation(async ({ input }) => {
      const { types, ...pokemonData } = input;

      const createdPokemon = await prisma.pokemon.create({
        data: {
          ...pokemonData,
          types: {
            create: types.map((type) => ({
              type, // Create each type
            })),
          },
        },
      });

      return transformPokemonData(createdPokemon);
    }),

  // Fetch Pokémon by names
  getPokemonByNames: t.procedure
    .input(z.array(z.string())) // Accept an array of Pokémon names
    .mutation(async ({ input }) => {
      const pokemonArray = await prisma.pokemon.findMany({
        where: {
          name: {
            in: input,
          },
        },
        include: { types: true }, // Include related Pokémon types
      });

      if (!pokemonArray.length) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No Pokémon found with the given names.`,
        });
      }

      return pokemonArray.map(transformPokemonData);
    }),

  // Delete a Pokémon by ID
  deletePokemon: t.procedure
    .input(z.object({ id: z.number() })) // Define input type
    .mutation(async ({ input }) => {
      const deletedPokemon = await prisma.pokemon.delete({
        where: { id: input.id },
      });

      return transformPokemonData(deletedPokemon); // Return the deleted Pokémon data
    }),
});

// Helper function to transform Pokémon data
const transformPokemonData = (pokemon: any) => ({
  id: pokemon.id,
  name: pokemon.name,
  sprite: pokemon.sprite,
  types: pokemon.types.map((type: any) => ({
    id: type.id,
    type: type.type,
  })),
});

export type AppRouter = typeof appRouter;
