import React, { useState, useRef, useCallback } from "react";
import "normalize.css";
import "./App.scss";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  connectSearchBox,
  connectStateResults,
  InfiniteHits,
} from "react-instantsearch-dom";
import Episode from "./Episode";

const searchClient = algoliasearch(
  "W963T74YEO",
  "75f3fd4f3d8092f7548023ea7c3077d0"
);
const SearchBox = ({ refine, delay, currentRefinement, ...props }) => {
  const timerId = useRef(null);
  const [value, setValue] = useState(currentRefinement);

  const onChangeDebounced = useCallback(
    (event) => {
      const _value = event.currentTarget.value;

      clearTimeout(timerId.current);
      timerId.current = setTimeout(() => refine(_value), delay);

      setValue(_value);
    },
    [delay, refine]
  );

  return (
    <input
      value={value}
      type="search"
      onChange={onChangeDebounced}
      {...props}
    />
  );
};

const Results = connectStateResults((props) => {
  console.log(props);
  const { searchState, searchResults, isSearchStalled, children } = props;
  return isSearchStalled || (searchResults && searchResults.nbHits !== 0) ? (
    children
  ) : (
    <div>No results have been found for {searchState.query}.</div>
  );
});
const DebouncedSearchBox = connectSearchBox(SearchBox);
function App() {
  return (
    <div className="App">
      <h1 className="page-title">The One With All The Episodes</h1>
      <InstantSearch
        className="search-box"
        indexName="friends"
        searchClient={searchClient}
      >
        <DebouncedSearchBox
          delay={1000}
          className="search-input"
          placeholder="Search for an episode or a number"
        />
        <Results>
          <InfiniteHits hitComponent={Episode} />
        </Results>
      </InstantSearch>
    </div>
  );
}

export default App;
