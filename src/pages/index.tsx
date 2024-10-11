import React from 'react';
import PokemonNameForm from '@/src/components/PokemonName Form';
import FilterablePokedexTable from '@/src/components/FilterablePokedexTable';

const Home: React.FC = () => {
  return (
    <div className="landing-page"> 
      <div className="landing-content"> {/* Class for centered content */}
        <h1 className='biggest-heading'>Pokédex</h1> {/* Heading for the Pokédex */}
        <PokemonNameForm /> {/* Form to input Pokémon names */}
        <h2 className="subheading">Pokémon List</h2> {/* Subheading for filter section */}
        <FilterablePokedexTable /> {/* Filtering option for all Pokémon */}
      </div>
    </div>
  );
};

export default Home;
