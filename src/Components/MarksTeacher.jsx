import React, { useState, useEffect } from "react";
import NavbarTeacher from "./NavbarTeacher";
import Forbidden from "./Forbidden";
import { useGlobalContext } from './../GlobalContext';
import { useNavigate } from 'react-router-dom';


import './Profile.css';
import './popup.css';

export default function MarksTeacher() {
    const [marks, setMarks] = useState([]);
    const {token, role, userId} = useGlobalContext();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleMarksClick = (mark) =>{
        navigate(`/editmarks/${mark.userId}`);
    }

    useEffect(() => {
        const fetchMarks = async () => {
            setLoading(true);
            try {
                // Make the API call to fetch marks data
                const response = await fetch(`http://localhost:8080/api/student/marks/get`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch marks data");
                }
                const data = await response.json();
                // Set the marks data in state
                setMarks(data);
            } catch (error) {
                console.error("Error fetching marks:", error);
                alert("Failed to fetch marks data: ", error);
            }
            finally {
                setLoading(false);
            }
        };
        if (token && userId && role==='teacher') {
            fetchMarks();
        }
    }, [token, role, userId])   ;
    
        
    
        if (!token || !userId || role==='student') {
            // Redirect or show error message if token or userId is missing
            return <Forbidden />;
        }

    return (
        <>
            <NavbarTeacher />
            {loading ? (<div className="popup"><h1>Loading</h1></div>):(            
                <div className="profileDisplay">
                <div className="Headings">
                    <span className="SubHeading"><b>Marks</b></span>
                </div>
                <hr />
                {/* Map through marks array and render each mark */}
                <div className="marksView">
                    {marks.map((mark) => (
                        <div key={mark.id}>
                            <p><strong>Roll Number:</strong> {mark.rollNumber} <strong>Subject:</strong> {mark.subject } <strong>Marks:</strong> {mark.marks} <a className="marksEdit" onClick={() => handleMarksClick(mark)}>Edit</a></p>
                        </div>
                    ))}
                </div>
            </div>
            )}
        </>
    );
}
