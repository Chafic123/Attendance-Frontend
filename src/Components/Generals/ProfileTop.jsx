import "../../CSS/ProfileTop.css";
// import { useEffect, useState } from "react";
import PropTypes from "prop-types";
export default function ProfileTop({ viewProfile, student }) {

    if (!student) return <p>Loading...</p>; 
    
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
};

ProfileTop.propTypes = {
    viewProfile: PropTypes.func.isRequired,
    student: PropTypes.shape({
        user: PropTypes.shape({
            first_name: PropTypes.string.isRequired,
            last_name: PropTypes.string.isRequired,
        }).isRequired,
        student: PropTypes.shape({
            student_id: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

