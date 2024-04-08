import React, { useEffect, useState } from "react";
import { useGlobalContext } from './../GlobalContext';
import NavbarStudent from "./NavbarStudent";
import NavbarTeacher from "./NavbarTeacher";
import Forbidden from "./Forbidden";

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
        return <div className="popup">Loading...</div>;
    }
    return (
        <>
            {role === "student" ? <NavbarStudent /> : <NavbarTeacher />}
            <div className="Profile">
                {role === "student" ? 
                <div className="profileDisplay">
                <h1>Profile</h1>
                <hr></hr>
                <p><strong>Name:</strong> {profileData.name}</p>
                <p><strong>Email:</strong> {profileData.email}</p>

                </div>
                :<div className="profileDisplay"></div>}
            </div>
        </>
    );
}

// Functions to fetch profile data based on user's role
async function fetchStudentMainProfile(userId, token) {
    const response = await fetch(`http://localhost:8080/api/profile/get/${userId}`, {
        headers: {
            Authorization: `${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch student main profile');
    }
    console.log(response);
    return await response.json();
}

async function fetchStudentProfile(userId, token) {
    const response = await fetch(`http://localhost:8080/api/student/profile/get/${userId}`, {
        headers: {
            Authorization: `${token}`
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
            Authorization: `${token}`
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
            Authorization: `${token}`
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
            Authorization: `${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch teacher profile');
    }
    return await response.json();
}

