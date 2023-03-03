import { useState, useEffect } from "react";
import DisplayResults from "../displayresults/DisplayResults";
import { PropagateLoader } from "react-spinners";

export default function SearchBar({ setSelectedPokemon }) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const allPokemons = `${process.env.REACT_APP_API_ENDPOINT}/pokemon`;
  const searchPokemonsByName = `${process.env.REACT_APP_API_ENDPOINT}/pokemon/names?start=${searchText}`;
  console.log("allpokemon", allPokemons);
  const handleTextChange = (event) => {
    setSearchText(event.target.value);
  };

  function fetchData(url) {
    setIsLoading(true); // Show loading screen
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        setErrorMessage("Request failed with HTTP code", response.status);
        throw new Error("Request failed!");
      })
      .then((jsonResponse) => {
        /* setSearchResults(jsonResponse);
        setIsLoading(false); // Hide loading screen */

        // Optional code to simulate delay
        setTimeout(() => {
          setSearchResults(jsonResponse);
          setSelectedPokemon(jsonResponse);
          setIsLoading(false);
        }, 1000);
        setErrorMessage(null);
      })
      .catch((networkError) => {
        setErrorMessage("Unable to fetch data");
        console.log(networkError);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchData(allPokemons);
  }, [allPokemons]);

  useEffect(() => {
    if (searchText !== "") {
      fetchData(searchPokemonsByName);
    }
  }, [searchText, searchPokemonsByName]);

  return (
    <>
      <div className="searchbar">
        <input
          type="searchText"
          aria-label="Which Pokémon are you?"
          placeholder="Which Pokémon are you?"
          value={searchText}
          onChange={handleTextChange}
        />
      </div>
      <div
        className="pokemonToFight
      "
      >
        {isLoading ? (
          <div className="reactLoader">
            <PropagateLoader color="purple" size={50} />
          </div>
        ) : (
          <>
            {errorMessage === null && searchResults.length > 0 && (
              <DisplayResults
                searchText={searchText}
                searchResults={searchResults}
                setSelectedPokemon={setSelectedPokemon}
              />
            )}
            {errorMessage === null && searchResults.length === 0 && (
              <div className="errorMessage">No Search Results</div>
            )}
            {errorMessage !== null && (
              <div className="errorMessage">{errorMessage}</div>
            )}
          </>
        )}
      </div>
    </>
  );
}
