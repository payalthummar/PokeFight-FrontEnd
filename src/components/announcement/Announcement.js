import axios from "axios";
import { useNavigate } from "react-router-dom";
import DisplayPokemonCard from "../displaypokemoncard/DisplayPokemonCard";

function Announcement({
  selectedPokemon,
  randomPokemon,
  playerID,
  score,
  setScore,
}) {
  let winner;
  const navigate = useNavigate();
  //const updateScoreURL = `http://localhost:3080/game/leaderboard/${playerID}`;
  const updateScoreURL = `${process.env.REACT_APP_API_ENDPOINT}/game/leaderboard/${playerID}`;

  const goToStart = () => {
    axios
      .put(updateScoreURL, { score, active: false })
      .then((res) => console.log(res));
    navigate("/");
  };
  const goToNewFight = () => {
    setScore((prevScore) => prevScore + 1);
    navigate("/pokefight");
  };

  if (selectedPokemon.info.base.Attack > randomPokemon.info.base.HP) {
    winner = true;
  } else {
    winner = false;
  }

  return (
    <div className="announcement-container">
      <div className="thewinner">
        {winner && (
          <>
            <h1>You win</h1>
            <div className="winner">
              <DisplayPokemonCard pokemonToDisplay={selectedPokemon} />
            </div>

            <button className="playbtn" id="nextTime" onClick={goToNewFight}>
              Let's fight again
            </button>
          </>
        )}
        {!winner && (
          <>
            <h1>You lost the fight</h1>
            <div className="winner">
              <DisplayPokemonCard pokemonToDisplay={randomPokemon} />
            </div>

            <button className="playbtn" id="nextTime" onClick={goToStart}>
              Maybe next time
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Announcement;
