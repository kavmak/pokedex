import React from 'react';
import { trpc } from '@/src/utils/trpc'; // Import the client-side trpc configuration
import { Pokemon } from '@/src/types/Pokemon'; // Adjust the path to your types file if needed
import PokemonRow from './PokemonRow';

const PokemonList = () => {
  // Fetch the list of Pokémon using the TRPC hook
  const { data: pokemonData, isLoading, error } = trpc.getAllPokemon.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Pokémon list: {error.message}</div>;

  return (
    <div>
      <h1>Pokémon List</h1>
      <ul style={styles.list}>
        {pokemonData?.map((p: Pokemon) => (
          <PokemonRow key={p.id} pokemon={p} />
        ))}
      </ul>
    </div>
  );
};

// CSS styles for the component
const styles = {
  list: {
    listStyleType: 'none',
    padding: 0,
  },
};

export default PokemonList;
