import React, {useState, useEffect } from "react";
import { ResultsCard } from "./ResultsCard/ResultsCard";
import { renewToken } from "./mockData.js";
import { SearchCard } from "./SearchCard/SearchCard.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchResults,setSearchResults] = useState(null);

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

  return (
    <>
     <header>
      <h1>Jams</h1>
      <SearchCard loggedIn={loggedIn} handleLoginButton={handleLoginButton} setSearchResults={setSearchResults} />
     </header>
      {searchResults && <ResultsCard tracksArr={searchResults} loggedIn={loggedIn}/>}
    </>
  )
}


export default App;