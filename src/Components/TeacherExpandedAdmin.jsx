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
                    const [mainProfile, teacherProfile] = await Promise.all([
                        fetchTeacherMainProfile(globId, token, backendDomain),
                        fetchTeacherProfile(globId, token, backendDomain),
                    ]);
                    
                    setProfileData({ mainProfile, teacherProfile});
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

    const handleEditTeacherProfile = (uId) =>{
        navigate(`/editteacherprofileadmin/${uId}`);
    }
    return (
        <>
            <NavbarAdmin />
            <div className="Profile">
            {profileData ? (
        <div className="profileDisplay">
            <div className="Headings">
                <span className="SubHeading"><b>Profile</b><a onClick={()=>handleEditProfile(profileData.teacherProfile.userId)}><img src={EditButton} /></a></span>
            </div>
            <hr />
            
            <p><strong>Name:</strong> {profileData.mainProfile.fullName}</p>
            <p><strong>Email:</strong> {profileData.mainProfile.email}</p>
            <p><strong>DOB:</strong> {profileData.mainProfile.birthdate}</p>
            <div className="Headings">
                <span className="SubHeading"><b>Teacher Info</b><a onClick={()=>handleEditTeacherProfile(profileData.teacherProfile.userId)}><img src={EditButton}></img></a></span>
            </div>
            <hr />
            <p><strong>Department:</strong> {profileData.teacherProfile.department}</p>
        </div>
    ) : (
        <div className="popup">Loading profile data...</div>
    )}
            </div>
        </>
    );
}

// Functions to fetch profile data based on user's role
async function fetchTeacherMainProfile(userId, token, backendDomain) {
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

async function fetchTeacherProfile(userId, token, backendDomain) {
    const response = await fetch(`http://${backendDomain}/api/teacher/profile/get/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch student profile');
    }
    return await response.json();
}
