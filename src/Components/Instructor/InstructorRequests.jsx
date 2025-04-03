import { useState, useEffect } from "react";
import { getInstructorRequests } from "../../ApiService/InstructorRequestCorrections";
import "../../CSS/SINotifications.css";

export default function InstructorRequests() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getInstructorRequests(); 
        setNotifications(data.requests || []); 
      } catch (error) {
        console.error("Error fetching instructor requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

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
                    <p className="notification-title">Attendance Correction Request</p>
                  </div>
  
                  <div className="temp">
                    <div className="notification-content-container">
                      <p className="notification-content">
                        {notification.reason || "No specific reason provided."}
                      </p>
                      <p className="notification-course-name">
                        Course ID: {notification.course_id || "Unknown Course"}
                      </p>
                      <p className="student-name">
                        Student: {notification.student ? notification.student.major : "Unknown Student"}
                      </p>

                    </div>
                  </div>
                </div>
                <div className="correction-btn-container">
                  <button className="approveCorrection">Approve</button>
                  <button className="rejectCorrection">Reject</button>
                </div>
              </div>
            </div>
          ))}
          <div className="gray-line"></div>
        </>
      )}
    </div>
  );
}
