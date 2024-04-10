import React from "react";
import { useGlobalContext } from './../GlobalContext';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

import NavbarAdmin from "./NavbarAdmin";
import Forbidden from "./Forbidden";
import './SignUpR.css';
import './LoginBox.css';


export default function EditTeacherProfileAdmin(){
    const { globId } = useParams();

    const [department, setDepartment] = useState("");
    
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();

    const { token, role, userId } = useGlobalContext();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Make request based on role
                    const teacherProfile = await fetchStudentProfile(globId, token);
                    
       
                    setDepartment(teacherProfile.department);

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

    const sendFirstRequest = async () => {
        const response = await fetch(`http://localhost:8080/api/teacher/profile/update/${globId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                department
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
            navigate(`/teacherexpandedadmin/${globId}`);
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
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)} 
                        id="department" 
                    />
                    <label htmlFor="department"><i>Department</i></label>
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
    const response = await fetch(`http://localhost:8080/api/teacher/profile/get/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch teacher profile');
    }
    return await response.json();
}