import "../../CSS/StudentCard.css";
import { Icon } from "@mui/material";
import PropTypes from "prop-types";

export default function StudentCard({ user, firstName, lastName, major, studentId, image }) {
  return (
    <div className="student-card">
      <div className="student-details">
        <img
          src={`data:image/jpeg;base64,${image}`}
          alt="Student"
          style={{ width: "5vw", height: "5vw", borderRadius: "50%" }}
        />
        <div className="student-text">
          <p className="student-name">{`${firstName} ${lastName}`}</p>
          <p className="student-major">{major || "N/A"}</p>
          <p className="student-id">{studentId || "N/A"}</p>
        </div>
      </div>
      {user === "Admin" && <Icon>more_vert</Icon>}
    </div>
  );
}

StudentCard.propTypes = {
  user: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  major: PropTypes.string.isRequired,
  studentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string,
};
