import "../../CSS/StudentCard.css";
import { Icon } from "@mui/material";
import PropTypes from 'prop-types';

export default function StudentCard(props) {
  return (
    <div className="student-card">
      <div className="student-details">
        <img src="../../Images/Student-img.png" alt="Student" style={{
          width: "5vw",
          height: "5vw"
        }} />
        <div className="student-text">
          <p className="student-name">Ahmad Hijazi</p>
          <p className="student-major">Civil Engineering</p>
          <p className="student-id">20210908</p>
        </div>
      </div>
      {props.user === "Admin" ? <Icon>more_vert</Icon> : null}
    </div>
  );
}

StudentCard.propTypes = {
  user: PropTypes.string.isRequired,
};
