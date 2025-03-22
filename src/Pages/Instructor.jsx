import { useState } from "react";
import Dashboard from "../Components/Generals/Dashboard";
import ProfileTop from "../Components/Generals/ProfileTop";
import Logo from "../Components/Generals/Logo";
import InstructorWholeContent from "../Components/Instructor/InstructorWholeContent";
import "../CSS/SI.css"
import { useEffect } from "react";
export default function Instructor({refreshProfile,user,viewProfile,viewPanel}) {
  useEffect(() => {
    refreshProfile();
}, []);
  const handleAdd = () => {
    console.log("View Profile")
    const panel = document.querySelector('.panel-container');
    if (panel) {
      panel.style.display = 'flex'; // Show the container (or use block depending on layout)
      setTimeout(() => {
        panel.classList.add('visible'); // Add the visible class for opacity/transform
      }, 10); // Small delay to ensure the transition applies
    }
    console.log("Add clicked");
  };
  const [selectedText, setSelectedText] = useState(null);
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
    <div className="whole-container"
    >
      <ProfileTop viewProfile={viewProfile} refreshProfile={refreshProfile} user={user} onAdd={handleAdd} />
      <Logo />
      <Dashboard DashboardItems={DashboardItems} onItemClick={handleItemClick} />
      <InstructorWholeContent
      viewPanel={viewPanel}
      refreshProfile={refreshProfile} 
      onAdd={handleAdd} 
      selectedDashboardITem={selectedText} 
      selectedAddItem={selectedText} />
    </div>
  );
}
