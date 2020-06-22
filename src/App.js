import React, {useState, useEffect, useRef} from 'react';
import 'normalize.css';
import './App.scss';
import elasticlunr from 'elasticlunr';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, InfiniteHits } from 'react-instantsearch-dom';


import shuffle from 'shuffle-array';
import Episode from './Episode'
import sourceEpisodes from './episodes.json';
import searchIndex from './index.json';
algoliasearch()
const searchClient = algoliasearch(
  'W963T74YEO',
  '75f3fd4f3d8092f7548023ea7c3077d0'
);

function App() {
  const [search, setSearch] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const idx = useRef();
  useEffect(() => {
    idx.current = elasticlunr.Index.load(searchIndex);

  })
  useEffect(() => {
    if (!search) {
      setEpisodes(shuffle.pick(sourceEpisodes, {picks: 10, copy: true}));
    } else {
      const results = idx.current.search(search, {
        fields: {
            title: {boost: 10,bool: "AND"},
            plot: {boost: 1}
        },
        bool: "AND"
    });
      setEpisodes(sourceEpisodes.filter(({link}) => results.find(({ref}) => ref === link)))
    }
  }, [search])
  return (
    <div className="App">
      <h1 className="page-title">The One With All The Episodes</h1>
      <InstantSearch className="search-box"
    indexName="friends"

    searchClient={searchClient}
  >
    <SearchBox className='search-input' placeholder="Search for an episode or a number" autoFocus={true} submit={null}  />
    <InfiniteHits hitComponent={Episode} />
  </InstantSearch>
    </div>
  );
}

export default App;
