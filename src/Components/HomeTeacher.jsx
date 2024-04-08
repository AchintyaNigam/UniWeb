import React from "react";

import NavbarTeacher from "./NavbarTeacher";
import Forbidden from "./Forbidden";
import { useGlobalContext } from './../GlobalContext';

import './Home.css'

export default function HomeTeacher()
{
    const { token, role } = useGlobalContext();
    if(token!='' && role==='teacher')
    {
        return(
            <>
                <NavbarTeacher />
            <div className="homeMain">
                <span>Welcome</span>
                <div className="homeButtonsContainer">
                <div className="homeButtons"><a href="/profile">Profile</a></div>
                <div className="homeButtons"><a href="/allstudentprofiles">Students</a></div>
                <div className="homeButtons"><a href="/marksteacher">Marks</a></div>
                </div>
            </div>
            </>
            
        )
    }
    else{
        return <Forbidden />
    }
}
