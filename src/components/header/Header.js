import { useInterval } from "usehooks-ts";
import { useState } from "react";
import axios from "axios";
import numOfIcon from "../header/numOfPlayersIcon.png";

export default function Header() {
  const numOfActivePlayersURL =
    "http://localhost:3080/game/leaderboard/players/active";
  const [numOfActivePlayers, setNumOfActivePlayers] = useState(0);

  useInterval(() => {
    const getAllPokemons = () => {
      axios.get(numOfActivePlayersURL).then((res) => {
        setNumOfActivePlayers(res.data.numActive);
      });
    };
    getAllPokemons();
  }, 1000);

  return (
    <div className="header">
      <div className="logo-image"></div>
      <div className="app-title"></div>
      <h1>Pokémon Fight Game</h1>
      <div className="numOfPlayer">
        <img src={numOfIcon} alt="number of active players" />

        {numOfActivePlayers > 0 && (
          <div className="activePlayers">{numOfActivePlayers}</div>
        )}
      </div>
    </div>
  );
}
