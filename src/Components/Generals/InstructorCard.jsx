import "../../CSS/InstructorCard.css";
import { Icon } from "@mui/material";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { removeInstructor } from "../../ApiService/AdminInstrucotrService";
import { useEffect } from "react";
export default function InstructorCard({ setOnDelete, instructor, setEditedInstructor, activeInstructorCardId, setActiveInstructorCardId, }) {
  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
  const dropdownRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  // Extract instructor details
  const firstName = instructor?.first_name || "Unknown";
  const lastName = instructor?.last_name || "";
  const department = instructor?.instructor?.department?.name || "N/A";
  const id = instructor?.instructor?.id || "N/A";



  const [successMessage, setSuccessMessage] = useState("");
  const [noSuccessMessage, setNoSuccessMessage] = useState("");

  const handleDeleteInstructor = async (instructorId) => {
    try {
      await removeInstructor(instructorId);
      setOnDelete(true);
      setSuccessMessage("Instructor removed successfully");
    } catch (error) {
      setNoSuccessMessage(`Error: ${error.message}`);
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
      style={{ position: "relative", cursor:"pointer" }}
      className={`Instructor-card ${activeInstructorCardId === instructor.id ? "active" : ""}`}
      onClick={() => setActiveInstructorCardId(instructor.id)}
    >
      {successMessage && (
        <div className="popup-container">
          <div className="popup-message" style={{ backgroundColor: 'white', color: "#543381" }}>
            <p style={{ color: "#543381" }}>{successMessage}</p>
            <button onClick={() => setSuccessMessage("")} className="popup-close-btn">Close</button>
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
              ref={dropdownRef}
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
              className="instr-icon-container"

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
                className="iconEdit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                  setEditedInstructor(instructor);
                  
                  // Check if mobile device (iPhone/S20 Ultra)
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
                className="iconDelete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                  handleDeleteInstructor(instructor.instructor.id);
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
