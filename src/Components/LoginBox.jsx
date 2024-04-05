import React, { useState } from "react";
import './LoginBox.css'

export default function LoginBox()
{

    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    return (
        <div className="loginBox">
            <div className="loginText">
                <h1>Login</h1>
            </div>
          
            <div className="loginFields">
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
            </div>
            
            <div className="signUp">
                <a href="#">SignUp</a> 
            </div>  

            <div class="inputBox" id="submit"> 
                <button type="submit">Login</button>
            </div>  
        </div>
    );
}