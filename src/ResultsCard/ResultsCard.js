import React from "react";
import { SongsBlock } from "../SongsBlock/SongsBlock";

export function ResultsCard(props) {
    const {tracksObj, loggedIn} = props;
    return(
        <section className="majorSection">
        <h2>Search Results</h2>
        {loggedIn ? <SongsBlock tracksObj={tracksObj}/> : '' }
        </section>
    )
}