import React from "react";
import { Login } from "../Login/Login";
import { Search } from "../Search/Search";


export function SearchCard(props) {
    const {loggedIn} = props;
    return (
        <>
        {loggedIn ? <Search/> : <Login/>}
        </>
    )
}