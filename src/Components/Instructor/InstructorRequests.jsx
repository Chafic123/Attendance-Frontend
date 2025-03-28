import { useState, useEffect } from "react";

export default function InstructorRequests() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     const fetchNotifications = async () => {
//       const data = await getInstructorRequests();
//       setNotifications(data);
//       setLoading(false);
//     };

//     fetchNotifications();
//   }, []);


  return (
    <div id="notification-container">
      <h2 className="title">Notifications</h2>
  
      {loading ? (
        <p>Loading Requests...</p>
      ) : !notifications.length ? (
        <p>No Requests available.</p>
      ) : (
        <>
          {notifications.map((notification, index) => (
            <div key={index}>
              <div className="gray-line"></div>
              <div className="notifications">
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <div className="notification-title-container">
                    <img
                      className="purple-circle"
                      src="../public/Images/Purple-circle.png"
                      alt="Notification Icon"
                    />
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
                <button className="mark-as-read">Mark As Read</button>
              </div>
            </div>
          ))}
          <div className="gray-line"></div>
        </>
      )}
    </div>
  );
  
}
