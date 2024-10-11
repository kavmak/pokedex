// src/components/PokemonTypeSelection.tsx

import React from 'react';

interface PokemonTypeSelectionProps {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
  uniqueTypes: string[]; // Accept unique types
}

const PokemonTypeSelection: React.FC<PokemonTypeSelectionProps> = ({ selectedType, selectType, uniqueTypes }) => {
  return (
    <select className='type-selection-button'value={selectedType} onChange={e => selectType(e.target.value || undefined)}>
      <option value="">All Types</option>
      {uniqueTypes.map(type => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default PokemonTypeSelection;
