import React from "react";

export function Search() {
    return (
        <section id="searchSection">
            <div id="searchElementsContainer">
                <input type="text" name="search" id="userInput" placeholder="Search for Songs!"></input>
                <div id="searchButtonContainer">
                    <button id="submit" class="largeButton">Search</button>
                    <button id="clear" class="largeButton">Clear</button>
                </div>
            </div>
        </section>
    )
}