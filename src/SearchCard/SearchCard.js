import React, {useState} from "react";
import { searchSpotify } from "../apiCalls";

export function SearchCard(props) {
    const {loggedIn, handleLoginButton, setSearchResults} = props;

    const [text, setText] = useState('');

    const handleTextChange = (event) => {
        setText(event.target.value);
        console.log(text);
      }

    const handleSubmit = () => {
        


        const requestTracks = async function () {
            console.log('Requesting tracks.')
            const response = await searchSpotify(text);
            setSearchResults(response.tracks.items);
            console.log('Tracks saved.')
          }
          requestTracks();
          setText('');  
    }

    const handleClear = () => {
        setText('');
        setSearchResults([]);
        document.getElementById('userInput').focus();
    }

    const searchSection = (
        <section id="searchSection">
        <div id="searchElementsContainer">
            <input type="text" onChange={handleTextChange} value={text} name="search" id="userInput" placeholder="Search for Songs!" autoFocus></input>
            <div id="searchButtonContainer">
                <button id="submit" onClick={handleSubmit} className="largeButton">Search</button>
                <button id="clear" onClick={handleClear} className="largeButton">Clear</button>
            </div>
        </div>
    </section>
    )

    const loginSection = (
        <section id="searchSection">
        <button onClick={handleLoginButton} className="largeButton">Login to Spotify</button>
        </section>
    )

    return (
        <>
        {loggedIn ? searchSection : loginSection}
        </>
    )
}

