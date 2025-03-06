import { useEffect } from "react";
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
  const hidePanel = () => {
    // Access DOM elements inside the function
    const profile = document.querySelector('.profile-holder');
    const panelContainer = document.querySelector('.panel-container');
    const panelContent = document.querySelector(".panel-content");


    if (profile && panelContainer && panelContent) {
      profile.style.display = "none"; // Hide profile content
      panelContainer.style.zIndex = '-1000'; // Reset z-index for desktop
      console.log("Panel hidden");
    }
  };

  // Listen for screen size changes
  useEffect(() => {
    const handleResize = () => {
      const profile = document.querySelector('.profile-holder');
      const panelContainer = document.querySelector('.panel-container');
      const panelContent = document.querySelector(".panel-content");
      const goBackIcon = document.querySelector('.go-back-icon');

      if (profile && panelContainer && panelContent) {
        const isIphone14ProMax = window.matchMedia('(max-width: 430px) and (max-height: 932px)').matches;

        if (isIphone14ProMax) {
          // Hide panel and content on iPhone by default
          panelContainer.style.zIndex = '-1';
          panelContent.style.display = 'none';
          goBackIcon.style.display = 'none';
          profile.style.display = 'none'; // Hide profile content on iPhone
        } else {
          // Show panel and content on desktop
          panelContainer.style.zIndex = 'auto';
          panelContent.style.display = 'flex';
        }
      }
    };

    // Add event listener for screen size changes
    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    title === "View Schedule" ? null : (
      <div className="panel-container">
        {title === "View Courses" ? (
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
        )}
        <img
          src="../public/Images/go-back-icon.png"
          className="go-back-icon"

          onClick={viewPanel}
          alt="Go back"
        />

        <img
          src="../public/Images/X-Icon.png"
          className="x-icon"
          onClick={hidePanel}
          alt="Close panel"
        />
      </div>
    )
  );
}
StudentPanel.propTypes = {
  title: PropTypes.string.isRequired,
  viewPanel: PropTypes.func.isRequired,
};