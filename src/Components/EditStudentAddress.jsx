import React from "react";
import { useGlobalContext } from './../GlobalContext';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import NavbarStudent from "./NavbarStudent";
import Forbidden from "./Forbidden";
import './SignUpR.css';
import './LoginBox.css';


export default function EditStudentAddress(){
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [zipCode, setZipCode] = useState("");

    
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();

    const { token, role, userId } = useGlobalContext();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Make request based on role
                    const studentAddress = await fetchStudentAddress(userId, token);
                    
       
                    setCity(studentAddress.city);
                    setStreet(studentAddress.street);
                    setZipCode(studentAddress.zipCode);


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
        const response = await fetch(`http://localhost:8080/api/student/address/update/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                city,
                street,
                zipCode
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
            console.error("Failed:", error);
            alert("Failed. Please try again.");
    
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
                <h1>Edit Address Details</h1>
                <hr></hr>
                <div className="inputBox"> 
                    <input 
                        type="text" 
                        required
                        value={street}
                        onChange={(e) => setStreet(e.target.value)} 
                        id="street" 
                    />
                    <label htmlFor="street"><i>Street</i></label>
                </div>
                <div className="inputBox"> 
                    <input 
                        type="text" 
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)} 
                        id="city" 
                    />
                    <label htmlFor="city"><i>City</i></label>
                </div>
                <div className="inputBox"> 
                    <input 
                        type="text" 
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)} 
                        id="zipCode" 
                    />
                    <label htmlFor="zipCode"><i>zipCode</i></label>
                </div>
                <div className="inputBox" id="submit"> 
                    <button type="submit" onClick={handleSubmit}>Update</button>
                </div>
            </div>
            </div>

        </>

    )
}

async function fetchStudentAddress(userId, token) {
    const response = await fetch(`http://localhost:8080/api/student/address/get/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch student profile');
    }
    return await response.json();
}