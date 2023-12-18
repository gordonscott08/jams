import React, {useState} from "react";
import { getTracks } from "../mockData"

export function SearchCard(props) {
    const {loggedIn, handleLoginButton, setSearchResults} = props;

    const [text, setText] = useState('');

    const handleTextChange = (event) => {
        setText(event.target.value);
        console.log(text);
      }

    const handleSubmitClick = () => {
        const requestTracks = async function (text) {
            console.log('Requesting tracks.')
            const response = await getTracks(text);
            setSearchResults(response.tracks.items);
            console.log('Tracks saved.')
          }
          requestTracks(text);   
    }

    const handleClear = () => {
        setText('');
        setSearchResults(null);
        document.getElementById('userInput').focus();
    }

    const searchSection = (
        <section id="searchSection">
        <div id="searchElementsContainer">
            <input type="text" onChange={handleTextChange} value={text} name="search" id="userInput" placeholder="Search for Songs!"></input>
            <div id="searchButtonContainer">
                <button id="submit" onClick={handleSubmitClick} class="largeButton">Search</button>
                <button id="clear" onClick={handleClear} class="largeButton">Clear</button>
            </div>
        </div>
    </section>
    )

    const loginSection = (
        <button onClick={handleLoginButton} className="largeButton">Login to Spotify</button>
    )

    return (
        <>
        {loggedIn ? searchSection : loginSection}
        </>
    )
}

