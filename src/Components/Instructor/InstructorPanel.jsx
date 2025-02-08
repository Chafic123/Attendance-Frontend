import Calender from "../Generals/CalenderForm";
import PropTypes from "prop-types";
import InstructorSchedule from "./InstructorSchedule"
import InstructorProfile from "./InstructorProfile"
import "../../CSS/SICalender.css";
import "../../CSS/SI.css"
import "../../CSS/Profile.css"
import InstructorNotifications from "./InstructorNotifications";
export default function InstructorPanel(props) {
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
          <InstructorProfile />
        ) : props.title === "View Schedule" ? (
          <InstructorSchedule />
        ) : props.title === "View Notifications" ? (
          <div>

            <div className="custom-calendar-wrapper">
              <Calender />
            </div>
            <InstructorNotifications />

          </div>

        ) : (
          null
        )
      }
      <img src="../public/Images/X-Icon.png" className="x-icon" onClick={hideProfile} alt="cancel icon" />
    </div>
  );
}

InstructorPanel.propTypes = {
  title: PropTypes.string,
};