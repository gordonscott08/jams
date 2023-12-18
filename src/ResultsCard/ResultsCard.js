import React from "react";
import { SongsBlock } from "../SongsBlock/SongsBlock";


export function ResultsCard(props) {
    const {tracksArr, loggedIn} = props;

    const placeholder = <p>Your Search Results Will Display Here</p>

    const results = (
        <section className="majorSection">
            <h2>Search Results</h2>
            {loggedIn && <SongsBlock tracksArr={tracksArr} />}
        </section>
    )

    return(tracksArr ? results : placeholder)
}

//{loggedIn && <SongsBlock/>}