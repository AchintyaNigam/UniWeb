import React, { useState, useEffect } from "react";
import { useGlobalContext } from './../GlobalContext';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from "./NavbarAdmin";
import Forbidden from "./Forbidden";

import './Profile.css';

export default function AllTeacherProfilesAdmin() {
    const [teacherProfiles, setTeacherProfiles] = useState([]);
    const { token, role, userId } = useGlobalContext();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeacherProfiles = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8080/api/teacher/profile/get', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch teacher profiles");
                }
                const profiles = await response.json();
                // Fetch additional details for each student profile
                const profilesWithDetails = await Promise.all(profiles.map(async profile => {
                    const detailResponse = await fetch(`http://localhost:8080/api/profile/get/${profile.userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (!detailResponse.ok) {
                        throw new Error(`Failed to fetch details for profile ${profile.id}`);
                    }
                    const details = await detailResponse.json();
                    return { ...profile, details };
                }));
                setTeacherProfiles(profilesWithDetails);
            } catch (error) {
                console.error("Error fetching Teacher profiles:", error);
            } finally {
                setLoading(false);
            }
        };
        if (token && userId && role === 'admin') {
            fetchTeacherProfiles();
        }
    }, [token, role, userId]);

    if (!token || !userId || role === 'student') {
        return <Forbidden />;
    }

    const handleMore = (uId) => {
        navigate(`/teacherexpandedadmin/${uId}`);
    }

    return (
        <>
            <NavbarAdmin />
            {loading ? (
                <div className="popup">
                    <h1>Loading</h1>
                </div>
            ) : (
                    <div className="Profile">
                        {teacherProfiles.length > 0 ? (
                            <div className="profileDisplay">
                                <div className="Headings">
                                    <span className="SubHeading"><b>All Teacher Profiles</b></span>
                                </div>
                                <hr />
                                <div>
                                    {teacherProfiles.map((profile) => (
                                        <div className="tabElements" key={profile.id}>
                                            <span className="tds"><strong>Department:</strong> {profile.department}</span>
                                            <span className="tds"><strong>Name:</strong> {profile.details.fullName}</span>
                                            <span className="tds"><strong>Email:</strong> {profile.details.email}</span>
                                            <a className="moreLinks" onClick={()=>handleMore(profile.userId)}>More</a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                                <div className="popup">No teacher profiles available</div>
                            )}
                    </div>
                )}
        </>
    );
}
