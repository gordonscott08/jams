import React from "react";
import { Song } from "../Song/Song";

export function PlayListCard(props) {
    const {tracksArr, loggedIn, toggleSelectedSong} = props;

    const songsBlock = (
        <section className="songsBlock">
        <p>The length of the tracks Arr is {tracksArr.length}</p>
            {tracksArr.map((item) => (<Song toggleSelectedSong={toggleSelectedSong} fullObj={item} key={item.id} id={item.id} name={item.name} album={item.album.name} artist={item.artists[0].name} />))}
        </section>
    )
    return(
        <section className="majorSection">
        <h2>Playlist</h2>
        {loggedIn && songsBlock}
        </section>
    )
}