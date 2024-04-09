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
            <a  className="link" href="/homestudent"><span className="Name">UniWeb</span></a>
            <ul>
                <li>
                    <a className="link" href="/profile">Profile</a>
                </li>
                <li>
                    <a className="link" href="/marksstudent">Marks</a>
                </li>
            </ul>
            <a className="link" href="/" id="logout" onClick={logout}>Logout</a>
        </div>
    );
        
        
    
}