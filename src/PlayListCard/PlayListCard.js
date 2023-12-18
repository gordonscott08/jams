import React, { useState } from "react";
import { Song } from "../Song/Song";

export function PlayListCard(props) {
    const {tracksArr, addSong, removeSong, setSelectedSongs, setSearchResults} = props;

    const [text, setText] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleTextChange = (event) => {
        setText(event.target.value);
      }

    const handleSubmit = () => {
        if (text.length === 0) {
            alert('Please enter a playlist name first.');
            document.getElementById('userPlaylistName').focus();
            return;
        }
        if (tracksArr.length === 0) {
            alert('Please add a song to the playlist first.');
            setText('');
            document.getElementById('userInput').focus();
            return;
        }
        setSubmitted(true);
    }

    const handleNewSearch = () => {
        setSearchResults([]);
        setSelectedSongs([]);
        setSubmitted(false);
        setText('');
        document.getElementById('userInput').focus();
    }

    const songsSection = (
        <section className="songsBlock">
            {tracksArr.map((item,idx) => (<Song removeButton={true} jamsId={item.jamsId} fullObj={item} addSong={addSong} removeSong={removeSong} key={idx} id={item.id} name={item.name} album={item.album.name} artist={item.artists[0].name} />))}
        </section>
    )

    const submitSection = (
        <div id="submitContainer">
            {!submitted &&
            <>
            <input type="text" value={text} onChange={handleTextChange} name="playlistName" id="userPlaylistName" placeholder="Playlist Name" />
            <button id="submitPlaylistButton" onClick={handleSubmit} className="largeButton">Save to Spotify</button>
            </>}
            {submitted &&
            <>
            <span id="savedMessage">Playlist Saved</span>
            <button id="newSearchButton" onClick={handleNewSearch} className="largeButton">New Search</button>
            </>}
        </div>
    )


    return(
    <section id="playlist" className="box">
        <h2>Playlist Creation</h2>
        {songsSection}
        {submitSection}
    </section>
    )
}