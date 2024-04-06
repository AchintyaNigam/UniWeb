import React from "react";
import { useState } from "react";
import './LoginBox.css';
import './SignUpR.css';


import logo2 from "./../assets/logo2.png";

export default function StudentSignUp()
{
    //profile
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("student");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    //teacherProfile
    const [department, setDepartment] = useState("");


    return(
        <div className="signUpPage">
            <div className="details">
                <h1>Details</h1>
                <hr></hr>
                <br></br>
                <div class="inputBox"> 
                    <input 
                        type="text" 
                        required 
                        onChange={(e) => setUsername(e.target.value)} 
                        id="username" 
                    />
                    <label htmlFor="username"><i>Username</i></label>
                </div>
                <div class="inputBox"> 
                    <input 
                        type="password" 
                        required 
                        onChange={(e) => setPassword(e.target.value)} 
                        id="password" 
                    />
                    <label htmlFor="password"><i>Password</i></label>
                </div>
                <div class="inputBox"> 
                    <input 
                        type="text" 
                        required 
                        onChange={(e) => setFullName(e.target.value)} 
                        id="fullName" 
                    />
                    <label htmlFor="fullName"><i>Full Name</i></label>
                </div>
                <div class="inputBox"> 
                    <input 
                        type="email" 
                        required 
                        onChange={(e) => setEmail(e.target.value)} 
                        id="email" 
                    />
                    <label htmlFor="email"><i>Email</i></label>
                </div>
                <div class="inputBox"> 
                    <input 
                        type="text" 
                        required 
                        onChange={(e) => setBirthday(e.target.value)} 
                        id="dob" 
                    />
                    <label htmlFor="dob">D.O.B</label>
                </div>
                <div class="inputBox"> 
                    <input 
                        type="text" 
                        required 
                        onChange={(e) => setDepartment(e.target.value)} 
                        id="department" 
                    />
                    <label htmlFor="department"><i>Department</i></label>
                </div>
                <br></br>
                <div class="inputBox" id="submit"> 
                <button type="submit">Register</button>
            </div> 
            </div>
            <div className="graphics2">
                <img src={logo2} alt="logo" id="logo2"></img>
            </div>
        </div>
    )
}