import React from "react";
import { Song } from "../Song/Song";

export function SongsBlock(props) {
    const tracksArr = props.tracksObj.tracks.items;
    
    return (
        <section className="songsBlock">
        <p>The length of the tracks Arr is {tracksArr.length}</p>
            {tracksArr.map((item) => (<Song key={item.id} id={item.id} name={item.name} album={item.album.name} artist={item.artists[0].name} />))}
        </section>
    )
}