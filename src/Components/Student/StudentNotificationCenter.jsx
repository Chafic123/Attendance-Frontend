import { useState, useEffect } from "react";
import "../../CSS/StudentNorificationCenter.css";
import { getStudentNotifications, markStudentNotificationAsRead } from "../../ApiService/NotificationService";

export default function StudentNotificationsCenter() {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const applyFilter = (type, data = notifications) => {
    if (type === "read") {
      setFilteredNotifications(data.filter((n) => n.read_status));
    } else if (type === "unread") {
      setFilteredNotifications(data.filter((n) => !n.read_status));
    } else {
      setFilteredNotifications(data);
    }
  };

  const handleFilterChange = (e) => {
    const selected = e.target.value;
    setFilter(selected);
    applyFilter(selected);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getStudentNotifications();
      console.log("Fetched notifications:", data); // 👈 Add this

      setNotifications(data);
      setLoading(false);
      applyFilter(filter, data);
    };

    fetchNotifications();
  }, []);

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

  return (
    <div>
       {/* 🔽 Filter Dropdown Always Visible */}
       <div className="notification-filter-container">
        <label htmlFor="filter">Filter: </label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="all">All Notifications</option>
          <option value="read">Read Notifications</option>
          <option value="unread">Unread Notifications</option>
        </select>
      </div>
      <div id="main-notification-container">



        {/* 🔄 Loading */}
        {loading ? (
          <p>Loading notifications...</p>
        ) : filteredNotifications.length === 0 ? (
          <p>No notifications available.</p>
        ) : (
          filteredNotifications.map((notification, index) => (
            <div key={index}>
              <div className="gray-line"></div>
              <div className={`notificationCard ${notification.read_status ? "read-notification" : ""}`}>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <div className="notificationCard-title-container">
                    <img className="purple-circle" src="../public/Images/Purple-circle.png" alt="Notification Icon" />
                    <p className="notificationCard-title">
                      {notification.type
                        ? notification.type.charAt(0).toUpperCase() + notification.type.slice(1)
                        : "Notification"}
                    </p>
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

                {!notification.read_status && (
                  <button className="mark-as-readCard" onClick={() => handleMarkAsRead(notification.id)}>
                    Mark As Read
                  </button>
                )}
              </div>
            </div>
          ))
        )}
        <div className="gray-line"></div>
      </div></div>
  );
}
