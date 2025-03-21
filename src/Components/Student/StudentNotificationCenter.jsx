import { useState, useEffect } from "react";
import "../../CSS/StudentNorificationCenter.css";
import { getStudentNotifications, markStudentNotificationAsRead } from "../../ApiService/NotificationService";

export default function StudentNotificationsCenter() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch notifications on component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getStudentNotifications();
      setNotifications(data);
      setLoading(false);
    };

    fetchNotifications();
  }, []);

  // ✅ Function to mark a notification as read
  const handleMarkAsRead = async (notificationId) => {
    const response = await markStudentNotificationAsRead(notificationId);
    if (response) {
      setNotifications(notifications.filter((notification) => notification.id !== notificationId));
    }
  };

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
                  <p className="notificationCard-course-name">
                    {notification.course ? notification.course.name : "Unknown Course"}
                  </p>
                  <p className="instructorCard-name">
                    Instructor: {notification.instructor_name || "Unknown Instructor"}
                  </p>
                </div>
              </div>
            </div>

            {/* "Mark As Read" Button */}
            <button className="mark-as-readCard" onClick={() => handleMarkAsRead(notification.id)}>
              Mark As Read
            </button>
          </div>
        </div>
      ))}
      <div className="gray-line"></div>
    </div>
  );
}
