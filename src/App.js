import React, {useState, useEffect } from "react";
import { ResultsCard } from "./ResultsCard/ResultsCard";
import { renewToken, getTracks } from "./mockData.js";
import { SearchCard } from "./SearchCard/SearchCard.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tracksObj,setTracksObj] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  //could the below live in the search card component?
  function handleSearchSubmit(newSearch) {
    const requestTracks = async function (newSearch) {
      console.log('Requesting tracks.')
      const response = await getTracks(newSearch);
      setTracksObj(response);
      console.log('Tracks object saved.')
    }
    requestTracks(newSearch);
  }

  return (
    <>
     <header>
      <h1>Jams</h1>
      <SearchCard loggedIn={loggedIn} handleLoginButton={handleLoginButton} handleSearchSubmit={handleSearchSubmit} />
     </header>
      {tracksObj && <ResultsCard tracksObj={tracksObj} loggedIn={loggedIn}/>}
      <footer>
        <p>{JSON.stringify(tracksObj)}</p>
        <p>{searchTerm}</p>
      </footer>
    </>
  )
}

//  <ResultsCard tracksObj={tracksObj} loggedIn={loggedIn}/>

export default App;