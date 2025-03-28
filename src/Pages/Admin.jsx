import { useState } from "react";
import Dashboard from "../Components/Generals/Dashboard";
import Logo from "../Components/Generals/Logo";
import AdminWholeContent from "../Components/Admin/AdminWholeContent";
import "../CSS/AdminPage.css"
import ProfileTop from "../Components/Generals/ProfileTop";
export default function Admin() {
  const [selectedText, setSelectedText] = useState(null);
  const DashboardItems = [
    {
      imgSrc: "../public/Images/Student-icon.png",
      altText: "Student Icon",
      text: "View Students",
      id: "student-navigate",
    },
    {
      imgSrc: "../public/Images/Instructor-icon.png",
      altText: "Instructor Icon",
      text: "View Instructors",
      id: "instructor-navigate",
    },
    {
      imgSrc: "../public/Images/Course-icon.png",
      altText: "Course Icon",
      text: "View Courses",
      id: "course-navigate",
    },
  ];

  const handleItemClick = (text) => {
    setSelectedText(text);
  };

  return (
    <div className="AdminPage">
      <Logo />
      <Dashboard DashboardItems={DashboardItems} onItemClick={handleItemClick} />
      <AdminWholeContent selectedDashboardITem={selectedText} selectedAddItem={selectedText}/>
    </div>
  );
}
