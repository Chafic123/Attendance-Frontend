import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { Icon } from "@mui/material";
import { useStudent } from "../../Contexts/getClickedStudentID";
import { useCourse } from "../../Contexts/CourseContext";
import { removeCourseStudent } from "../../ApiService/AdminStudentService";

export default function StudentCard({ student, setEditedStudent, hideIcon, setActiveStudent, handleStudentDoubleClick }) {
  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
  const { setStudentId } = useStudent();
  const { courseId } = useCourse();

  const handleStudentClick = (id) => {
    setStudentId(id);
    if (userRole != "admin") {
      setActiveStudent(student);
    }
  };

  const dropdownRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  const firstName = student.first_name || student.user?.first_name || "N/A";
  const lastName = student.last_name || student.user?.last_name || "N/A";
  const studentId = userRole === "admin"
    ? student.student_id || "N/A"
    : student.Uni_id || "N/A";


  const handleDeleteStudent = async (studentId) => {
    const result = await removeCourseStudent(courseId, studentId);
    if (result.success) {
      alert("Student removed from course successfully.");
    } else {
      alert(result.message || "Failed to remove student.");
    }
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      onClick={() => handleStudentClick(student.student_id)}
      onDoubleClick={() => handleStudentDoubleClick(student.id)}
      className={`student-card`}
      style={{ position: "relative" }}
      ref={dropdownRef}
    >
      <div className="student-details">
        <img
          src={student.image ? student.image : "../../Images/Profile Icon BG.png"} alt="Student"
          style={{ width: "4vw", height: "4vw", borderRadius: "50%" }}
        />
        <div className="student-text">
          <p className="student-name">{`${firstName} ${lastName}`}</p>
          <p className="student-major">{student.major || "N/A"}</p>
          <p className="student-id">{studentId}</p>
        </div>
      </div>
      {userRole?.toLowerCase() === "instructor" && student.attendance_percentage !== undefined && (
        <div className="studentPercentageContainer">
          <p className="attendancePercentage">{`${student.attendance_percentage}`}</p>
          <span>Attendance</span>
          <span>Percentage</span>
        </div>
      )}
      {userRole === "admin" && !hideIcon && (
        <>
          <Icon onClick={() => setShowMenu((prev) => !prev)} style={{ cursor: "pointer" }}>
            more_vert
          </Icon>

          {showMenu && (
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "0",
                background: "#fff",
                padding: "5px",
                zIndex: 100,
                minWidth: "120px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            >
              <button
                style={{
                  width: "100%",
                  background: "#f0f0f0",
                  border: "none",
                  padding: "8px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginBottom: "5px",
                  fontWeight: "500",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                  setEditedStudent(student);
                }}
              >
                Edit
              </button>

              <button
                style={{
                  width: "100%",
                  background: "#ffe5e5",
                  border: "none",
                  padding: "8px",
                  borderRadius: "5px",
                  color: "#c62828",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                  handleDeleteStudent(student.id);  

                }}
              >
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

StudentCard.propTypes = {
  student: PropTypes.object.isRequired,
  setEditedStudent: PropTypes.func,
  hideIcon: PropTypes.bool,
};
