import React from "react";

import NavbarStudent from "./NavbarStudent";

import './Home.css'

export default function HomeStudent()
{
    return(
        <>
            <NavbarStudent />
        <div className="homeMain">
            <span>Welcome</span>
            <div className="homeButtonsContainer">
            <div className="homeButtons"><a href="/profile">Profile</a></div>
            <div className="homeButtons"><a href="/marksstudent">Marks</a></div>
            </div>
            
        </div>
        </>
    )
}
