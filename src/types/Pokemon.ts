// src/types/Pokemon.ts

// Define a type for a single Pokémon type
export interface PokemonType {
    id: number;        // Auto-incrementing ID
    type: string;      // Type of the Pokémon (e.g., grass, poison)
  }
  
  // Define the main Pokémon type
  export interface Pokemon {
    id: number;                 // Auto-incrementing ID
    name: string;               // Name of the Pokémon
    sprite: string;             // URL for the sprite image
    types: PokemonType[];       // Array of related Pokémon types
  }
  