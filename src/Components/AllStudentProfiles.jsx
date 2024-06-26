import React, { useState, useEffect } from "react";
import { useGlobalContext } from './../GlobalContext';
import { useNavigate } from 'react-router-dom';
import NavbarTeacher from "./NavbarTeacher";
import Forbidden from "./Forbidden";

import './Profile.css';

export default function AllStudentProfiles({backendDomain}) {
    const [studentProfiles, setStudentProfiles] = useState([]);
    const { token, role, userId } = useGlobalContext();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentProfiles = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://${backendDomain}/api/student/profile/get`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch student profiles");
                }
                const profiles = await response.json();
                
                setStudentProfiles(profiles);
            } catch (error) {
                console.error("Error fetching student profiles:", error);
            } finally {
                setLoading(false);
            }
        };
        if (token && userId && role === 'teacher') {
            fetchStudentProfiles();
        }
    }, [token, role, userId]);

    if (!token || !userId || role === 'student') {
        return <Forbidden />;
    }

    const handleMore = (uId) => {
        navigate(`/studentexpanded/${uId}`);
    }

    return (
        <>
            <NavbarTeacher />
            {loading ? (
                <div className="popup">
                    <h1>Loading</h1>
                </div>
            ) : (
                    <div className="Profile">
                        {studentProfiles.length > 0 ? (
                            <div className="profileDisplay">
                                <div className="Headings">
                                    <span className="SubHeading"><b>All Student Profiles</b></span>
                                </div>
                                <hr />
                                <div>
                                    {studentProfiles.map((profile) => (
                                        <div className="tabElements" key={profile.id}>
                                            <span className="tds"><strong>Role Number:</strong> {profile.rollNumber}</span>
                                            <span className="tds"><strong>Branch:</strong> {profile.branch}</span>
                                            <a className="moreLinks" onClick={()=>handleMore(profile.userId)}>More</a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                                <div className="popup">No student profiles available</div>
                            )}
                    </div>
                )}
        </>
    );
}
