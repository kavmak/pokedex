import React from 'react';
import { Pokemon } from '@/src/types/Pokemon';
import { trpc } from '@/src/utils/trpc';
import { AiFillDelete } from 'react-icons/ai'; // Import an icon for delete functionality
import { useQueryClient } from '@tanstack/react-query'; // Use to invalidate queries

interface PokedexTableProps {
  pokemonArray: Pokemon[];
  onDeletePokemon: (id: number) => void;
}

const PokedexTable: React.FC<PokedexTableProps> = ({ pokemonArray, onDeletePokemon }) => {
  const queryClient = useQueryClient(); // Create the query client

  const { mutate: deletePokemon } = trpc.deletePokemon.useMutation({
    onMutate: async (deletedPokemon) => {
      // Optimistic update: remove the Pokémon locally before the server confirms the deletion
      queryClient.setQueryData(['getAllPokemon'], (oldData: Pokemon[] | undefined) => {
        return oldData?.filter(pokemon => pokemon.id !== deletedPokemon.id);
      });
    },
    onError: (error, variables, context) => {
      console.error('Error deleting Pokémon:', error.message);
      // Revert the optimistic update if the deletion fails
      queryClient.invalidateQueries(['getAllPokemon']);
    },
    onSettled: () => {
      // Invalidate the query to ensure data is refetched from the server after the mutation
      queryClient.invalidateQueries(['getAllPokemon']);
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this Pokémon?')) {
      deletePokemon({ id });
    }
  };

  return (
    <table className='table-container'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Sprite</th>
          <th>Types</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {pokemonArray.map((pokemon: Pokemon) => (
          <tr key={pokemon.id}>
            <td>{pokemon.name}</td>
            <td>
              <img src={pokemon.sprite} alt={pokemon.name} width={50} />
            </td>
            <td>{pokemon.types.map((type) => type.type).join(', ')}</td>
            <td>
              <button onClick={() => handleDelete(pokemon.id)}>
                <AiFillDelete size={20} title="Delete Pokémon" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PokedexTable;
