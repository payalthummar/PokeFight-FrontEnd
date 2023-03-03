import SearchBar from "../searchbar/SearchBar";
import { useNavigate } from "react-router-dom";

function Pokefight({ allPokemons, selectedPokemon, setSelectedPokemon }) {
  const navigate = useNavigate();
  const goToArena = () => {
    navigate("/fightarena");
  };

  return (
    <div className="pokefight-container">
      <div className="searchResults">
        <div className="letsFight">
          <h3>Now let's fight</h3>
        </div>
        <div className="selectedPokefight">
          <SearchBar setSelectedPokemon={setSelectedPokemon} />
          <button className="playbtn" onClick={goToArena}>
            Let's fight
          </button>
        </div>
      </div>
    </div>
  );
}
export default Pokefight;
