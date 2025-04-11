import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { Icon } from "@mui/material";
import { useStudent } from "../../Contexts/getClickedStudentID";
import { useCourse } from "../../Contexts/CourseContext";
import { removeCourseStudent } from "../../ApiService/AdminStudentService";
import { removeStudent } from "../../ApiService/AdminStudentService";
export default function StudentCard({ setStudents, setOnDelete, student, setEditedStudent, hideIcon, setActiveStudent, handleStudentDoubleClick, activeCardId, setActiveCardId, }) {
  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
  const { setStudentId } = useStudent();
  const { courseId } = useCourse();

  const [isHovered, setIsHovered] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [noSuccessMessage, setNoSuccessMessage] = useState("");

  const handleStudentClick = (id) => {
    console.log(id)
    setStudentId(id);
    setActiveCardId(id);
    if (userRole !== "admin") {
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


  const handleDeleteStudent = async (studentId, courseId = null) => {
    try {
      let response;

      if (courseId) {
        response = await removeCourseStudent(courseId, studentId);
      } else {
        response = await removeStudent(studentId);
      }

      if (response.success) {
        setSuccessMessage('Student Removed Successfully!');
        setTimeout(() => {
          setOnDelete(true);

        }, 2000);
      } else {
        setNoSuccessMessage(response.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error during deletion:', error);
      setNoSuccessMessage('An error occurred while deleting the student.');
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (userRole === 'admin') {
          handleStudentClick(student.id);
        } else {
          handleStudentClick(student.student_id);
        }
      }}
      onDoubleClick={() => handleStudentDoubleClick(student.id, `${firstName} ${lastName}`, studentId)}
      className={`student-card ${activeCardId === (userRole === "admin" ? student.id : student.student_id) ? "active" : ""
        }`}
      style={{ position: "relative", cursor: "pointer" }}
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
      {(userRole?.toLowerCase() === "instructor" || userRole?.toLowerCase() === "admin") &&
  (student.attendance_percentage !== undefined || student.absence_percentage !== undefined) && (
    <div>
      {userRole?.toLowerCase() === "instructor" ? (
        <div className="studentPercentageContainer">
          <p className="attendancePercentage">{`${student.absence_percentage }`}%</p>{/* || student.absence_percentage */}
          <span>Absence</span>
        </div>
      ) : (
        <>
          {!isHovered ? (
            <div className="studentPercentageContainer">
              <p className="attendancePercentage">{`${student.attendance_percentage || student.absence_percentage}`}%</p>
              <span>Absence</span>
            </div>
          ) : (
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
                      handleDeleteStudent(student.id, courseId);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )}



      {userRole === "admin" && !(
        student.attendance_percentage !== undefined || student.absence_percentage !== undefined
      ) && (
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
                  jsx
                  Copy
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(false);
                    setEditedStudent(student);
                    
                    const isMobile = window.matchMedia(
                      '(max-width: 431px) and (max-height: 932px), ' +
                      '(max-width: 413px) and (max-height: 916px)'
                    ).matches;
                    
                    if (isMobile) {
                      const adminPanel = document.querySelector(".AdminPanelParent");
                      if (adminPanel) {
                        adminPanel.style.display = "block";
                        adminPanel.style.zIndex = "1000";
                      }
                    }
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
                    handleDeleteStudent(student.id, courseId);

                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </>
        )}
      {successMessage && (
        <div className="popup-container">
          <div className="popup-message" style={{ backgroundColor: 'white', color: "#543381", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "2px" }}>
            <p style={{ color: "#543381" }}>{successMessage}</p>
            <button style={{ width: "100px" }} onClick={() => setSuccessMessage("")} className="popup-close-btn">Close</button>
          </div>
        </div>
      )}

      {noSuccessMessage && (
        <div className="popup-container">
          <div className="popup-message" style={{ backgroundColor: 'white', color: 'red' }}>
            <p style={{ color: "red" }}>{noSuccessMessage}</p>
            <button onClick={() => setNoSuccessMessage("")} className="popup-close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

StudentCard.propTypes = {
  student: PropTypes.object.isRequired,
  setEditedStudent: PropTypes.func,
  hideIcon: PropTypes.bool,
};
