import React from "react";

import NavbarTeacher from "./NavbarTeacher";
import Forbidden from "./Forbidden";
import { useGlobalContext } from './../GlobalContext';
import { Link } from "react-router-dom";

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
                <div className="homeButtons"><Link className="link" to="/profile">Profile</Link></div>
                <div className="homeButtons"><Link className="link" to="/allstudentprofiles">Students</Link></div>
                <div className="homeButtons"><Link className="link" to="/marksteacher">Marks</Link></div>
                </div>
            </div>
            </>
            
        )
    }
    else{
        return <Forbidden />
    }
}
