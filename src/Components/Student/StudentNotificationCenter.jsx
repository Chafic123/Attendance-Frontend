import { useState, useEffect } from "react";
import "../../CSS/StudentNorificationCenter.css";
import { getStudentNotifications } from "../../ApiService/NotificationService";

export default function StudentNotificationsCenter() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getStudentNotifications();
      setNotifications(data);
      setLoading(false);
    };

    fetchNotifications();
  }, []);

  if (loading) return <p>Loading notifications...</p>;
  if (!notifications.length) return <p>No notifications available.</p>;

  return (
    <div id="main-notification-container">
      {notifications.map((notification, index) => (
        <div key={index}>
          <div className="gray-line"></div>
          <div className="notificationCard">
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <div className="notificationCard-title-container">
                <img className="purple-circle" src="../public/Images/Purple-circle.png" alt="Notification Icon" />
                <p className="notificationCard-title">{notification.type || "Notification"}</p>
              </div>

              <div className="temp">
                <div className="notificationCard-content-container">
                  <p className="notificationCard-content">{notification.message}</p>
                  <p className="notificationCard-course-name">{notification.course.name}</p>
                  <p className="instructorCard-name">Instructor: {notification.instructor_name}</p>
                </div>
              </div>
            </div>
            <button className="mark-as-readCard">Mark As Read</button>
          </div>
        </div>
      ))}
      <div className="gray-line"></div>
    </div>
  );
}