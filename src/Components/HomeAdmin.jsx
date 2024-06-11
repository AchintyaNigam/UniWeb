import React from "react";

import NavbarAdmin from "./NavbarAdmin";
import Forbidden from "./Forbidden";
import { useGlobalContext } from './../GlobalContext';
import { Link } from "react-router-dom";

import './Home.css'

export default function HomeAdmin()
{
    const { token, role } = useGlobalContext();
    if(token!='' && role==='admin')
    {
        return(
            <>
                <NavbarAdmin />
            <div className="homeMain">
                <span>Welcome</span>
                <div className="homeButtonsContainer">
                <div className="homeButtons"><Link className="link" to="/allteacherprofilesadmin">Teachers</Link></div>
                <div className="homeButtons"><Link className="link" to="/allstudentprofilesadmin">Students</Link></div>
                </div>
            </div>
            </>
            
        )
    }
    else{
        return <Forbidden />
    }
}
