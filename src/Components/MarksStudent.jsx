import React, { useState, useEffect } from "react";
import { useGlobalContext } from './../GlobalContext';

import NavbarStudent from "./NavbarStudent";
import NavbarTeacher from "./NavbarTeacher";
import Forbidden from "./Forbidden";

import './Profile.css';
import './popup.css';

export default function MarksStudent() {
    // State to store the marks data
    const [marks, setMarks] = useState([]);

    const {token, role, userId} = useGlobalContext();
    const [loading, setLoading] = useState(false);

    // Function to fetch marks data from the server
    useEffect(() => {
    const fetchMarks = async () => {
        setLoading(true);
        try {
            // Make the API call to fetch marks data
            const response = await fetch(`http://adorable-forgiveness-production.up.railway.app/api/student/marks/get/${userId}`, {
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
    if (token && userId) {
        fetchMarks();
    }
}, [token, role, userId])   ;

    

    if (!token || !userId) {
        // Redirect or show error message if token or userId is missing
        return <Forbidden />;
    }

    return (
        <>
            {role==="student"? <NavbarStudent /> : <NavbarTeacher />}
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
                            <p><strong>Subject:</strong> {mark.subject } <strong>Marks:</strong> {mark.marks}</p>
                        </div>
                    ))}
                </div>
            </div>
            )}
        </>
    );
}
