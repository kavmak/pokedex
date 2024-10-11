// /src/components/PokemonRow
import React from 'react';
import { Pokemon } from '@/src/types/Pokemon'; // Adjust the path to your types file if needed

const PokemonRow: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  return (
    <li style={styles.listItem}>
      <img src={pokemon.sprite} alt={pokemon.name} style={styles.image} />
      <h2>{pokemon.name}</h2>
      <p>Types: {pokemon.types.map(type => type.type).join(', ')}</p>
    </li>
  );
};

// CSS styles for the component
const styles = {
  listItem: {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px 0',
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: '50px',
    height: '50px',
    marginRight: '10px',
  },
};

export default PokemonRow;
