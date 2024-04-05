import React from "react";
import favicon from "./favicon.png"
import './Navbar.css'
export default function Navbar  ()
{
     
    return (
        <div className="Navbar">
            <span className="Name">UniWeb</span>
            <img src={favicon} alt="logo" className="logo"></img>
        </div>
    );
        
        
    
}