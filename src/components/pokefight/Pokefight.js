import SearchBar from "../searchbar/SearchBar";
import { useNavigate } from "react-router-dom";
import react, { useState, useEffect } from "react";

function Pokefight({ allPokemons, selectedPokemon, setSelectedPokemon }) {
  const [disableButton, setDisableButton] = useState(true);
  console.log("selectedPokemon", selectedPokemon);
  const navigate = useNavigate();
  const goToArena = () => {
    navigate("/fightarena");
  };
  useEffect(() => {
    if (selectedPokemon) {
      setDisableButton(false);
    }
  }, [selectedPokemon]);

  return (
    <div className="pokefight-container">
      <div className="searchResults">
        <div className="letsFight">
          <h3>Now let's fight</h3>
        </div>
        <div className="selectedPokefight">
          <SearchBar setSelectedPokemon={setSelectedPokemon} />
        </div>
        <button
          disabled={!selectedPokemon}
          className="playbtn"
          onClick={goToArena}
        >
          Let's fight
        </button>
        {/* {selectedPokemon === null ? (
          <button
            disabled={disableButon}
            className="playbtn"
            onClick={goToArena}
          >
            Let's fight
          </button>
        ) : (
          <button className="playbtn">Let's fight</button>
        )} */}
        {/*<button className="playbtn" onClick={goToArena}>
          Let's fight
      </button>*/}
      </div>
    </div>
  );
}
export default Pokefight;
