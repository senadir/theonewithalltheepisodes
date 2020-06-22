import React, {useState, useEffect, useRef} from 'react';
import 'normalize.css';
import './App.scss';
import elasticlunr from 'elasticlunr';
import shuffle from 'shuffle-array';
import Episode from './Episode'
import sourceEpisodes from './episodes.json';
import searchIndex from './index.json';
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
      <div className="search-box">
        <input type="search" className='search-input' placeholder="Search for an episode or a number" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
    {episodes.map(episode => <Episode key={`${episode.season}-${episode.number}`} {...episode} />)}
    </div>
  );
}

export default App;
