import React, { useEffect, useState } from "react";
import StudentCard from "../Generals/StudentCard";
import "../../CSS/AdminEnrollStudentsPopup.css";
import { getStudents } from "../../ApiService/StudentService";
import { enrollStudents } from "../../ApiService/AdminStudentService";  // Import the enrollStudents function

export default function AdminEnrollStudentsPopup({ onClose, courseStudentID }) {
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    useEffect(() => {
        const fetchStudents = async () => {
            const studentData = await getStudents();
            setStudents(studentData);
        };

        fetchStudents();
    }, []);

    const toggleSelection = (studentId) => {
        setSelectedStudents((prevSelected) => {
            if (prevSelected.includes(studentId)) {
                return prevSelected.filter(id => id !== studentId);
            } else {
                return [...prevSelected, studentId];
            }
        });
    };

    const handleEnroll = async () => {
        try {
            // Enroll selected students for the course
            const response = await enrollStudents(selectedStudents, courseStudentID);
            console.log("Enrollment successful:", response);
            onClose();  // Close the popup on successful enrollment
        } catch (error) {
            console.error("Error enrolling students:", error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Enroll Students</h2>
                <div className="student-cards-container">
                    {students.length > 0 ? (
                        students.map((student) => (
                            <div
                                key={student.id}
                                className={`student-card-wrapper ${selectedStudents.includes(student.id) ? "active" : ""}`}
                                onClick={() => toggleSelection(student.id)}
                            >
                                <StudentCard
                                    student={student}
                                    hideIcon={true}
                                />
                            </div>
                        ))
                    ) : (
                        <p>Loading Students...</p>
                    )}
                </div>
                <div className="enroll-btn-container">
                    <button onClick={onClose} className="close-btn">Close</button>
                    <button onClick={handleEnroll} className="confirm-enroll-btn">Enroll</button>
                </div>
            </div>
        </div>
    );
}
