import React, { useState } from 'react';
import { trpc } from '@/src/utils/trpc';

const PokemonNameForm: React.FC = () => {
  const [name, setName] = useState('');
  const [typesInput, setTypesInput] = useState(''); // Store types as comma-separated input
  const [sprite, setSprite] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // Success message state

  const { mutate: addPokemon, isLoading: isAdding } = trpc.addPokemon.useMutation({
    onSuccess: () => {
      // Clear the input fields on successful addition
      setName('');
      setTypesInput('');
      setSprite('');
      setError(null);
      setSuccess('Pokémon added successfully!'); // Show success message

      // Reload the page after 1 second to allow users to see the success message
      setTimeout(() => {
        window.location.reload(); // Reload the page
      }, 1000); // Adjust the delay as needed
    },
    onError: (err: { message: string }) => {
      setError(err.message); // Set error message if mutation fails
      setSuccess(null); // Clear success message on error
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (!name || !typesInput || !sprite) {
      setError('All fields are required.');
      return;
    }

    // Split the types input by comma and trim whitespace
    const types = typesInput.split(',').map((type) => type.trim());

    // Call the addPokemon mutation
    addPokemon({ name, types, sprite });
  };

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <label className='form-label-heading' htmlFor="pokemonName">Pokémon Name:</label>
        <input
          id="pokemonName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='form-label'
          required
        />

        <label className='form-label-heading' htmlFor="pokemonTypes">Types (comma-separated):</label>
        <input
          id="pokemonTypes"
          type="text"
          value={typesInput}
          onChange={(e) => setTypesInput(e.target.value)}
          className='form-label'
          placeholder="e.g., Fire, Flying"
          required
        />

        <label className='form-label-heading' htmlFor="pokemonSprite">Sprite URL:</label>
        <input
          id="pokemonSprite"
          type="text"
          value={sprite}
          onChange={(e) => setSprite(e.target.value)}
          className='form-label'
          required
        />

        <button type="submit" disabled={isAdding}>
          {isAdding ? 'Adding...' : 'Add Pokémon'}
        </button>
      </form>

      {/* Show error message if any */}
      {error && <div className="error-message">Error: {error}</div>}

      {/* Show success message if Pokémon was added */}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default PokemonNameForm;
