import React from "react";
import LoginBox from './LoginBox';
import './Main.css';
export default function Main({backendDomain})
{
    console.log(backendDomain)
    return(
        <div className="loginContainer">
            <LoginBox backendDomain={backendDomain}/>
        </div>
        
    );
}