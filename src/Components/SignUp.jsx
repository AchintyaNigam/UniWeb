import React from "react";
import Navbar from "./Navbar";
import "./SignUp.css"
export default function SignUp()
{
    return(
        <div>
            <Navbar />
            <div className="signUpContainer">
                <h1 id="question">Are You a Student or a Teacher?</h1>
                <div className="buttonsContainer">
                    <div className="roleButton"><a href="studentsignup">Student</a></div>
                    <div className="roleButton"><a href="teachersignup">Teacher</a></div>
                </div>
            </div>
        </div>
        
        
    );
}