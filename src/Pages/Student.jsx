import { useState } from "react";
import Dashboard from "../Components/Generals/Dashboard";
import Logo from "../Components/Generals/Logo";
import StudentWholeContent from "../Components/Student/StudentWholeContent";

export default function Student() {
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
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Logo />
      <Dashboard DashboardItems={DashboardItems} onItemClick={handleItemClick} />
      <StudentWholeContent selectedDashboardITem={selectedText} selectedAddItem={selectedText}/>
    </div>
  );
}
