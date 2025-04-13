import React, { useEffect, useState } from "react";
import StudentCard from "../Generals/StudentCard";
import "../../CSS/AdminEnrollStudentsPopup.css";
import { getStudents } from "../../ApiService/StudentService";
import { enrollStudents } from "../../ApiService/AdminStudentService";
import AdminFilter from "./AdminFilter";
import { getCourseStudents } from "../../ApiService/CourseService";
import { useCourse } from "../../Contexts/CourseContext";
import { getNonEnrolledStudents } from "../../ApiService/AdminStudentService";
export default function AdminEnrollStudentsPopup({ onClose, studentFilters, onStudentFilterChange, courseStudentID, setCourseStudents }) {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [successMessage, setSuccessMessage] = useState("");
    const [noSuccessMessage, setNoSuccessMessage] = useState("");

    const { courseId } = useCourse();
    
    console.log("Course Student Id: ", courseStudentID)
    useEffect(() => {
        const fetchStudents = async () => {
          console.log("Fetching Students of Course ID:", courseId);
      
          const studentData = await getNonEnrolledStudents(courseId);
          console.log("studentData", studentData);
      
          if (studentData.success) {
            setStudents(studentData.data || []);
          } else {
            console.error("Failed to fetch students:", studentData.message);
            setStudents([]);
          }
      
          setLoading(false);
        };
      
        fetchStudents();
      }, [courseId]);
      
      

    useEffect(() => {
        let updatedStudents = [...students];
        console.log("Updated Students: ", updatedStudents)
        if (studentFilters?.name) {
            updatedStudents = updatedStudents.filter(student =>
                (student.user.first_name + " " + student.user.last_name).toUpperCase().includes(studentFilters.name.toUpperCase())
            );
        }

        if (studentFilters?.studentID) {
            updatedStudents = updatedStudents.filter(student =>
                String(student.Uni_id).includes(studentFilters.studentID) ||
                String(student.student_id).includes(studentFilters.studentID)
            );
        }

        if (studentFilters?.major) {
            updatedStudents = updatedStudents.filter(student =>
                student.major.toUpperCase().includes(studentFilters.major.toUpperCase())
            );
        }

        if (studentFilters?.sort === "asc") {
            updatedStudents.sort((a, b) =>
                (a.user.first_name + " " + a.user.last_name).toLowerCase().localeCompare((b.user.first_name + " " + b.user.last_name).toLowerCase())
            );
        } else if (studentFilters?.sort === "desc") {
            updatedStudents.sort((a, b) =>
                (b.user.first_name + " " + b.user.last_name).toLowerCase().localeCompare((a.user.first_name + " " + a.user.last_name).toLowerCase())
            );
        }

        setFilteredStudents(updatedStudents);
    }, [studentFilters, students]);

    const toggleSelection = (studentId) => {
        setSelectedStudents((prevSelected) =>
            prevSelected.includes(studentId) ? prevSelected.filter(id => id !== studentId) : [...prevSelected, studentId]
        );
    };

    const handleEnroll = async () => {
        try {
            const response = await enrollStudents(selectedStudents, courseStudentID);
            console.log("Enrollment successful:", response);
            setSuccessMessage("Students Enrolled Successfully!");
            const students = await getCourseStudents(courseStudentID);

            setCourseStudents(students);
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (error) {
            console.error("Error enrolling students:", error);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Enroll Students</h2>
                {successMessage && (
                    <div className="popup-container">
                        <div className="popup-message" style={{ backgroundColor: 'white', color: "#543381" }}>
                            <p>{successMessage}</p>
                            <button onClick={() => setSuccessMessage("")} className="popup-close-btn">Close</button>
                        </div>
                    </div>
                )}

                {noSuccessMessage && (
                    <div className="popup-container">
                        <div className="popup-message" style={{ backgroundColor: 'white', color: 'red' }}>
                            <p>{noSuccessMessage}</p>
                            <button onClick={() => setNoSuccessMessage("")} className="popup-close-btn">Close</button>
                        </div>
                    </div>
                )}
                <AdminFilter onStudentFilterChange={onStudentFilterChange} title="StudentFilter" />
                <div className="student-cards-container">
                    {loading ? (
                        <p>Loading Students...</p>
                    ) : filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => (
                            <div
                                key={student.id}
                                className={`student-card-wrapper ${selectedStudents.includes(student.id) ? "active" : ""}`}
                                onClick={() => toggleSelection(student.id)}
                            >
                                <StudentCard student={student} hideIcon={true} />
                            </div>
                        ))
                    ) : (
                        <p>No Students Found.</p>
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
