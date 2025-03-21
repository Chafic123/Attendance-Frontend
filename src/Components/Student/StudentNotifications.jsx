import { useState, useEffect } from "react";
import "../../CSS/SINotifications.css";
import { getStudentNotifications, markStudentNotificationAsRead } from "../../ApiService/NotificationService";

export default function StudentNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // mark a notification as read
  const handleMarkAsRead = async (notificationId) => {
    const response = await markStudentNotificationAsRead(notificationId);
    if (response) {
      setNotifications(notifications.filter((notification) => notification.id !== notificationId));
    }
  };

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
    <div id="notification-container">
      <h2 className="title">Notifications</h2>
      {notifications.map((notification, index) => (
        <div key={index}>
          <div className="gray-line"></div>
          <div className="notifications">
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <div className="notification-title-container">
                <img className="purple-circle" src="../public/Images/Purple-circle.png" alt="Notification Icon" />
                <p className="notification-title">{notification.type || "Notification"}</p>
              </div>

              <div className="temp">
                <div className="notification-content-container">
                  <p className="notification-content">{notification.message}</p>
                  <p className="notification-course-name">
                    {notification.course ? notification.course.name : "Unknown Course"}
                  </p>
                  <p className="instructor-name">
                    Instructor: {notification.instructor_name || "Unknown Instructor"}
                  </p>
                </div>
              </div>
            </div>
            <button className="mark-as-read" onClick={() => handleMarkAsRead(notification.id)}>
              Mark As Read
            </button>
          </div>
        </div>
      ))}
      <div className="gray-line"></div>
    </div>
  );
}
