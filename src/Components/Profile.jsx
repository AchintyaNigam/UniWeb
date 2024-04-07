import React from "react";
import NavbarStudent from "./NavbarStudent"
import NavbarTeacher from "./NavbarTeacher";

import { useState } from "react";

export default function Profile(){

    const [role, setRole] = useState("student");
    if(role==="student")
    {
        return(
            <>
            <NavbarStudent />
            <div className="Profile">
                <h1>Profile</h1>
            </div>
            </>
        );    
    }
    else{
        return(
            <>
            <NavbarTeacher />
            <div className="Profile">
                <h1>Profile</h1>
            </div>
            </>
        );   
    }
    
}