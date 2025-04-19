import { useState, useEffect } from "react";
import "../../CSS/StudentNorificationCenter.css";
import { getStudentNotifications, markStudentNotificationAsRead } from "../../ApiService/NotificationService";
import LoadingSpinner from "../Generals/LoadingSpinner";
export default function StudentNotificationsCenter({setNotificationDate, isNotificationStatusChanged, setIsNotificationStatusChanged}) {
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
      setIsNotificationStatusChanged(true);
      setNotifications(updated);
      applyFilter(filter, updated);
    }
    if(isNotificationStatusChanged===true){
      setIsNotificationStatusChanged(false)
    }
  };
  // const [notificationDate, setNotificationDate] = useState();

  const handleNotificationClick = (notification) => {
    const date = new Date(notification.created_at);
    setNotificationDate(date); 
    console.log(date)
  };
  return (
    <div className="notifications-container">
      <div className="notifications-wrapper">
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

        <div id="main-notification-container" className="notifications-wrapper">
          {loading ? (
            <LoadingSpinner />
          ) : filteredNotifications.length === 0 ? (
            <div className="no-notification-container">
                    <img
                          src="../public/Images/NoNotification-icon.png"
                          alt="No Requests"
                        style={{ width: "100px", height: "100px", opacity: 0.6, marginTop:"70px" }}
                    />
                    <p style={{ marginTop: "0px", fontSize: "24px", color: "#777" }}>
                        No Notifications Available
                    </p>
                </div>
          ) : (
            filteredNotifications.map((notification, index) => (
              <div
                key={index}
                className={`notification-card ${notification.read_status ? "read" : ""}`}
                onClick={()=>handleNotificationClick(notification)}
              >
                {!notification.read_status && (
                  <div className={`notification-unread-indicator ${notification.type === "Warning" ? "warning" : "regular"
                    }`}></div>
                )}

                <div className="notification-content-wrapper">
                  <div className="notification-main-content">
                  <div className="notification-header">
                    {notification.type === "Warning" ? (
                      <svg className="notification-icon warning" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="#F22327" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    ) : (
                      <svg className="notification-icon regular" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#543381" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 8V12" stroke="#543381" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 16H12.01" stroke="#543381" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    )}
                    
                    <span className={`notification-title ${notification.type === "Warning" ? "warning" : "regular"}`}>
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

                    {!notification.read_status && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className={`mark-as-read-btn ${notification.type === "Warning" ? "warning" : "regular"
                          }`}
                      >
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