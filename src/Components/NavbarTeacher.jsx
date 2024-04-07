import React from "react";
import favicon from "./../assets/logo2.png"
import './Navbar.css'
export default function Navbar  ()
{
     
    return (
        <div className="Navbar">
            <a href="/hometeacher"><span className="Name">UniWeb</span></a>
            <ul>
                <li>
                    <a href="/profile">Profile</a>
                </li>
                <li>
                    <a href="/marksteacher">Marks</a>
                </li>
                <li>
                    <a href="/allstudentprofiles">Students</a>
                </li>
            </ul>
            <a href="/" className="logout2">Logout</a>
        </div>
    );
        
        
    
}