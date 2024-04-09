
import React, { useState, useEffect } from "react";
import { useGlobalContext } from './../GlobalContext';
import { useNavigate } from 'react-router-dom';
import NavbarTeacher from "./NavbarTeacher";
import Forbidden from "./Forbidden";



import './Profile.css';

export default function AllStudentProfiles() {
    const [studentProfiles, setStudentProfiles] = useState([]);
    const { token, role, userId } = useGlobalContext();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        const fetchStudentProfiles = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8080/api/profile/get', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch student profiles");
                }
                const profiles = await response.json();
                // Filter out only student profiles
                const studentProfiles = profiles.filter(profile => profile.role === 'student');
                setStudentProfiles(studentProfiles);
            } catch (error) {
                console.error("Error fetching student profiles:", error);
            }
            finally {
                setLoading(false);
            }
        };
        if (token && userId && role==='teacher') {
            console.log(token)
            fetchStudentProfiles();
        }

    }, [token, role, userId]);

    if (!token || !userId || role === 'student') {
        return <Forbidden />;
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
                {
                    studentProfiles ? (
                <div className="profileDisplay">
                    <div className="Headings">
                        <span className="SubHeading"><b>All Student Profiles</b></span>
                    </div>
                    <hr />
            
                        <div>
                            {studentProfiles.map((profile) => (
                                <div className="tabElements" key={profile.id}>
            
                                    <span className="tds"><strong>Name:</strong> {profile.fullName}</span>
                                    <span className="tds"><strong>Email: </strong> {profile.email}</span>
                                </div>
                            ))}
                        </div>
                </div>
                ) : (
                    <div className="popup">Loading profile data...</div>
                )}
            </div>
            )}
        </>
    );
}
