import React, { useEffect, useState } from "react";
import { useGlobalContext } from './../GlobalContext';
import { useParams, useNavigate } from 'react-router-dom';

import NavbarAdmin from "./NavbarAdmin";
import Forbidden from "./Forbidden";

import EditButton from "./../assets/edit_button.png";

import './Profile.css';

export default function TeacherExpandedAdmin({ backendDomain }) {
    const { globId } = useParams();
    const { token, role, userId } = useGlobalContext();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [profileNotFound, setProfileNotFound] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            setLoading(true);
            setProfileNotFound(false);
            try {
                const [mainProfile, teacherProfile] = await Promise.all([
                    fetchTeacherMainProfile(globId, token, backendDomain),
                    fetchTeacherProfile(globId, token, backendDomain),
                ]);

                setProfileData({ mainProfile, teacherProfile });
            } catch (error) {
                if (error.message === 'Profile not found') {
                    setProfileNotFound(true);
                } else {
                    console.error("Error fetching profile data:", error);
                }
            } finally {
                setLoading(false);
            }
        };

        if (token && userId && role === 'admin') {
            fetchProfileData();
        }
    }, [token, role, userId]);

    if (!token || !userId || role !== 'admin') {
        return <Forbidden />;
    }

    if (loading) {
        return <div className="popup"><h1>Loading</h1></div>;
    }

    if (profileNotFound) {
        return <>
                <NavbarAdmin />
                <div className="popup"><h1>Profile not found</h1></div>;
            </>
    }

    const handleEditProfile = (uId) => {
        navigate(`/editprofileadmin/${uId}`);
    }

    const handleEditTeacherProfile = (uId) => {
        navigate(`/editteacherprofileadmin/${uId}`);
    }

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this profile?")) {
            try {
                const response = await deleteTeacherProfile(globId, token, backendDomain);
                if (response.ok) {
                    alert("Profile deleted successfully");
                    navigate("/allteacherprofilesadmin");
                } else {
                    alert("Failed to delete profile");
                }
            } catch (error) {
                console.error("Error deleting profile:", error);
                alert("Error deleting profile");
            }
        }
        navigate("/allstduentprofilesadmin")

    };

    return (
        <>
            <NavbarAdmin />
            <div className="Profile">
                {profileData ? (
                    <div className="profileDisplay">
                        <div className="Headings">
                            <span className="SubHeading"><b>Profile</b><a onClick={() => handleEditProfile(profileData.teacherProfile.userId)}><img src={EditButton} alt="Edit" /></a></span>
                        </div>
                        <hr />
                        <p><strong>Name:</strong> {profileData.mainProfile.fullName}</p>
                        <p><strong>Email:</strong> {profileData.mainProfile.email}</p>
                        <p><strong>DOB:</strong> {profileData.mainProfile.birthdate}</p>
                        <div className="Headings">
                            <span className="SubHeading"><b>Teacher Info</b><a onClick={() => handleEditTeacherProfile(profileData.teacherProfile.userId)}><img src={EditButton} alt="Edit" /></a></span>
                        </div>
                        <hr />
                        <p><strong>Department:</strong> {profileData.teacherProfile.department}</p>
                        <button onClick={handleDelete} className="deleteButton">Delete Profile</button>
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
    if (response.status === 404) {
        throw new Error('Profile not found');
    }
    if (!response.ok) {
        throw new Error('Failed to fetch teacher main profile');
    }
    return await response.json();
}

async function fetchTeacherProfile(userId, token, backendDomain) {
    const response = await fetch(`http://${backendDomain}/api/teacher/profile/get/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (response.status === 404) {
        throw new Error('Profile not found');
    }
    if (!response.ok) {
        throw new Error('Failed to fetch teacher profile');
    }
    return await response.json();
}

async function deleteTeacherProfile(userId, token, backendDomain) {
    const response = await fetch(`http://${backendDomain}/api/profile/delete/${userId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}
