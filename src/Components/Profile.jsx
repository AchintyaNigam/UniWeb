import React, { useEffect, useState } from "react";
import { useGlobalContext } from './../GlobalContext';
import NavbarStudent from "./NavbarStudent";
import NavbarTeacher from "./NavbarTeacher";
import Forbidden from "./Forbidden";

import EditButton from "./../assets/edit_button.png";

import './Profile.css';

export default function Profile() {
    const { token, role, userId } = useGlobalContext();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            setLoading(true);
            try {
                // Make request based on role
                if (role === "student") {
                    const [mainProfile, studentProfile, address] = await Promise.all([
                        fetchStudentMainProfile(userId, token),
                        fetchStudentProfile(userId, token),
                        fetchStudentAddress(userId, token)
                    ]);
                    
                    setProfileData({ mainProfile, studentProfile, address });
                    console.log(profileData);
                } else if (role === "teacher") {
                    const [mainProfile, teacherProfile] = await Promise.all([
                        fetchTeacherMainProfile(userId, token),
                        fetchTeacherProfile(userId, token)
                    ]);
                    setProfileData({ mainProfile, teacherProfile });
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
                // Handle error, e.g., show error message
            } finally {
                setLoading(false);
            }
        };

        if (token && userId) {
            fetchProfileData();
        }
    }, [token, role, userId]);

    if (!token || !userId) {
        // Redirect or show error message if token or userId is missing
        return <Forbidden />;
    }

    if (loading) {
        // Show loading spinner or message while data is being fetched
        return <div className="popup"><h1>Loading...</h1></div>;
    }
    return (
        <>
            {role === "student" ? <NavbarStudent /> : <NavbarTeacher />}
            <div className="Profile">
            {role === "student" ? (
        profileData ? (
        <div className="profileDisplay">
            <div className="Headings">
                <span className="SubHeading"><b>Profile</b><img src={EditButton}></img></span>

            </div>
            <hr />
            
            <p><strong>Name:</strong> {profileData.mainProfile.fullName}</p>
            <p><strong>Email:</strong> {profileData.mainProfile.email}</p>
            <p><strong>DOB:</strong> {profileData.mainProfile.birthdate}</p>
            <div className="Headings">
                <span className="SubHeading"><b>Student Info</b><img src={EditButton}></img></span>
                
            </div>
            <hr />
            <p><strong>Roll Number:</strong> {profileData.studentProfile.rollNumber}</p>
            <p><strong>Branch:</strong> {profileData.studentProfile.branch}</p>
            <div className="Headings">
                <span className="subHeading"><b>Address</b><img src={EditButton}></img></span>
            </div>
            <hr />
            <p><strong>Street:</strong> {profileData.address.street}</p>
            <p><strong>City:</strong> {profileData.address.city}</p>
            <p><strong>Zip Code:</strong> {profileData.address.zipCode}</p>

            
        </div>
    ) : (
        <div className="popup">Loading profile data...</div>
    )
) : (
    profileData ? (
        <div className="profileDisplay">
            <div className="Headings">
                <span className="SubHeading"><b>Profile</b><img src={EditButton}></img></span>
            </div>
            <hr />
            
            <p><strong>Name:</strong> {profileData.mainProfile.fullName}</p>
            <p><strong>Email:</strong> {profileData.mainProfile.email}</p>
            <p><strong>DOB:</strong> {profileData.mainProfile.birthdate}</p>
            <div className="Headings">
                <span className="SubHeading"><b>Teacher Info</b><img src={EditButton}></img></span>
            </div>
            <hr />
            <p><strong>Department:</strong> {profileData.teacherProfile.department}</p>
            
        </div>
    ) : (
        <div className="popup">Loading profile data...</div>
    )
)}
            </div>
        </>
    );
}

// Functions to fetch profile data based on user's role
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

async function fetchStudentAddress(userId, token) {
    const response = await fetch(`http://localhost:8080/api/student/address/get/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch student address');
    }
    return await response.json();
}

async function fetchTeacherMainProfile(userId, token) {
    const response = await fetch(`http://localhost:8080/api/profile/get/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch teacher main profile');
    }
    return await response.json();
}

async function fetchTeacherProfile(userId, token) {
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

