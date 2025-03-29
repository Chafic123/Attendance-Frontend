import "../../CSS/InstructorCard.css";
import { Icon } from "@mui/material";
import PropTypes from "prop-types";
import { useRef, useEffect,useState } from "react";
export default function InstructorCard({ user, firstName, lastName, department, id }) {
  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
  const dropdownRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div style={{position:'relative'}} className="Instructor-card">
      <div className="Instructor-details">
        <img
          src="../../Images/Student-img.png"  //Static image 
          alt="Instructor"
          style={{ width: "5vw", height: "5vw" }}
        />
        <div className="Instructor-text">
          <p className="Instructor-name">{`${firstName} ${lastName}`}</p>
          <p className="Instructor-Department">{department || "N/A"}</p>
          <p className="Instructor-id">{id || "N/A"}</p>
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

InstructorCard.propTypes = {
  user: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  title: PropTypes.string,    
  department: PropTypes.string,
  id: PropTypes.string.isRequired,
};
