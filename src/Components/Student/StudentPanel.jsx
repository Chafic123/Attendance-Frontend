import Calender from "../Generals/CalenderForm";
import PropTypes from "prop-types";
import StudentSchedule from "./StudentSchedule";
import StudentProfile from "./StudentProfile";
import "../../CSS/SIPanel.css";
import StudentNotifications from "./StudentNotifications";
import "../../CSS/SICalender.css";
import "../../CSS/SI.css";
import "../../CSS/Profile.css";

export default function StudentPanel({ title, viewPanel }) {
  const hideProfile = () => {
    const profile = document.querySelector('.profile-holder'); 
    const panleContainer = document.querySelector('.panel-container'); 
    if(profile && panleContainer){
      profile.style.display = "none";
      panleContainer.style.zIndex = '-1';
      console.log("Panel hidden");

    }
  };

  return (
    <div className="panel-container">
      {
        title === "View Courses" ? (
          <div>
            <div className="panel-content">
              <div className="custom-calendar-wrapper">
                <Calender />
              </div>
              <StudentNotifications />
            </div>
            <div className="profile-holder">
              <StudentProfile />
            </div>
          </div>
        ) : title === "View Schedule" ? (
          <div>
            <div className="panel-content">
              <StudentSchedule />
            </div>
            <div className="profile-holder">
              <StudentProfile />
            </div>
          </div>
        ) : title === "View Notifications" ? (
          <div>
            <div className="panel-content">
              <div className="custom-calendar-wrapper">
                <Calender />
              </div>
              <StudentNotifications />
            </div>
            <div className="profile-holder">
              <StudentProfile />
            </div>
          </div>
        ) : (
          null
        )
      }
      <img
        src="../public/Images/go-back-icon.png"
        className="go-back-icon"
        onClick={viewPanel}
        alt="Go back"
      />
      <img
        src="../public/Images/X-Icon.png"
        className="x-icon"
        onClick={hideProfile}
        alt="Close panel"
      />
    </div>
  );
}

StudentPanel.propTypes = {
  title: PropTypes.string.isRequired,
  viewPanel: PropTypes.func.isRequired,
};
