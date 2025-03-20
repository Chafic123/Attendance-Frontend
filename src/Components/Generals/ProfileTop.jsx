import "../../CSS/ProfileTop.css";
import { useEffect, useState } from "react";
import { getStudentDetails } from "../../ApiService/ProfileService";

export default function ProfileTop({ viewProfile, student }) {
    // The student data is passed as a prop now.
    // No need to fetch data again here, it will be passed from the parent component.

    if (!student) return <p>Loading...</p>; // Show loading if student data is not yet available

    return (
        <div className="profileTop-container">
            <div className="student-info">
                <p className="student-name">{`${student.user.first_name} ${student.user.last_name}`}</p>
                <p className="student-id">{student.student.student_id}</p>
            </div>

            <img 
                onClick={viewProfile} 
                src={`data:image/jpeg;base64,${student.student.image}`} 
                className="profile-icon" 
                alt="Student Profile" 
            />
        </div>
    );
}
