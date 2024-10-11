import React, { useState, useEffect } from 'react';
import { trpc } from '@/src/utils/trpc';
import { Pokemon } from '@/src/types/Pokemon';
import PokedexTable from './PokedexTable';
import PokemonTypeSelection from './PokemonTypeSelection';
import { useQueryClient } from '@tanstack/react-query'; // Import to refetch queries

const FilterablePokedexTable: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
  const [pokemonArray, setPokemonArray] = useState<Pokemon[]>([]);
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]); // State to store unique types

  const queryClient = useQueryClient(); // Query client to invalidate and refetch queries

  // Fetch all Pokémon using the TRPC hook
  const { data, isLoading, error } = trpc.getAllPokemon.useQuery();

  // Mutation for adding a new Pokémon
  const { mutate: addPokemon } = trpc.addPokemon.useMutation({
    onSuccess: () => {
      // Invalidate the Pokémon list after a new Pokémon is added
      queryClient.invalidateQueries(['getAllPokemon']);
    },
  });

  useEffect(() => {
    if (data) {
      setPokemonArray(data);
      const types = new Set<string>();
      data.forEach((pokemon: Pokemon) => {
        pokemon.types.forEach(type => types.add(type.type));
      });
      setUniqueTypes(Array.from(types));
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Pokémon: {error.message}</div>;

  // Filter Pokémon based on the user input and selected type
  const filteredPokemon = pokemonArray.filter(pokemon => {
    const matchesName = pokemon.name.toLowerCase().includes(filter.toLowerCase());
    const matchesType = selectedType ? pokemon.types.some(type => type.type === selectedType) : true;
    return matchesName && matchesType;
  });

  // Function to remove a Pokémon from the array after deletion
  const handleDeletePokemon = (id: number) => {
    setPokemonArray(prev => prev.filter(pokemon => pokemon.id !== id));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filter Pokémon by name..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className='filter-by-name'
      />
      <PokemonTypeSelection 
        selectedType={selectedType} 
        selectType={setSelectedType} 
        uniqueTypes={uniqueTypes} 
      />
      <PokedexTable 
        pokemonArray={filteredPokemon} 
        onDeletePokemon={handleDeletePokemon} 
      />
    </div>
  );
};

export default FilterablePokedexTable;
