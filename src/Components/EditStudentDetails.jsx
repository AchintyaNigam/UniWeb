import React from "react";
import { useGlobalContext } from './../GlobalContext';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import NavbarStudent from "./NavbarStudent";
import Forbidden from "./Forbidden";
import './SignUpR.css';
import './LoginBox.css';


export default function EditStudentProfile(){
    const [rollNumber, setrollNumber] = useState("");
    const [branch, setBranch] = useState("");
    
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();

    const { token, role, userId } = useGlobalContext();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Make request based on role
                    const studentProfile = await fetchStudentProfile(userId, token);
                    
       
                    setrollNumber(studentProfile.rollNumber);
                    setBranch(studentProfile.branch);

            } catch (error) {
                console.error("Error fetching profile data:", error);
                alert("Error fetching Profile Data:", error);
                // Handle error, e.g., show error message
            }
        };

        if (token && userId) {
            fetchProfileData();
        }
    }, [token, role, userId]);

    if (!token || !userId || role==="teacher") {
        // Redirect or show error message if token or userId is missing
        return <Forbidden />;
    }

    const sendFirstRequest = async () => {
        const response = await fetch(`http://localhost:8080/api/student/profile/update/${userId}`, {
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
            await sendFirstRequest();
            alert("successfully updated");
            navigate("/profile");
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return(
        <>
            <NavbarStudent />      
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

async function fetchStudentProfile(userId, token) {
    const response = await fetch(`http://localhost:8080/api/student/profile/get/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch student profile');
    }
    return await response.json();
}