import Calender from "../Generals/CalenderForm";
import PropTypes from "prop-types";
import InstructorSchedule from "./InstructorSchedule"
import InstructorProfile from "./InstructorProfile"
import "../../CSS/SICalender.css";
import "../../CSS/SI.css"
import "../../CSS/Profile.css"
import InstructorRequests from "./InstructorRequests";
import InstructorNotifications from "./InstructorNotification";
export default function InstructorPanel(prop) {

  const hidePanel = () => {
    const profile = document.querySelector(".profile-holder");
    const panelContainer = document.querySelector(".panel-container");
    const panelContent = document.querySelector(".panel-content");

    if (profile && panelContainer && panelContent) {
      profile.style.display = "none"; 
      panelContainer.style.zIndex = "-1000"; 
    }
  };
  return (
    <div className="panel-container">
      {
        prop.title === "View Courses" ? (
          <div>
            <div className="panel-content">
              <div className="custom-calendar-wrapper">
                <Calender selectedDashboardItem={prop.selectedDashboardItem} />
              </div>
              <InstructorNotifications  setActiveStudent={prop.setActiveStudent} selectedCourseID={prop.selectedCourseID} selectedStudent={prop.selectedStudent} />
            </div>
            <div className="profile-holder">
              <InstructorProfile viewPanel={prop.viewPanel} refreshProfile={prop.refreshProfile} />
            </div>
          </div>
        ) : prop.title === "View Schedule" ? (
          <div>
            <div className="panel-content">
              <InstructorSchedule />
            </div>
            <div className="profile-holder">
              <InstructorProfile viewPanel={prop.viewPanel} refreshProfile={prop.refreshProfile} />
            </div>
          </div>
        ) : prop.title === "View Requests" ? (
          <div>
            <div className="panel-content">
              <div className="custom-calendar-wrapper">
                <Calender requestDate={prop.requestDate} selectedDashboardItem={prop.selectedDashboardItem} />
              </div>
              <InstructorRequests setIsRequestStatusChanged={prop.setIsRequestStatusChanged} isRequestStatusChanged={prop.isRequestStatusChanged} />
            </div>
            <div className="profile-holder">
              <InstructorProfile  viewPanel={prop.viewPanel} refreshProfile={prop.refreshProfile} />
            </div>
          </div>

        ) : (
          null
          // <div>
          //   <div className="panel-content">
          //     <div className="custom-calendar-wrapper">
          //       <Calender selectedDashboardITem={prop.selectedDashboardITem} />
          //     </div>
          //     <InstructorNotifications selectedCourseID={prop.selectedCourseID} selectedStudent={prop.selectedStudent} />
          //   </div>
          //   <div className="profile-holder">
          //     <InstructorProfile refreshProfile={prop.refreshProfile} />
          //   </div>
          // </div>
        )
      }
      <img src="../public/Images/X-Icon.png" className="x-icon" onClick={hidePanel} alt="cancel icon" />

    </div>
  );
}

InstructorPanel.propTypes = {
  title: PropTypes.string,
};