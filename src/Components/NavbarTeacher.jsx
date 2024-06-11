import React from "react";
import { useGlobalContext } from './../GlobalContext';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './Navbar.css'
export default function Navbar  ()
{
    const navigate = useNavigate();
    const { updateGlobalState, updateGlobalId } = useGlobalContext();
    function logout(){
        updateGlobalState('','','');
        updateGlobalId('');
        navigate('/');
    }
     
    return (
        <div className="Navbar">
            <Link  className="link" to="/hometeacher"><span className="Name">UniWeb</span></Link>
            <ul>
                <li>
                    <Link className="link" to="/profile">Profile</Link>
                </li>
                <li>
                    <Link className="link"  to="/marksteacher">Marks</Link>
                </li>
                <li>
                    <Link className="link"  to="/allstudentprofiles">Students</Link>
                </li>
            </ul>
            <span className="link" href="/" id="logout2"onClick={logout}>Logout</span>
        </div>
    );
        
        
    
}