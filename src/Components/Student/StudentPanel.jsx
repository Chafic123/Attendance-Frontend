import Calender from "../Generals/CalenderForm";
import PropTypes from "prop-types";
import StudentSchedule from "./StudentSchedule"
import StudentProfile from "./StudentProfile"
import "../../CSS/StudentCalender.css";
import "../../CSS/Student.css"
import "../../CSS/StudentProfile.css"
import StudentNotifications from "./StudentNotifications";
export default function StudentPanel(props) {
  const hideProfile = () => {
    const panel = document.querySelector('.panel-container.visible'); // Targeting both classes
    if (panel) {
      panel.classList.remove('visible'); // Remove the 'visible' class
    }
    console.log("Profile hidden");
  };
  
  return (
    <div className="panel-container">
      {
        props.title === "View Courses" ? (
            <StudentProfile />
        ) : props.title === "View Schedule" ? (
            <StudentSchedule />
        ) : props.title === "View Notifications" ? (
          <div>

            <div className="custom-calendar-wrapper">
            <Calender />
            </div>
            <StudentNotifications />

          </div>
          
        ) : (
          null
        )
      }
      <img src="../public/Images/X-Icon.png" className="x-icon" onClick={hideProfile} alt="cancel icon" />
    </div>
  );
}

StudentPanel.propTypes = {
  title: PropTypes.string,
};