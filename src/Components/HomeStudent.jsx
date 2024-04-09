import React from "react";

import NavbarStudent from "./NavbarStudent";
import Forbidden from "./Forbidden";
import { useGlobalContext } from './../GlobalContext';


import './Home.css'

export default function HomeStudent()
{

    const { token, role, userId } = useGlobalContext();
    if(token!='' && role==='student')
    {
            return(
                <>
                <NavbarStudent />
            <div className="homeMain">
                <span>Welcome</span>
                <div className="homeButtonsContainer">
                    <div className="homeButtons"><a className="link" href="/profile">Profile</a></div>
                    <div className="homeButtons"><a className="link" href="/marksstudent">Marks</a></div>
                </div>
            </div>
            </>
            );
    }
    else{
        return <Forbidden />
    }
}
