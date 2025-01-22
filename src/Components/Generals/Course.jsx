import { Icon } from "@mui/material";
import PropTypes from 'prop-types';
import "../../CSS/Course.css"

export default function Course( props ) {

  return (
    <div className="course" >
      <div className="courseDetails">
        <div className="courseBorder"></div>
        <div className="courseText">
          <p className = "courseCode">GRDS424</p>
          <p className = "courseName">Web and Interactive Design</p>
          <p className = "courseInstructor">Myriam Chamoon</p>
        </div>
      </div>
      {props.user === "Admin" ? (<Icon>more_vert</Icon>) : null}
    </div>
  );
}

Course.propTypes = {
  user: PropTypes.string.isRequired,
};
