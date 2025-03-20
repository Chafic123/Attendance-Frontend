import "../../CSS/ProfileTop.css";
import { useEffect, useState } from "react";

export default function ProfileTop({ viewProfile, student }) {

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
