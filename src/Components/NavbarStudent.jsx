import React from "react";
import { useGlobalContext } from './../GlobalContext';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './Navbar.css'
export default function Navbar  ()
{
    const navigate = useNavigate();
    const { updateGlobalState } = useGlobalContext();
    function logout(){
        updateGlobalState('','','');
        navigate('/');
    }
     
    return (
        <div className="Navbar">
            <Link  className="link" to="/homestudent"><span className="Name">UniWeb</span></Link>
            <ul>
                <li>
                    <Link className="link" to="/profile">Profile</Link>
                </li>
                <li>
                    <Link className="link" to="/marksstudent">Marks</Link>
                </li>
            </ul>
            <span className="link" id="logout" onClick={logout}>Logout</span>
        </div>
    );
        
        
    
}