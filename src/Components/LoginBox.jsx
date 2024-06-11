import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from './../GlobalContext';
import './LoginBox.css'

export default function LoginBox({backendDomain})
{
    console.log(backendDomain)
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loggingIn, setLoggingIn] = useState(false); // State to track login request status

    const { updateGlobalState } = useGlobalContext();
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoggingIn(true); // Set loggingIn state to true when login request starts
        try {
            // Perform login request to server
            const { token, role, userId } = await login(username, password, backendDomain);
            updateGlobalState(token, role, userId);
            // Redirect user based on role
            if (role === 'student') {
                // Redirect to student home page
                console.log(role);
                navigate('/homestudent');
            } else if (role === 'teacher') {
                // Redirect to teacher home page
                navigate('/hometeacher');
            } else if (role === 'admin') {

                navigate('/homeadmin');
            } else {
                // Handle other roles if needed
                console.error('Unknown role:', role);
            }
        } catch (error) {
            // Handle error, e.g., display error message
            console.error("Login failed:", error);
            alert("Login failed. Please try again.");

        } finally {
            setLoggingIn(false); // Reset loggingIn state when login request completes
        }
    };

    const handleSignup = () =>
        {
            navigate("/signup");
        }

    async function login(username, password, backendDomain) {
        try {
            console.log(backendDomain)
            const response = await fetch(`http://${backendDomain}/api/login/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
    
            if (!response.ok) {
                throw new Error('Login failed');
            }
    
            const data = await response.json();
            const { token, role, userId } = data; // Assuming the server responds with role and userId
            return { token, role, userId };
        } catch (error) {
            throw new Error('Login failed: ' + error.message);
        }
    }
    
    return (
        <>
            {loggingIn && (
                <div className="popup">
                    <p>Logging in. <b>Do not</b> close this tab.</p>
                </div>
            )}
        <div className="loginBox">
      
            <div className="loginText">
                <h1>Login</h1>
            </div>
          
            <div className="loginFields">
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
            </div>
            
            <div className="signUp">
                <span className="link" id="signUpButton" onClick={()=>handleSignup()}>SignUp</span> 
            </div>  

            <div className="inputBox" id="submit"> 
                <button type="submit" onClick={handleLogin}>Login</button>
            </div>  
        </div>
        </>
    );
}