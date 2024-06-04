import React from "react";
import { useGlobalContext } from './../GlobalContext';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

import NavbarAdmin from "./NavbarAdmin";
import Forbidden from "./Forbidden";
import './SignUpR.css';
import './LoginBox.css';


export default function EditStudentProfileAdmin({backendDomain}){
    const { globId } = useParams();

    const [rollNumber, setrollNumber] = useState("");
    const [branch, setBranch] = useState("");
    
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();

    const { token, role, userId } = useGlobalContext();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Make request based on role
                    const studentProfile = await fetchStudentProfile(globId, token, backendDomain);
                    
       
                    setrollNumber(studentProfile.rollNumber);
                    setBranch(studentProfile.branch);

            } catch (error) {
                console.error("Error fetching profile data:", error);
                alert("Error fetching Profile Data:", error);
                // Handle error, e.g., show error message
            }
        };

        if (token && userId && role==='admin') {
            fetchProfileData();
        }
    }, [token, role, userId, globId]);

    if (!token || !userId || role!="admin") {
        // Redirect or show error message if token or userId is missing
        return <Forbidden />;
    }

    const sendFirstRequest = async (backendDomain) => {
        const response = await fetch(`http://${backendDomain}/api/student/profile/update/${globId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                rollNumber,
                branch
            })
        });
        const data = await response.json();
        return data.userId;
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await sendFirstRequest(backendDomain);
            alert("successfully updated");
            navigate(`/studentexpandedadmin/${globId}`);
        } catch (error) {
            console.error("Update failed:", error);
            alert("Update failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return(
        <>
            <NavbarAdmin />      
            {loading && <div className="loadingPopup">Submitting. <b>Do not</b> close this tab.</div>}
            <div className="loginBox">
            <div className="loginFields">
                <h1>Edit Details</h1>
                <hr></hr>
                <div className="inputBox"> 
                    <input 
                        type="text" 
                        required
                        value={rollNumber}
                        onChange={(e) => setrollNumber(e.target.value)} 
                        id="rollNumber" 
                    />
                    <label htmlFor="rollNumber"><i>Roll Number</i></label>
                </div>
                <div className="inputBox"> 
                    <input 
                        type="text" 
                        required
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)} 
                        id="branch" 
                    />
                    <label htmlFor="branch"><i>Branch</i></label>
                </div>
                <div className="inputBox" id="submit"> 
                    <button type="submit" onClick={handleSubmit}>Update</button>
                </div>
            </div>
            </div>

        </>

    )
}

async function fetchStudentProfile(userId, token, backendDomain) {
    const response = await fetch(`http://${backendDomain}/api/student/profile/get/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch student profile');
    }
    return await response.json();
}