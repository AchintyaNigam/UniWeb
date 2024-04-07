import React from "react";

import NavbarTeacher from "./NavbarTeacher";

import './Home.css'

export default function HomeTeacher()
{
    return(
        <>
            <NavbarTeacher />
        <div className="homeMain">
            <span>Welcome</span>
            <div className="homeButtonsContainer">
            <div className="homeButtons">Your Profile</div>
            <div className="homeButtons">Student Profiles</div>
            <div className="homeButtons">Marks</div>
            </div>
        </div>
        </>
    )
}
