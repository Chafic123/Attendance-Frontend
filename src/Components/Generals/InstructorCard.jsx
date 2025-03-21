import "../../CSS/InstructorCard.css";
import { Icon } from "@mui/material";
import PropTypes from "prop-types";

export default function InstructorCard({ user, firstName, lastName, department, id }) {
  return (
    <div className="Instructor-card">
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
      {user === "Admin" && <Icon>more_vert</Icon>}
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
