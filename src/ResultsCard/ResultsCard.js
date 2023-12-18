import React from "react";
import { Song } from "../Song/Song"


export function ResultsCard(props) {
    const {tracksArr, addSong, removeSong} = props;

    const songsBlock = (
        <section className="songsBlock">
            {tracksArr.map((item) => (<Song addSong={addSong} removeSong={removeSong} fullObj={item} key={item.id} id={item.id} name={item.name} album={item.album.name} artist={item.artists[0].name} />))}
        </section>
    )

    return(
        <section id="results" className="box">
        <h2>Search Results</h2>
        {songsBlock}
        </section>
    )
}