import "../../CSS/InstructorCard.css";
import { Icon } from "@mui/material";
import PropTypes from 'prop-types';

export default function InstructorCard(props) {
  return (
    <div className="Instructor-card">
      <div className="Instructor-details">
        <img src="../../Images/Student-img.png" alt="Instructor" style={{
          width: "5vw",
          height: "5vw"
        }} />
        <div className="Instructor-text">
          <p className="Instructor-name">Ahmad Hijazi</p>
          <p className="Instructor-title">Professor</p>
          <p className="Instructor-Department">CIS College</p>
        </div>
      </div>
      {props.user === "Admin" ? <Icon>more_vert</Icon> : null}
    </div>
  );
}

InstructorCard.propTypes = {
  user: PropTypes.string.isRequired,
};
