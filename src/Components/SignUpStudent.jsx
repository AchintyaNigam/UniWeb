import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './LoginBox.css';
import './SignUpR.css';

import logo2 from "./../assets/logo2.png";

export default function StudentSignUp({backendDomain})
{
    const [loading, setLoading] = useState(false);
    //profile
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthday] = useState("");

    //studentProfile
    const [rollNumber, setRollNumber] = useState("");
    const [branch, setBranch] = useState("");

    //studentAddress
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const[zipCode, setZipCode] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const userId = await sendFirstRequest(backendDomain);
            console.log(userId);
            await sendSecondRequest(userId, backendDomain);
            await sendThirdRequest(userId, backendDomain);
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
                role: "student",
                fullName,
                email,
                birthdate
            })
        });
        const data = await response.json();
        console.log(data);
        return data.userId;
    };

    const sendSecondRequest = async (userId, backendDomain) => {
        await fetch(`http://${backendDomain}/api/student/profile/post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                branch,
                rollNumber
            })
        });
    };

    const sendThirdRequest = async (userId, backendDomain) => {
        await fetch(`http://${backendDomain}/api/student/address/post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                city,
                street,
                zipCode
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
                        onChange={(e) => setRollNumber(e.target.value)} 
                        id="roleNo" 
                    />
                    <label htmlFor="roleNo"><i>Roll Number</i></label>
                </div>
                <div className="inputBox"> 
                    <input 
                        type="text" 
                        required 
                        onChange={(e) => setBranch(e.target.value)} 
                        id="branch" 
                    />
                    <label htmlFor="branch"><i>Branch</i></label>
                </div>
                <br></br>
                <h1>Address</h1>
                <hr></hr>
                <br></br>
                <div className="inputBox"> 
                    <input 
                        type="text" 
                        required 
                        onChange={(e) => setStreet(e.target.value)} 
                        id="street" 
                    />
                    <label htmlFor="street"><i>Street</i></label>
                </div>
                <div className="inputBox"> 
                    <input 
                        type="text" 
                        required 
                        onChange={(e) => setCity(e.target.value)} 
                        id="city" 
                    />
                    <label htmlFor="city"><i>City</i></label>
                </div>
                <div className="inputBox"> 
                    <input 
                        type="text" 
                        required 
                        onChange={(e) => setZipCode(e.target.value)} 
                        id="zipCode" 
                    />
                    <label htmlFor="zipCode"><i>Zip Code</i></label>
                </div>
                <br></br>
                <div className="inputBox" id="submit"> 
                <button type="submit" onClick={handleSubmit}>Register</button>
            </div> 
            </div>
            <div className="graphics">
                <img src={logo2} alt="logo" id="logo2"></img>
            </div>
        </div>
    )
}