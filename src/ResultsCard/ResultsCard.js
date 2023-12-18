import React from "react";
import { SongsBlock } from "../SongsBlock/SongsBlock";


//Example of using && operator below to not display ANYTHING if the condition is false (as opposed to ternary, which displays something or something else.)
export function ResultsCard(props) {
    const {tracksObj, loggedIn} = props;

    const placeholder = <p>Your Search Results Will Display Here</p>

    const results = (
        <section className="majorSection">
            <h2>Search Results</h2>
            {loggedIn && <SongsBlock tracksObj={tracksObj}/>}
        </section>
    )

    return(tracksObj ? results : placeholder)
}