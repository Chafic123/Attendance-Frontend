import StudentMainContent from "./StudentMainContent";
import StudentPanel from "./StudentPanel";
import PropTypes from 'prop-types';
import "../../CSS/SIWholeContent.css";
import { useEffect, useState } from "react";
export default function StudentWholeContent({ isNotificationStatusChanged,setIsNotificationStatusChanged,setSelectedText, selectedDashboardITem, viewProfile, viewPanel, viewPanelIphone,refreshProfile }) {
  const [notificationDate, setNotificationDate] = useState();
  useEffect(()=>{
    console.log("notificationDate: ", notificationDate)
  },[notificationDate])
  return (
    <div className="whole-content-container">
      <StudentMainContent setNotificationDate={setNotificationDate} isNotificationStatusChanged={isNotificationStatusChanged} setIsNotificationStatusChanged={setIsNotificationStatusChanged}  viewPanelIphone = {viewPanelIphone} viewProfile={viewProfile} selectedDashboardITem={selectedDashboardITem} />
      <StudentPanel notificationDate={notificationDate} refreshProfile={refreshProfile} viewPanel={viewPanel} title= {selectedDashboardITem} />
    </div>
  );
}

StudentWholeContent.propTypes = {
  viewPanel: PropTypes.func.isRequired,
  viewPanelIphone: PropTypes.func.isRequired,
  refreshProfile: PropTypes.func.isRequired,
};
