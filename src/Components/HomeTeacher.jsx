import React from "react";

import Navbar from "./Navbar";

import './Home.css'

export default function HomeTeacher()
{
    return(
        <>
            <Navbar />
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
