import { useState, useEffect } from "react";
import Dashboard from "../Components/Generals/Dashboard";
import ProfileTop from "../Components/Generals/ProfileTop";
import Logo from "../Components/Generals/Logo";
import StudentWholeContent from "../Components/Student/StudentWholeContent";
import "../CSS/SI.css";

export default function Student() {
  const [selectedText, setSelectedText] = useState(null);
  const [isIphone14ProMax, setIsIphone14ProMax] = useState(
    window.matchMedia('(max-width: 430px) and (max-height: 932px)').matches
  );

  // Listen for screen size changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 430px) and (max-height: 932px)');

    const handleResize = (event) => {
      setIsIphone14ProMax(event.matches);
    };

    mediaQuery.addEventListener('change', handleResize);

    // Cleanup listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  const viewPanel = () => {
    // Access DOM elements after they are rendered
    const profile = document.querySelector('.profile-holder');
    const panelContent = document.querySelector('.panel-content');
    const goBackIcon = document.querySelector('.go-back-icon');

    if (profile && panelContent && goBackIcon) {
      console.log("View Panel");
      panelContent.style.display = 'flex'; // Show panel content
      profile.style.display = 'none'; // Hide profile content
      goBackIcon.style.display = 'none'; // Hide go-back icon
    }
  };

  const viewProfile = () => {
    // Access DOM elements after they are rendered
    const profile = document.querySelector('.profile-holder');
    const panelContent = document.querySelector('.panel-content');
    const goBackIcon = document.querySelector('.go-back-icon');
    const panelContainer = document.querySelector('.panel-container');

    if (profile && panelContent && goBackIcon && panelContainer) {
      if (isIphone14ProMax) {
        // iPhone behavior
        console.log("View Profile (iPhone)");
        panelContainer.style.zIndex = '1000'; // Ensure panel is above other elements
        panelContent.style.display = 'none'; // Hide panel content
        profile.style.display = 'flex'; // Show profile content
        goBackIcon.style.display = 'none'; // Hide go-back icon
      } else {
        // Desktop behavior
        console.log("View Profile (Desktop)");
        panelContent.style.display = 'none'; // Hide panel content
        profile.style.display = 'flex'; // Show profile content
        goBackIcon.style.display = 'flex'; // Show go-back icon
      }
    }
  };

  const viewPanelIphone = () => {
    // Access DOM elements after they are rendered
    const panelContainer = document.querySelector('.panel-container');
    const panelContent = document.querySelector('.panel-content');

    if (isIphone14ProMax && panelContainer && panelContent) {
      console.log("View Panel (iPhone)");
      panelContainer.style.zIndex = '1000'; // Show panel on iPhone
      panelContent.style.display = 'flex'; // Show panel content
    }
  };

  const DashboardItems = [
    {
      imgSrc: "../public/Images/Course-icon.png",
      altText: "Course Icon",
      text: "View Courses",
      id: "course-navigate",
    },
    {
      imgSrc: "../public/Images/Schedule-icon.png",
      altText: "Schedule Icon",
      text: "View Schedule",
      id: "Schedule-navigate",
    },
    {
      imgSrc: "../public/Images/Notification-icon.png",
      altText: "Notification Icon",
      text: "View Notifications",
      id: "Notification-navigate",
    },
  ];

  const handleItemClick = (text) => {
    setSelectedText(text);
  };

  return (
    <div className="whole-container">
      <ProfileTop viewProfile={viewProfile} /> {/* ProfileTop is always visible */}
      <Logo />
      <Dashboard DashboardItems={DashboardItems} onItemClick={handleItemClick} />
      <StudentWholeContent
        viewPanel={viewPanel}
        viewPanelIphone={viewPanelIphone}
        viewProfile={viewProfile}
        selectedDashboardITem={selectedText}
        selectedAddItem={selectedText}
      />
    </div>
  );
}