import React from "react";
import favicon from "./../assets/logo2.png"
import './Navbar.css'
export default function Navbar  ()
{
     
    return (
        <div className="Navbar">
            <a href="/homestudent"><span className="Name">UniWeb</span></a>
            <ul>
                <li>
                    <a href="/profile">Profile</a>
                </li>
                <li>
                    <a href="/marksstudent">Marks</a>
                </li>
            </ul>
            <a href="/" className="logout">Logout</a>
        </div>
    );
        
        
    
}