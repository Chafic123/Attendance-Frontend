import { useState } from "react";
import Dashboard from "../Components/Generals/Dashboard";
import ProfileTop from "../Components/Generals/ProfileTop";
import Logo from "../Components/Generals/Logo";
import StudentWholeContent from "../Components/Student/StudentWholeContent";
import "../CSS/SI.css"
export default function Student() {
  const handleAdd = ()=>{
    const temp = 0
  }
  const viewPanel= ()=> {
    const profile = document.querySelector('.profile-holder');
    const panelContent = document.querySelector('.panel-content');
    const goBackIcon = document.querySelector('.go-back-icon');

    if (profile && panelContent && goBackIcon) {
      console.log("Hide Profile")
      console.log("View Panel")
      panelContent.style.display = 'flex'; 
      profile.style.display = 'none'; 
      goBackIcon.style.display = 'none'
   
    }
  }
  const viewProfile = () => {
    const panelContainer = document.querySelector('.panel-container')
    const profile = document.querySelector('.profile-holder');
    const panelContent = document.querySelector('.panel-content');
    const goBackIcon = document.querySelector('.go-back-icon');
    const isIphone14ProMax = window.matchMedia('(max-width: 430px) and (max-height: 932px)').matches;
    if (isIphone14ProMax && profile && panelContent && goBackIcon){
      panelContainer.style.zIndex = '1000';
      panelContent.style.display = 'none';
      profile.style.display = 'flex';
    }
    else if (profile && panelContent && goBackIcon) {
      console.log("View Profile")
      console.log("Hide Panel")
      panelContent.style.display = 'none'; // Show the container (or use block depending on layout)
      profile.style.display = 'flex'; // Show the container (or use block depending on layout)
      goBackIcon.style.display = 'flex';

    }
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
      <ProfileTop viewProfile={viewProfile}/>
      <Logo />
      <Dashboard DashboardItems={DashboardItems} onItemClick={handleItemClick} />
      <StudentWholeContent viewPanel={viewPanel} viewProfile={viewProfile} selectedDashboardITem={selectedText} selectedAddItem={selectedText}/>
    </div>
  );
}
