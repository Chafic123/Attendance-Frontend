import { useEffect } from "react";
import Calender from "../Generals/CalenderForm";
import PropTypes from "prop-types";
import StudentProfile from "./StudentProfile";
import "../../CSS/SIPanel.css";
import "../../CSS/SICalender.css";
import "../../CSS/SI.css";
import "../../CSS/Profile.css";
import { useState } from "react";
import StudentRequestCorrection from "./StudentRequestCorrection";

export default function StudentPanel({ notificationDate,title, viewPanel,refreshProfile }) {

  const [requestCorrectionState,setRequestCorrectionState] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  // show the panel again when switching back from iPhone
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

    checkScreenSize(); 
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);
  // useEffect  (()=>{
  //   console.log(requestCorrectionState)
  // },requestCorrectionState)

  // hide the panel when closing
  const hidePanel = () => {
    const profile = document.querySelector(".profile-holder");
    const panelContainer = document.querySelector(".panel-container");
    const panelContent = document.querySelector(".panel-content");

    if (profile && panelContainer && panelContent) {
      profile.style.display = "none"; 
      panelContainer.style.zIndex = "-1000"; 
    }
  };

  return title === "View Schedule" ? null : (
    <div className="panel-container">
      <div className="panel-content">
        <Calender
          notificationDate={notificationDate}
          selectedDashboardItem={title}
          setSelectedAttendance={setSelectedAttendance}
          setRequestCorrectionState={setRequestCorrectionState}
        />
  
        {title === "View Courses" && (
          <StudentRequestCorrection
            selectedAttendance={selectedAttendance}
            requestCorrectionState={requestCorrectionState}
          />
        )}
      </div>
  
      <div className="profile-holder">
        <StudentProfile viewPanel={viewPanel} refreshProfile={refreshProfile} />
      </div>
  
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
  viewPanel: PropTypes.func.isRequired,
  refreshProfile: PropTypes.func.isRequired,
};
