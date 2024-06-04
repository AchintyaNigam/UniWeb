import React, { useEffect, useState } from "react";
import { useGlobalContext } from './../GlobalContext';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import NavbarAdmin from "./NavbarAdmin";
import Forbidden from "./Forbidden";

import EditButton from "./../assets/edit_button.png";


import './Profile.css';

export default function StudentExpandedAdmin({backendDomain}) {
    const { globId } = useParams();
    const { token, role, userId } = useGlobalContext();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            setLoading(true);
            try {
                    const [mainProfile, studentProfile, address] = await Promise.all([
                        fetchStudentMainProfile(globId, token, backendDomain),
                        fetchStudentProfile(globId, token, backendDomain),
                        fetchStudentAddress(globId, token, backendDomain)
                    ]);
                    
                    setProfileData({ mainProfile, studentProfile, address });
            } catch (error) {
                console.error("Error fetching profile data:", error);
                // Handle error, e.g., show error message
            } finally {
                setLoading(false);
            }
        };

        if (token && userId && role==='admin') {
            fetchProfileData();
        }
    }, [token, role, userId]);

    if (!token || !userId || role != 'admin') {
        // Redirect or show error message if token or userId is missing
        return <Forbidden />;
    }

    if (loading) {
        // Show loading spinner or message while data is being fetched
        return <div className="popup"><h1>Loading</h1></div>;
    }

    const handleEditProfile = (uId) =>{
        navigate(`/editprofileadmin/${uId}`);
    }

    const handleEditStudentProfile = (uId) =>{
        navigate(`/editstudentprofileadmin/${uId}`);
    }
    const handleEditStudentAddress = (uId) =>{
        navigate(`/editstudentaddressadmin/${uId}`);
    }
    return (
        <>
            <NavbarAdmin />
            <div className="Profile">
            {profileData ? (
        <div className="profileDisplay">
            <div className="Headings">
                <span className="SubHeading"><b>Profile</b><a onClick={()=>handleEditProfile(profileData.studentProfile.userId)}><img src={EditButton} /></a></span>
            </div>
            <hr />
            
            <p><strong>Name:</strong> {profileData.mainProfile.fullName}</p>
            <p><strong>Email:</strong> {profileData.mainProfile.email}</p>
            <p><strong>DOB:</strong> {profileData.mainProfile.birthdate}</p>
            <div className="Headings">
                <span className="SubHeading"><b>Student Info</b><a onClick={()=>handleEditStudentProfile(profileData.studentProfile.userId)}><img src={EditButton}></img></a></span>
            </div>
            <hr />
            <p><strong>Roll Number:</strong> {profileData.studentProfile.rollNumber}</p>
            <p><strong>Branch:</strong> {profileData.studentProfile.branch}</p>
            <div className="Headings">
                <span className="subHeading"><b>Address</b><a onClick={()=>handleEditStudentAddress(profileData.studentProfile.userId)}><img src={EditButton}></img></a></span>
            </div>
            <hr />
            <p><strong>Street:</strong> {profileData.address.street}</p>
            <p><strong>City:</strong> {profileData.address.city}</p>
            <p><strong>Zip Code:</strong> {profileData.address.zipCode}</p>

            
        </div>
    ) : (
        <div className="popup">Loading profile data...</div>
    )}
            </div>
        </>
    );
}

// Functions to fetch profile data based on user's role
async function fetchStudentMainProfile(userId, token, backendDomain) {
    const response = await fetch(`http://${backendDomain}/api/profile/get/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch student main profile');
    }
    return await response.json();
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

async function fetchStudentAddress(userId, token, backendDomain) {
    const response = await fetch(`http://${backendDomain}/api/student/address/get/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch student address');
    }
    return await response.json();
}
