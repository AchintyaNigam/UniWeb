import React from "react";
import { useGlobalContext } from './../GlobalContext';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import Forbidden from "./Forbidden";
import './SignUpR.css';
import './LoginBox.css';


export default function EditProfileAdmin(){
    const { globId } = useParams();

    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [rolev, setRolev] = useState("");
    const [birthdate, setBirthdate] = useState("");
    
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();

    const { token, role, userId } = useGlobalContext();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Make request based on role
                    const mainProfile = await fetchStudentMainProfile(globId, token);
                    
                    setRolev(mainProfile.role);
                    setFullName(mainProfile.fullName);
                    setEmail(mainProfile.email);
                    setBirthdate(mainProfile.birthdate);
                    setUsername(mainProfile.username);
                    setPassword(mainProfile.password);

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

    if (!token || !userId || role != 'admin') {
        // Redirect or show error message if token or userId is missing
        return <Forbidden />;
    }

    const sendFirstRequest = async () => {
        const response = await fetch(`http://localhost:8080/api/profile/update/${globId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                username,
                password,
                "role": `${rolev}`,
                fullName,
                email,
                birthdate
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
            if(rolev==='student')
                navigate(`/studentexpandedAdmin/${globId}`);
            else
                navigate(`/teacherexpandedAdmin/${globId}`);

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
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)} 
                        id="fullName" 
                    />
                    <label htmlFor="fullName"><i>Full Name</i></label>
                </div>
                <div className="inputBox"> 
                    <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        id="email" 
                    />
                    <label htmlFor="email"><i>Email</i></label>
                </div>
                <div className="inputBox"> 
                    <input 
                        type="text" 
                        required 
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)} 
                        id="dob" 
                    />
                    <label htmlFor="dob">D.O.B</label>
                </div>
                <div className="inputBox" id="submit"> 
                    <button type="submit" onClick={handleSubmit}>Update</button>
                </div>
            </div>
            </div>

        </>

    )
}

async function fetchStudentMainProfile(userId, token) {
    const response = await fetch(`http://localhost:8080/api/profile/get/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch student main profile');
    }
    return await response.json();
}