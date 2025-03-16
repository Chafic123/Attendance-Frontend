import "../../CSS/ProfileTop.css";
import { useEffect, useState } from "react";
import { getStudentDetails } from "../../ApiService/ProfileService";

export default function ProfileTop({ viewProfile }) {
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const data = await getStudentDetails();
                if (data) {
                    setStudent(data);
                }
            } catch (error) {
                console.error("Error fetching student details:", error);
            }
        };

        fetchStudentDetails();
    }, []);

    if (!student) return <p>Loading...</p>;

    return (
        <div className="profileTop-container">
            <div className="student-info">
                <p className="student-name">{`${student.user.first_name} ${student.user.last_name}`}</p>
                <p className="student-id">{student.student.student_id}</p>
            </div>
            <img 
                onClick={viewProfile} 
                src={`http://localhost:8000/${student.student.image}`} 
                className="profile-icon" 
                alt="Student Profile" 
            />
        </div>
    );
}
