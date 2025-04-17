import { useState, useEffect } from "react";
import "../../CSS/StudentNorificationCenter.css";
import { getStudentNotifications, markStudentNotificationAsRead } from "../../ApiService/NotificationService";
import LoadingSpinner from "../Generals/LoadingSpinner";
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
    <div className="notifications-container">
      <div className="notifications-wrapper">
        {/* Filter Section */}
        <div className="notifications-filter">
          <label htmlFor="filter" className="notifications-filter-label">Filter: </label>
          <select
            id="filter"
            value={filter}
            onChange={handleFilterChange}
            className="notifications-filter-select"
          >
            <option value="all">All Notifications</option>
            <option value="read">Read Notifications</option>
            <option value="unread">Unread Notifications</option>
          </select>
        </div>

        {/* Notifications Container */}
        <div id="main-notification-container" className="notifications-wrapper">
          {loading ? (
            <LoadingSpinner />
          ) : filteredNotifications.length === 0 ? (
            <div className="notifications-empty">
              <p className="notifications-empty-text">No notifications available.</p>
            </div>
          ) : (
            filteredNotifications.map((notification, index) => (
              <div
                key={index}
                className={`notification-card ${notification.read_status ? "read" : ""}`}
              >
                {/* Unread indicator */}
                {!notification.read_status && (
                  <div className={`notification-unread-indicator ${notification.type === "Warning" ? "warning" : "regular"
                    }`}></div>
                )}

                <div className="notification-content-wrapper">
                  <div className="notification-main-content">
                    <div className="notification-header">
                      <div className={`notification-icon ${notification.type === "Warning" ? "warning" : "regular"
                        }`}></div>

                      <span className={`notification-title ${notification.type === "Warning" ? "warning" : "regular"
                        }`}>
                        {notification.type
                          ? notification.type.charAt(0).toUpperCase() + notification.type.slice(1)
                          : "Notification"}
                      </span>
                    </div>

                    <p className="notification-message">
                      {notification.message}
                    </p>

                    <div className="notification-meta">
                      {notification.course?.name && (
                        <span className="notification-meta-item">
                          <div className="meta-icon book"></div>
                          {notification.course.name}
                        </span>
                      )}
                      {notification.instructor_name && (
                        <span className="notification-meta-item">
                          <div className="meta-icon user"></div>
                          {notification.instructor_name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="notification-actions">
                    <span className="notification-time">
                      <div className="meta-icon time"></div>
                      {notification.createdAt || "Today"}
                    </span>

                    {!notification.read_status && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className={`mark-as-read-btn ${notification.type === "Warning" ? "warning" : "regular"
                          }`}
                      >
                        <div className={`btn-icon ${notification.type === "Warning" ? "warning" : "regular"
                          }`}></div>
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}