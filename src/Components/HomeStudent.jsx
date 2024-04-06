import React from "react";

import Navbar from "./Navbar";

import './Home.css'

export default function HomeStudent()
{
    return(
        <>
            <Navbar />
        <div className="homeMain">
            <span>Welcome</span>
            <div className="homeButtonsContainer">
            <div className="homeButtons">Profile</div>
            <div className="homeButtons">Marks</div>
            </div>
            
        </div>
        </>
    )
}
