import React from "react";
import Navbar from "./Navbar";
import "./SignUp.css"
import { useNavigate } from "react-router-dom";
export default function SignUp()
{
    const navigate = useNavigate();

    const handleStudentSignUp = () => {
        navigate("/studentsignup");
    }
    const handleTeacherSignUp = () => {
        navigate("/teachersignup");
    }
    return(
        <div>
            <Navbar />
            <div className="signUpContainer">
                <h1 id="question">Are You a Student or a Teacher?</h1>
                <div className="buttonsContainer">
                    <div className="roleButton"><span className="link" onClick={()=>handleStudentSignUp()}>Student</span></div>
                    <div className="roleButton"><span className="link" onClick={()=>handleTeacherSignUp()}>Teacher</span></div>
                </div>
            </div>
        </div>
        
        
    );
}