import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './LoginBox.css';
import './SignUpR.css';


import logo2 from "./../assets/logo2.png";

export default function TeacherSignUp({backendDomain})
{
    const [loading, setLoading] = useState(false);
    //profile
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthday] = useState("");

    //teacherProfile
    const [department, setDepartment] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const userId = await sendFirstRequest(backendDomain);
            await sendSecondRequest(userId, backendDomain);
            alert("Registration successful");
            navigate("/");
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const sendFirstRequest = async (backendDomain) => {
        const response = await fetch(`http://${backendDomain}/api/profile/post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                role: "teacher",
                fullName,
                email,
                birthdate
            })
        });
        const data = await response.json();
        return data.userId;
    };

    const sendSecondRequest = async (userId, backendDomain) => {
        await fetch(`http://${backendDomain}/api/teacher/profile/post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                department,
            })
        });
    };


    return(
        <div className="signUpPage">
            {loading && <div className="loadingPopup">Submitting. <b>Do not</b> close this tab.</div>}
            <div className="details">
                <h1>Details</h1>
                <hr></hr>
                <br></br>
                <div className="inputBox"> 
                    <input 
                        type="text" 
                        required 
                        onChange={(e) => setUsername(e.target.value)} 
                        id="username" 
                    />
                    <label htmlFor="username"><i>Username</i></label>
                </div>
                <div className="inputBox"> 
                    <input 
                        type="password" 
                        required 
                        onChange={(e) => setPassword(e.target.value)} 
                        id="password" 
                    />
                    <label htmlFor="password"><i>Password</i></label>
                </div>
                <div className="inputBox"> 
                    <input 
                        type="text" 
                        required 
                        onChange={(e) => setFullName(e.target.value)} 
                        id="fullName" 
                    />
                    <label htmlFor="fullName"><i>Full Name</i></label>
                </div>
                <div className="inputBox"> 
                    <input 
                        type="email" 
                        required 
                        onChange={(e) => setEmail(e.target.value)} 
                        id="email" 
                    />
                    <label htmlFor="email"><i>Email</i></label>
                </div>
                <div className="inputBox"> 
                    <input 
                        type="text" 
                        required 
                        onChange={(e) => setBirthday(e.target.value)} 
                        id="dob" 
                    />
                    <label htmlFor="dob">D.O.B</label>
                </div>
                <div className="inputBox"> 
                    <input 
                        type="text" 
                        required 
                        onChange={(e) => setDepartment(e.target.value)} 
                        id="department" 
                    />
                    <label htmlFor="department"><i>Department</i></label>
                </div>
                <br></br>
                <div className="inputBox" id="submit"> 
                <button type="submit" onClick={handleSubmit}>Register</button>
            </div> 
            </div>
            <div className="graphics2">
                <img src={logo2} alt="logo" id="logo2"></img>
            </div>
        </div>
    )
}