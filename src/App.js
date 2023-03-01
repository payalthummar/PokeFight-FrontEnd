import "./App.css";

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Header from "./components/header/Header";
import Welcome from "./components/welcome/Welcome";
import Pokefight from "./components/pokefight/Pokefight";
import FightArena from "./components/fightArena/FightArena";
import Announcement from "./components/announcement/Announcement";
import Footer from "./components/footer/Footer";

function App(pokemonToDisplay) {
  //const allPokemonsURL = "http://localhost:3080/pokemon";
  const allPokemonsURL = `${process.env.REACT_APP_API_ENDPOINT}/pokemon`;
  const [allPokemons, setAllPokemons] = useState([]);

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [playerID, setPlayerID] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const getAllPokemons = () => {
      axios.get(allPokemonsURL).then((res) => {
        setAllPokemons(res.data);
      });
    };

    getAllPokemons();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Welcome setPlayerID={setPlayerID} setScore={setScore} />}
        />
        <Route
          path="/pokefight"
          element={
            <Pokefight
              allPokemons={allPokemons}
              selectedPokemon={selectedPokemon}
              setSelectedPokemon={setSelectedPokemon}
            />
          }
        />
        <Route
          path="/fightarena"
          element={
            <FightArena
              allPokemons={allPokemons}
              selectedPokemon={selectedPokemon}
              randomPokemon={randomPokemon}
              setRandomPokemon={setRandomPokemon}
            />
          }
        />
        <Route
          path="/results"
          element={
            <Announcement
              selectedPokemon={selectedPokemon}
              randomPokemon={randomPokemon}
              playerID={playerID}
              score={score}
              setScore={setScore}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
