import { useState } from "react";
import Dashboard from "../Components/Dashboard";
import Logo from "../Components/Logo";
import AdminWholeContent from "../Components/Admin/AdminWholeContent";
// import AdminEditCourse from "../Components/Admin/AdminEditCourse";
export default function AdminCourses() {
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
      <AdminWholeContent selectedDashboardITem={selectedText} />
    </div>
  );
}
