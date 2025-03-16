import axios from "axios";
import BASE_URL from "./BaseURL";

// ✅ Fetch Student Notifications
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

    console.log("Student Notifications:", response.data);
    return Array.isArray(response.data) ? response.data : [];

  } catch (error) {
    console.error("Error fetching student notifications:", error.response?.data || error.message);
    return [];
  }
};

// ✅ Mark Student Notification as Read (DELETE)
export const markStudentNotificationAsRead = async (notificationId) => {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  if (!token) {
    console.error("No authentication token found.");
    return null;
  }

  try {
    const response = await axios.delete(`${BASE_URL}/student/notifications/${notificationId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    console.log("Notification deleted:", response.data);
    return response.data; // Return success message

  } catch (error) {
    console.error("Error marking student notification as read:", error.response?.data || error.message);
    return null;
  }
};
