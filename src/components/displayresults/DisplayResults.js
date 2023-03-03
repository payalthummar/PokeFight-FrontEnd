import uuid from "react-uuid";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import DisplayPokemonCard from "../displaypokemoncard/DisplayPokemonCard";

export default function DisplayResults({
  allPokemons,
  searchResults,
  setSelectedPokemon,
}) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
  console.log("pagination", allPokemons);
  const [pokemonToDisplay, setPokemonToDisplay] = useState(null);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(searchResults.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(searchResults.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, searchResults]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % searchResults.length;
    setItemOffset(newOffset);
  };

  const handlePokemonClick = (event) => {
    setPokemonToDisplay({
      name: event.target.outerText,
      info: searchResults.find(
        (item) => item.name.english === event.target.outerText
      ),
    });
    setSelectedPokemon({
      name: event.target.outerText,
      info: searchResults.find(
        (item) => item.name.english === event.target.outerText
      ),
    });
  };
  console.log("items", currentItems);
  return (
    <>
      <div className="leftColumn">
        <div className="paginationSearch">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={0}
            pageCount={pageCount}
            previousLabel="<<"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="active"
          />
        </div>
        <div className="results">
          <ol className="searchResults" start={itemOffset + 1}>
            {currentItems.map((item) => (
              <ul key={uuid()} className="result">
                <div className="pokemonName" onClick={handlePokemonClick}>
                  <p>{item.name.english}</p>
                </div>
              </ul>
            ))}
          </ol>
        </div>
      </div>
      <div className="playerPokemon">
        {pokemonToDisplay !== null && (
          <DisplayPokemonCard pokemonToDisplay={pokemonToDisplay} />
        )}
      </div>
    </>
  );
}
