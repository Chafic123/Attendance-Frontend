import "../../CSS/InstructorCard.css";
import { Icon } from "@mui/material";
import PropTypes from "prop-types";
import { useRef, useState } from "react";

export default function InstructorCard({ instructor, setEditedInstructor }) {
  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
  const dropdownRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  // Extract instructor details
  const firstName = instructor?.first_name || "Unknown";
  const lastName = instructor?.last_name || "";
  const department = instructor?.instructor?.department?.name || "N/A";
  const id = instructor?.instructor?.id || "N/A";

  return (
    <div style={{ position: "relative" }} className="Instructor-card">
      <div className="Instructor-details">
        <img
          src={instructor.instructor.image ? instructor.instructor.image : "../../Images/Profile Icon BG.png"}
          alt="Instructor"
          style={{ width: "4vw", height: "4vw", borderRadius: "50%" }}
        />
        <div className="Instructor-text">
          <p className="Instructor-name">{`${firstName} ${lastName}`}</p>
          <p className="Instructor-Department">{department}</p>
          <p className="Instructor-email">{instructor.email}</p>
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
                  setEditedInstructor(instructor);
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

InstructorCard.propTypes = {
  instructor: PropTypes.object.isRequired, // Expecting the whole instructor object
  setEditedInstructor: PropTypes.func.isRequired,
};
