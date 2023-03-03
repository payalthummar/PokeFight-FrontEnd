import DisplayPokemonCard from "../displaypokemoncard/DisplayPokemonCard";

import React, { useEffect, useState } from "react";

function RandomPokemon({ allPokemons, setRandomPokemon }) {
  const randomPokemonID = Math.floor(Math.random() * allPokemons.length);

  const pokemonToDisplay = {
    name: allPokemons[randomPokemonID].name.english,
    info: allPokemons[randomPokemonID],
  };
  useEffect(() => {
    setRandomPokemon(pokemonToDisplay);
  }, []);
  return (
    <>
      <div className="randomPokemon">
        <DisplayPokemonCard pokemonToDisplay={pokemonToDisplay} />
      </div>
    </>
  );
}

export default RandomPokemon;
