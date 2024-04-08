import React from "react";
import './Forbidden.css';

export default function Forbidden(){
    return(
        <div className="ErrorContainer">
            <h1>403</h1>
            <h2><i>Forbidden</i></h2>
            <p>You shall not pass!</p>
        </div>
    )
}