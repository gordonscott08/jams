import React, {useState, useEffect } from "react";


export function SearchCard(props) {
    const {loggedIn, handleLoginButton, handleSearchSubmit} = props;
    return (
        <>
        {loggedIn ? <Search handleSearchSubmit={handleSearchSubmit}/> : <button onClick={handleLoginButton} className="largeButton">Login to Spotify</button>}
        </>
    )
}

function Search(props) {
    const {handleSearchSubmit} = props;
    const [text, setText] = useState('');

    const handleTextChange = (event) => {
        setText(event.target.value);
        console.log(text);
      }

    const handleSubmitClick = () => {
        handleSearchSubmit(text);
    }

    return (
        <section id="searchSection">
            <div id="searchElementsContainer">
                <input type="text" onChange={handleTextChange} value={text} name="search" id="userInput" placeholder="Search for Songs!"></input>
                <div id="searchButtonContainer">
                    <button id="submit" onClick={handleSubmitClick} class="largeButton">Search</button>
                    <button id="clear" class="largeButton">Clear</button>
                </div>
            </div>
        </section>
    )
}