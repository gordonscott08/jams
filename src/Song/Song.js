import React from "react";
import { generatePrimaryKey } from "../utilities";

export function Song({id, name, artist, album, fullObj, addSong, removeSong, removeButton}) {

    const handleClick = ()=> {
        if (removeButton) {
            removeSong(fullObj);
        } else {
            const storedSong = {
                jamsId: generatePrimaryKey(),
                id: id,
                name: name,
                artists: [{name: artist}],
                album: {name: album}
            }
            addSong(storedSong);
        }
    }

    return (
        <section className="song">
            <h4>{name}</h4>
            <h5>{artist}</h5>
            <h5>{album}</h5>
            <button onClick={handleClick}>{removeButton ? 'Remove' : 'Add'}</button>
        </section>
    )
}

/*

*/