import React from "react";
import { useGlobalContext } from './../GlobalContext';
import './Navbar.css'
export default function Navbar  ()
{
    const { updateGlobalState } = useGlobalContext();
    function logout(){
        updateGlobalState('','','');
    }
     
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
            <a href="/" className="logout2"onClick={logout}>Logout</a>
        </div>
    );
        
        
    
}