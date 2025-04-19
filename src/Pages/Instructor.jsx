import { useState, useEffect } from "react";
import Dashboard from "../Components/Generals/Dashboard";
import ProfileTop from "../Components/Generals/ProfileTop";
import Logo from "../Components/Generals/Logo";
import InstructorWholeContent from "../Components/Instructor/InstructorWholeContent";
import { getInstructorRequests } from "./../ApiService/InstructorRequestCorrections";
import "../CSS/SI.css"

export default function Instructor({ refreshProfile, user, viewProfile, viewPanel, viewPanelIphone }) {


  const [isNotificationStatusChanged, setIsNotificationStatusChanged] = useState(false);
  const [selectedText, setSelectedText] = useState(null);
  const [requestCount, setRequestCount] = useState(0);



  useEffect(() => {
    const fetchRequestCount = async () => {
      try {
        const requestCount = await getInstructorRequests();
        const pendingRequests = requestCount.requests.filter(
          (req) => req.status === "pending"
        );
        setRequestCount(pendingRequests.length);
      } catch (error) {
        console.error("Error fetching request count:", error);
      }
    };
  
    fetchRequestCount();
  }, [isNotificationStatusChanged]);
  
  useEffect(() => {
    refreshProfile();
  }, []);

  const handleAdd = () => {
    console.log("View Profile")
    const panel = document.querySelector('.panel-container');
    if (panel) {
      panel.style.display = 'flex';
      setTimeout(() => {
        panel.classList.add('visible');
      }, 10);
    }
    console.log("Add clicked");
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
      text: "View Requests",
      id: "Notification-navigate",
      badgeCount: requestCount,
    },
  ];

  const handleItemClick = (text, event) => {

    document.querySelectorAll('.dashboard-item').forEach((el) => {
      el.classList.remove('active');
    });

    event.currentTarget.classList.add('active');
    setSelectedText(text);

  };


  useEffect(() => {
    const firstItem = document.querySelectorAll('.dashboard-item')[0];

    if (firstItem) {
      firstItem.classList.add('active');
      setSelectedText(firstItem.textContent);
    }

  }, []);


  return (
    <div className="whole-container">
      <ProfileTop viewProfile={viewProfile} refreshProfile={refreshProfile} user={user} onAdd={handleAdd} />
      <Logo />
      <Dashboard  DashboardItems={DashboardItems} onItemClick={handleItemClick} />
      <InstructorWholeContent
        isNotificationStatusChanged={isNotificationStatusChanged}
        setIsNotificationStatusChanged={setIsNotificationStatusChanged}
        viewPanelIphone={viewPanelIphone}
        setSelectedText={setSelectedText}
        viewPanel={viewPanel}
        refreshProfile={refreshProfile}
        onAdd={handleAdd}
        selectedDashboardItem={selectedText}
        selectedAddItem={selectedText}
      />
    </div>
  );
}