import React, {useState, useEffect } from "react";
import { ResultsCard } from "./ResultsCard/ResultsCard";
import { renewToken } from "./mockData.js";
import { SearchCard } from "./SearchCard/SearchCard.js";
import { PlayListCard } from "./PlayListCard/PlayListCard.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchResults,setSearchResults] = useState(null);
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

  function toggleSelectedSong(songObj) {
    console.log(songObj.id);
    //if the selectedSongs array includes this song, remove it from selected songs, and add it to search results.
    if (selectedSongs.some((item)=>item.id === songObj.id)) {
      setSelectedSongs(prevSelected => prevSelected.filter(item => item !== songObj))
      setSearchResults(prevResults => [songObj, ...prevResults])
    //otherwise add to selected songs, and remove from search results
    } else {
      setSelectedSongs(prevSelected => [songObj, ...prevSelected]);
      setSearchResults(prevResults => prevResults.filter(item => item!== songObj))
    }
    console.log(selectedSongs)
  }

  return (
    <>
     <header>
      <h1>Jams</h1>
      <SearchCard loggedIn={loggedIn} handleLoginButton={handleLoginButton} setSearchResults={setSearchResults} />
     </header>
      {searchResults && <ResultsCard tracksArr={searchResults} loggedIn={loggedIn} toggleSelectedSong={toggleSelectedSong}/>}
      {searchResults && <PlayListCard tracksArr={selectedSongs} loggedIn={loggedIn} toggleSelectedSong={toggleSelectedSong}/>}
    </>
  )
}


export default App;