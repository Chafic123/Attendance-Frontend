import { useState, useEffect } from "react";
import "../../CSS/StudentNorificationCenter.css";
import { getStudentNotifications, markStudentNotificationAsRead } from "../../ApiService/NotificationService";

export default function StudentNotificationsCenter() {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // ✅ Apply filter based on read_status
  const applyFilter = (type, data = notifications) => {
    if (type === "read") {
      setFilteredNotifications(data.filter((n) => n.read_status));
    } else if (type === "unread") {
      setFilteredNotifications(data.filter((n) => !n.read_status));
    } else {
      setFilteredNotifications(data);
    }
  };

  // ✅ Handle filter change from dropdown
  const handleFilterChange = (e) => {
    const selected = e.target.value;
    setFilter(selected);
    applyFilter(selected);
  };

  // ✅ Fetch notifications on component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getStudentNotifications();
      setNotifications(data);
      setLoading(false);
      applyFilter(filter, data);
    };

    fetchNotifications();
  }, []);

  // ✅ Mark notification as read and update UI
  const handleMarkAsRead = async (notificationId) => {
    const response = await markStudentNotificationAsRead(notificationId);
    if (response) {
      const updated = notifications.map((n) =>
        n.id === notificationId ? { ...n, read_status: true } : n
      );
      setNotifications(updated);
      applyFilter(filter, updated);
    }
  };

  if (loading) return <p>Loading notifications...</p>;
  if (!filteredNotifications.length) return <p>No notifications available.</p>;

  return (
    <div id="main-notification-container">
      {/* 🔽 Filter Dropdown */}
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="filter">Filter: </label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="all">All Notifications</option>
          <option value="read">Read Notifications</option>
          <option value="unread">Unread Notifications</option>
        </select>
      </div>

      {filteredNotifications.map((notification, index) => (
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

            {/* Show only if unread */}
            {!notification.read_status && (
              <button className="mark-as-readCard" onClick={() => handleMarkAsRead(notification.id)}>
                Mark As Read
              </button>
            )}
          </div>
        </div>
      ))}
      <div className="gray-line"></div>
    </div>
  );
}
