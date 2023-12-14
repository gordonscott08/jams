import React from "react";

export function ResultsCard({responseObj}) {
    return(
    <>
    <p>The first track returned is called {responseObj.tracks.items[0].name} by {responseObj.tracks.items[0].artists[0].name} from the album {responseObj.tracks.items[0].album.name}.</p>
    <p>The second track returned is called {responseObj.tracks.items[1].name} by {responseObj.tracks.items[1].artists[0].name} from the album {responseObj.tracks.items[1].album.name}.</p>
    </>
    )
}