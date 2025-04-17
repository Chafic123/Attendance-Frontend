import { useState, useEffect, useCallback } from "react";
import Dashboard from "../Components/Generals/Dashboard";
import ProfileTop from "../Components/Generals/ProfileTop";
import Logo from "../Components/Generals/Logo";
import StudentWholeContent from "../Components/Student/StudentWholeContent";
import { getStudentNotifications } from "./../ApiService/NotificationService";
import "../CSS/SI.css";

export default function Student({ refreshProfile, user, viewProfile, viewPanel, viewPanelIphone }) {
  const [selectedText, setSelectedText] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    refreshProfile();
    fetchNotificationCount();
  }, []);


  useEffect(() => {
    const firstItem = document.querySelectorAll('.dashboard-item')[0];
    if (firstItem) {
      firstItem.classList.add('active'); 
      setSelectedText(firstItem.textContent); 
    }
  }, []);
  

  const handleItemClick = (text, event) => {
    document.querySelectorAll('.dashboard-item').forEach((el) => {
      el.classList.remove('active');
    });

    event.currentTarget.classList.add('active');

    setSelectedText(text);
  };

  const fetchNotificationCount = async () => {
    try {
      const notifications = await getStudentNotifications();
      const unreadCount = notifications.filter(n => !n.read_status).length;
      setNotificationCount(unreadCount);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const DashboardItems = [
    { 
      imgSrc: "../public/Images/Course-icon.png", 
      altText: "Course Icon", 
      text: "View Courses", 
      id: "course-navigate" 
    },
    { 
      imgSrc: "../public/Images/Schedule-icon.png", 
      altText: "Schedule Icon", 
      text: "View Schedule", 
      id: "Schedule-navigate" 
    },
    { 
      imgSrc: "../public/Images/Notification-icon.png", 
      altText: "Notification Icon", 
      text: "View Notifications", 
      id: "Notification-navigate",
      badgeCount: notificationCount
    },
  ];

  return (
    <div className="whole-container">
      <ProfileTop selectedAddItem={selectedText} refreshProfile={refreshProfile} user={user} viewProfile={viewProfile} />
      <Logo />
      <Dashboard 
        setSelectedText={setSelectedText} 
        selectedAddItem={selectedText} 
        isStudent={"true"}
        DashboardItems={DashboardItems} 
        onItemClick={handleItemClick} 
      />
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
