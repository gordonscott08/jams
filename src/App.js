import React, {useState, useEffect } from "react";
import { ResultsCard } from "./ResultsCard/ResultsCard";
import { renewToken } from "./mockData.js";
import { SearchCard } from "./SearchCard/SearchCard.js";
import { PlayListCard } from "./PlayListCard/PlayListCard.js";
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);

  useEffect(()=>{
    console.log('Requesting token.')
    const requestData = async () => {
      const response = await renewToken();
      console.log('Token refreshed.')
    }
    requestData();
  },[])

  function handleLoginButton() {
    setLoggedIn(true);
  }

  function addSong(songObj) {
    console.log(songObj.id);
    //add to selected and remove from search results.
      setSelectedSongs(prevSelected => [songObj, ...prevSelected]);
      setSearchResults(prevResults => prevResults.filter(item => item.id !== songObj.id))
    console.log(selectedSongs)
  }

  function removeSong(songObj) {
    //remove from selected. Add back to search results unless it's alredy there.
    setSelectedSongs(prevSelected => prevSelected.filter(item => item.jamsId !== songObj.jamsId));
    //if search results already include the removed song, exit sub. If not, add the song to search results.
    if (searchResults.some((item)=>item.id === songObj.id)) {
      console.log(`Sent object has id: ${songObj.id}.`)
      console.log('true');
      return;
    } else {
      console.log(`Sent object has id: ${songObj.id}.`)
      console.log('false');
      setSearchResults(prevResults => [songObj, ...prevResults]);
    }
  }

  return (
    <>
     <header>
      <h1>Jams</h1>
      <SearchCard loggedIn={loggedIn} handleLoginButton={handleLoginButton} setSearchResults={setSearchResults} />
     </header>
     <main>
      <div id="blocksContainer">
      {loggedIn && <ResultsCard tracksArr={searchResults} addSong={addSong} removeSong={removeSong} />}
      {loggedIn && <PlayListCard tracksArr={selectedSongs} addSong={addSong} removeSong={removeSong} setSelectedSongs={setSelectedSongs} setSearchResults={setSearchResults} />}
      </div>
    </main>
    <footer>&copy; 2023 Gordon Scott</footer>
    </>
  )
}

export default App;