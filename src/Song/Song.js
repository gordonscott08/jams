import React from "react";

export function Song({id, name, artist, album}) {
    return (
        <section className="song">
            <h4>{name}</h4>
            <h5>{id}</h5>
            <h5>{artist}</h5>
            <h5>{album}</h5>
        </section>
    )
}