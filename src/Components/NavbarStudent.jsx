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
            <a href="/homestudent"><span className="Name">UniWeb</span></a>
            <ul>
                <li>
                    <a href="/profile">Profile</a>
                </li>
                <li>
                    <a href="/marksstudent">Marks</a>
                </li>
            </ul>
            <a href="/" className="logout" onClick={logout}>Logout</a>
        </div>
    );
        
        
    
}