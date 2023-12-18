import React, {useState, useEffect } from "react";
import { ResultsCard } from "./ResultsCard/ResultsCard";
import { SearchCard } from "./SearchCard/SearchCard.js";
import { PlayListCard } from "./PlayListCard/PlayListCard.js";
import {currentToken, requestToken, redirectToSpotifyAuthorize} from "./apiCalls.js";
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);

  useEffect(()=>{
    const handleLoad = async () => {
    //first, check for params
    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get('code');
    const stateParam = params.get('state');
    //if params, process and make an API call for a first
    if (codeParam) {
        if (stateParam !== localStorage.getItem("sentStateParam")) {
            throw new Error ('Error. Returned State Parameter does not match Sent.');
        }
        console.log('OK. Query parameters detected. State param matched. Continuing authentication.')
        const token = await requestToken(codeParam);
        currentToken.save(token);
        // Remove the code from the URL so it's not visible and doesn't refresh to it.
        const url = new URL(window.location.href);
        url.searchParams.delete("code");
        url.searchParams.delete("state");
        const updatedUrl = url.search ? url.href : url.href.replace('?', '');
        window.history.replaceState({}, document.title, updatedUrl);
      } else {
        console.log('OK. No params.');
    };
    //second possibility: no params, but also no token. User will need to click 'login'.
    if (!currentToken.access_token) {
      setLoggedIn(false);
      console.log('No token discovered. Login rendered.');
    } else {
    //third possibility: Most common case. No params, token discovered. Ready to begin queries.
      setLoggedIn(true);
      console.log('OK. Token discovered.')
    }
    }
    handleLoad();
  },[])

  function handleLoginButton() {
    redirectToSpotifyAuthorize();
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