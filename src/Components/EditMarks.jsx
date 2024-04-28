import React, { useState, useEffect } from "react";
import { useGlobalContext } from './../GlobalContext';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavbarTeacher from "./NavbarTeacher";
import Forbidden from "./Forbidden";
import './SignUpR.css';
import './LoginBox.css';

export default function EditMarks() {
    const { globId } = useParams();
    const { token, role, userId } = useGlobalContext();
    const [marks, setMarks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updatedMarks, setUpdatedMarks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMarks = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://adorable-forgiveness-production.up.railway.app/api/student/marks/get/${globId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch marks data");
                }
                const data = await response.json();
                setMarks(data);
                // Initialize updatedMarks with the same data as marks
                setUpdatedMarks(data.map(mark => ({ ...mark })));
            } catch (error) {
                console.error("Error fetching marks:", error);
                alert("Failed to fetch marks data");
            } finally {
                setLoading(false);
            }
        };

        if (token && userId && role === 'teacher') {
            fetchMarks();
        }
    }, [token, role, userId]);

    const handleMarkChange = (id, value) => {
        // Update the marks in the updatedMarks state
        setUpdatedMarks(updatedMarks.map(mark =>
            mark.id === id ? { ...mark, marks: value } : mark
        ));
    };

    const sendUpdateRequest = async (globId) => {
        try {
            const response = await fetch(`http://adorable-forgiveness-production.up.railway.app/api/student/marks/update/${globId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedMarks)
            });
            if (!response.ok) {
                throw new Error("Failed to update marks");
            }
            alert("Marks successfully updated");
            navigate("/marksteacher");
        } catch (error) {
            console.error("Error updating marks:", error);
            alert("Failed to update marks. Please try again.");
        } finally {
            setLoading(false);
        }
    };

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
                <div className="loginBox">
                    <div className="loginFields">
                        {updatedMarks.map((mark) => (
                            <div key={mark.id}>
                                <h1>Editing for Roll Number: {mark.rollNumber}</h1>
                                <hr></hr>
                                <div className="inputBox"> 
                                    <input 
                                        type="text" 
                                        required
                                        value={mark.marks}
                                        onChange={(e) => handleMarkChange(mark.id, e.target.value)} 
                                        id={mark.id} 
                                    />
                                    <label htmlFor={mark.id}><i>{mark.subject}</i></label>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="inputBox" id="submit"> 
                        <button onClick={()=>sendUpdateRequest(globId)}>Update Marks</button>
                    </div>  
                </div>
            )}
        </>
    );
}
