import { useState, useEffect, useCallback } from "react";
import Dashboard from "../Components/Generals/Dashboard";
import ProfileTop from "../Components/Generals/ProfileTop";
import Logo from "../Components/Generals/Logo";
import StudentWholeContent from "../Components/Student/StudentWholeContent";
import "../CSS/SI.css";
import { getStudentDetails } from "../ApiService/ProfileService";
export default function Student({refreshProfile,user}) {
  const [selectedText, setSelectedText] = useState(null);
  const [isIphone14ProMax, setIsIphone14ProMax] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 431px) and (max-height: 932px)");
    const isIphone = /iPhone/.test(navigator.userAgent) && !window.MSStream;

    const checkDevice = () => {
      setIsIphone14ProMax(isIphone && mediaQuery.matches);
    };

    checkDevice();
    mediaQuery.addEventListener("change", checkDevice);
    window.addEventListener("resize", checkDevice);

    return () => {
      mediaQuery.removeEventListener("change", checkDevice);
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  const viewPanel = useCallback(() => {
    document.querySelector(".profile-holder")?.style.setProperty("display", "none");
    document.querySelector(".panel-content")?.style.setProperty("display", "flex");
    document.querySelector(".go-back-icon")?.style.setProperty("display", "none");
  }, []);

  const viewProfile = useCallback(() => {
    const profile = document.querySelector(".profile-holder");
    const panelContent = document.querySelector(".panel-content");
    const goBackIcon = document.querySelector(".go-back-icon");
    const panelContainer = document.querySelector(".panel-container");

    if (profile && panelContent && goBackIcon && panelContainer) {
      if (isIphone14ProMax) {
        panelContainer.style.zIndex = "1000";
        panelContent.style.display = "none";
        profile.style.display = "flex";
        goBackIcon.style.display = "none";
      } else {
        panelContent.style.display = "none";
        profile.style.display = "flex";
        goBackIcon.style.display = "flex";
      }
    }
  }, [isIphone14ProMax]);

  const viewPanelIphone = useCallback(() => {
    if (isIphone14ProMax) {
      const panelContainer = document.querySelector(".panel-container");
      const panelContent = document.querySelector(".panel-content");
  
      if (panelContainer && panelContent) {
        panelContainer.style.zIndex = "1000";
        panelContent.style.display = "flex";
      } else {
        console.warn("Panel elements not found in the DOM");
      }
    }
  }, [isIphone14ProMax]);
  
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
        viewProfile={viewProfile}
        selectedDashboardITem={selectedText}
        selectedAddItem={selectedText}
      />
    </div>
  );
}
