import { useInterval } from "usehooks-ts";
import { useState } from "react";
import axios from "axios";
import numOfIcon from "../header/numOfPlayersIcon.png";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const numOfActivePlayersURL = `${process.env.REACT_APP_API_ENDPOINT}/game/leaderboard/players/active`;
  const [numOfActivePlayers, setNumOfActivePlayers] = useState(0);
  const navigate = useNavigate();
  const goToHomePage = () => {
    navigate("/");
  };
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
      <div className="logo-image">
        <img
          className="logo-picture"
          onClick={goToHomePage}
          src={logo}
          alt="logo"
        ></img>
      </div>
      <div className="welcome">
        <h3 className="title">
          <span className="title-word title-word-1">Welcome </span>
          <span className="title-word title-word-2">to </span>
          <span className="title-word title-word-3">play </span>
          <span className="title-word title-word-4">zone</span>
        </h3>
      </div>

      <div className="numOfPlayer">
        <img src={numOfIcon} alt="number of active players" />

        {numOfActivePlayers > 0 && (
          <div className="activePlayers">{numOfActivePlayers}</div>
        )}
      </div>
    </div>
  );
}
