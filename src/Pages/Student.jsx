import { useState, useEffect, useCallback } from "react";
import Dashboard from "../Components/Generals/Dashboard";
import ProfileTop from "../Components/Generals/ProfileTop";
import Logo from "../Components/Generals/Logo";
import StudentWholeContent from "../Components/Student/StudentWholeContent";
import "../CSS/SI.css";
export default function Student({ refreshProfile, user, viewProfile, viewPanel, viewPanelIphone }) {
  const [selectedText, setSelectedText] = useState(null);
  useEffect(() => {
    refreshProfile();
}, []);
  const handleItemClick = (text) => {
    setSelectedText(text);
  };

  const DashboardItems = [
    { imgSrc: "../public/Images/Course-icon.png", altText: "Course Icon", text: "View Courses", id: "course-navigate" },
    { imgSrc: "../public/Images/Schedule-icon.png", altText: "Schedule Icon", text: "View Schedule", id: "Schedule-navigate" },
    { imgSrc: "../public/Images/Notification-icon.png", altText: "Notification Icon", text: "View Notifications", id: "Notification-navigate" },
  ];



  /*To link Student Profile and Profile Top*/


  return (
    <div className="whole-container">
      <ProfileTop refreshProfile={refreshProfile} user={user} viewProfile={viewProfile} />
      <Logo />
      <Dashboard DashboardItems={DashboardItems} onItemClick={handleItemClick} />
      <StudentWholeContent
        refreshProfile={refreshProfile}
        viewPanel={viewPanel}
        viewPanelIphone={viewPanelIphone}
        selectedDashboardITem={selectedText}
        selectedAddItem={selectedText}
      />
    </div>
  );
}
