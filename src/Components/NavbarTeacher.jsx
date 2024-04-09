import React from "react";
import { useGlobalContext } from './../GlobalContext';
import './Navbar.css'
export default function Navbar  ()
{
    const { updateGlobalState, updateGlobalId } = useGlobalContext();
    function logout(){
        updateGlobalState('','','');
        updateGlobalId('');
    }
     
    return (
        <div className="Navbar">
            <a  className="link" href="/hometeacher"><span className="Name">UniWeb</span></a>
            <ul>
                <li>
                    <a className="link" href="/profile">Profile</a>
                </li>
                <li>
                    <a className="link"  href="/marksteacher">Marks</a>
                </li>
                <li>
                    <a className="link"  href="/allstudentprofiles">Students</a>
                </li>
            </ul>
            <a className="link" href="/" id="logout2"onClick={logout}>Logout</a>
        </div>
    );
        
        
    
}