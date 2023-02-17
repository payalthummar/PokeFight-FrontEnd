import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DisplayPokemonCard from "../displaypokemoncard/DisplayPokemonCard";

function FightArena({
  allPokemons,
  selectedPokemon,
  randomPokemon,
  setRandomPokemon,
}) {
  const navigate = useNavigate();
  const randomPokemonID = Math.floor(Math.random() * allPokemons.length);

  const pokemonToDisplay = {
    name: allPokemons[randomPokemonID].name.english,
    info: allPokemons[randomPokemonID],
  };

  useEffect(() => {
    setRandomPokemon(pokemonToDisplay);
  }, []);

  const checkfight = () => {
    navigate("/results");
  };

  return (
    <div className="Fightarena-container">
      <h3>Let's the fight begin</h3>
      <div className="pokemonsToFight">
        <div className="selectedPokemon">
          <DisplayPokemonCard pokemonToDisplay={selectedPokemon} />
        </div>
        <div className="vs">
          <h2>VS</h2>
        </div>
        <div className="randomPokemon">
          <DisplayPokemonCard pokemonToDisplay={randomPokemon} />
        </div>
        <button className="playbtn" id="wins" onClick={checkfight}>
          Who wins?
        </button>
      </div>
    </div>
  );
}

export default FightArena;
