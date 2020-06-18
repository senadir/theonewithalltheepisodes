import React, {useState, useEffect} from 'react';
import 'normalize.css';
import './App.scss';
import sourceEpisodes from './episodes.json';
import Episode from './Episode'
function App() {
  const [search, setSearch] = useState("");
  const [episodes, setEpisodes] = useState([])
  useEffect(() => {
    if (!search) {
      setEpisodes(sourceEpisodes.slice(0,10));
    } else {
      const regex = new RegExp(search, 'ig')
      setEpisodes(sourceEpisodes.filter(episode => episode.title.search(regex) >= 0).slice(0,10))
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
