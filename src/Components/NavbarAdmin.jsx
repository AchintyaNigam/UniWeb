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
            <Link  className="link" to="/homeadmin"><span className="Name">UniWeb</span></Link>
            <ul>
                <li>
                    <Link className="link" to="/allteacherprofilesadmin">Teachers</Link>
                </li>
                <li>
                    <Link className="link"  to="/allstudentprofilesadmin">Students</Link>
                </li>
            </ul>
            <span className="link"id="logout2"onClick={logout}>Logout</span>
        </div>
    );
        
        
    
}