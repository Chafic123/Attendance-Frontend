import { useEffect } from "react";
import Calender from "../Generals/CalenderForm";
import PropTypes from "prop-types";
import StudentProfile from "./StudentProfile";
import StudentNotifications from "./StudentNotifications";
import "../../CSS/SIPanel.css";
import "../../CSS/SICalender.css";
import "../../CSS/SI.css";
import "../../CSS/Profile.css";

export default function StudentPanel({ title, viewPanel }) {
  const isIphone14ProMax = window.matchMedia("(max-width: 431px) and (height: 932px)").matches;

  // Function to show the panel again when switching back from iPhone
  useEffect(() => {
    const checkScreenSize = () => {
      const panelContainer = document.querySelector(".panel-container");
      const panelContent = document.querySelector(".panel-content");
      const profileHolder = document.querySelector(".profile-holder");

      if (panelContainer && panelContent && profileHolder) {
        if (!window.matchMedia("(max-width: 431px) and (height: 932px)").matches) {
          panelContainer.style.zIndex = "auto";
          panelContent.style.display = "flex";
        }
      }
    };

    checkScreenSize(); // Run on load
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Function to hide the panel when closing
  const hidePanel = () => {
    const profile = document.querySelector(".profile-holder");
    const panelContainer = document.querySelector(".panel-container");
    const panelContent = document.querySelector(".panel-content");

    if (profile && panelContainer && panelContent) {
      profile.style.display = "none"; // Hide profile content
      panelContainer.style.zIndex = "-1000"; // Hide panel for iPhone
      console.log("Panel hidden");
    }
  };

  return title === "View Schedule" ? null : (
    <div className="panel-container">
      <div className="panel-content">
        <div className="custom-calendar-wrapper">
          <Calender />
        </div>
        <StudentNotifications />
      </div>
      <div className="profile-holder">
        <StudentProfile />
      </div>

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
  );
}

StudentPanel.propTypes = {
  title: PropTypes.string.isRequired,
  viewPanel: PropTypes.func.isRequired,
};
