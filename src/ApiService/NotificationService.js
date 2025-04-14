import axios from "axios";
import BASE_URL from "./BaseURL";


export const getStudentNotifications = async () => {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  if (!token) {
    console.error("No authentication token found.");
    return [];
  }

  try {
    const response = await axios.get(`${BASE_URL}/student/notifications`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });


    return Array.isArray(response.data) ? response.data : [];

  } catch (error) {
    console.error("❌ Error fetching student notifications:", error.response?.data || error.message);
    return [];
  }
};


// Mark Notification as Read (`PUT` Request)
export const markStudentNotificationAsRead = async (notificationId) => {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  if (!token) {
    console.error("❌ No authentication token found.");
    return null;
  }

  try {
    const endpoint = `${BASE_URL}/student/notifications/${notificationId}/read`;

    const response = await axios.put(endpoint, {}, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    return response.data;

  } catch (error) {
    console.error(" Error marking student notification as read:", error.response?.data || error.message);
    return null;
  }
};




export const sendInstructorNotification = async (studentId, courseId, message) => {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  if (!token) {
    console.error("❌ No authentication token found.");
    return;
  }

  const payload = {
    student_id: studentId,
    course_id: courseId,
    message: message,
    type: "Regular", // static type as per your request
  };

  try {
    const response = await axios.post(
      `${BASE_URL}/instructor/courses/send-notification`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error sending notification:", error.response?.data || error.message);
    return null;
  }
};
