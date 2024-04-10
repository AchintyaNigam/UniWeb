import React from "react";

import NavbarAdmin from "./NavbarAdmin";
import Forbidden from "./Forbidden";
import { useGlobalContext } from './../GlobalContext';

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
                <div className="homeButtons"><a className="link" href="/allteacherprofilesadmin">Teachers</a></div>
                <div className="homeButtons"><a className="link" href="/allstudentprofilesadmin">Students</a></div>
                </div>
            </div>
            </>
            
        )
    }
    else{
        return <Forbidden />
    }
}
