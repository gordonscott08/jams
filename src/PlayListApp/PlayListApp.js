import React from "react";
import { SearchCard } from "../SearchCard/SearchCard";
import { ResultsCard } from "../ResultsCard/ResultsCard";
import { PlayListCard } from "../PlayListCard/PlayListCard";

export function PlayListApp({responseObj}) {
    return (
        <>
        <SearchCard />
        <ResultsCard responseObj={responseObj} />
        <PlayListCard />
        </>
    )
}