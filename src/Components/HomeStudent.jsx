import React from "react";

import NavbarStudent from "./NavbarStudent";
import Forbidden from "./Forbidden";
import { useGlobalContext } from './../GlobalContext';
import { useNavigate } from "react-router-dom";


import './Home.css'

export default function HomeStudent()
{

    const navigate = useNavigate();
    const { token, role, userId } = useGlobalContext();
    const handleProfile = () => {
        navigate("/profile");
    }
    const handleMarks = () => {
        navigate("/marksstudent");
    }
    if(token!='' && role==='student')
    {
            return(
                <>
                <NavbarStudent />
            <div className="homeMain">
                <span>Welcome</span>
                <div className="homeButtonsContainer">
                    <div className="homeButtons"><span className="link" onClick={()=>handleProfile()}>Profile</span></div>
                    <div className="homeButtons"><span className="link" onClick={()=>handleMarks()}>Marks</span></div>
                </div>
            </div>
            </>
            );
    }
    else{
        return <Forbidden />
    }
}
