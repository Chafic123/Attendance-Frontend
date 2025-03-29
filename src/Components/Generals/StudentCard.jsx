import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { Icon } from "@mui/material";

export default function StudentCard({ student, setEditedStudent }) {
  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

  const dropdownRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  const firstName = student.first_name || student.user?.first_name || "N/A";
  const lastName = student.last_name || student.user?.last_name || "N/A";
  const studentId = userRole === "admin"
    ? student.student_id || "N/A"
    : student.Uni_id || "N/A";

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
    <div className="student-card" style={{ position: "relative" }} ref={dropdownRef}>
      <div className="student-details">
        <img
          src={student.image ? `data:image/jpeg;base64,${student.image}` : "/default-avatar.png"}
          alt="Student"
          style={{ width: "5vw", height: "5vw", borderRadius: "50%" }}
        />
        <div className="student-text">
          <p className="student-name">{`${firstName} ${lastName}`}</p>
          <p className="student-major">{student.major || "N/A"}</p>
          <p className="student-id">{studentId}</p>
        </div>
      </div>

      {userRole === "admin" && (
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
                  // Add delete logic here if needed
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
};
