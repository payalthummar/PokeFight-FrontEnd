import axios from "axios";
import { useState, useEffect } from "react";

function DisplayPokemonCard({ pokemonToDisplay }) {
  const [pokemonImage, setPokemonImage] = useState("");
  const pokemonImageURL = `https://pokeapi.co/api/v2/pokemon/${pokemonToDisplay?.name.toLowerCase()}`;

  useEffect(() => {
    function fetchPokemonImage() {
      axios
        .get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonToDisplay.name.toLowerCase()}`
        )
        .then((data) => {
          setPokemonImage(data.data.sprites.other.dream_world.front_default);
        })
        .catch((e) => console.log(e));
    }

    pokemonToDisplay && fetchPokemonImage();
  }, [pokemonImageURL]);

  return (
    <>
      <div className="singlePokemon">
        <h2> {pokemonToDisplay?.name}</h2>

        <img
          className="pokemonimg"
          src={`${pokemonImage}`}
          alt={pokemonToDisplay?.name}
        />
      </div>
    </>
  );
}

export default DisplayPokemonCard;
