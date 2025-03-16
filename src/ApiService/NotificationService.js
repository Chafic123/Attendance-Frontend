import axios from "axios";
import BASE_URL from "./BaseURL";

// ✅ Fetch Student Notifications (Only Unread)
export const getStudentNotifications = async () => {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  if (!token) {
    console.error("❌ No authentication token found.");
    return [];
  }

  try {
    const response = await axios.get(`${BASE_URL}/student/notifications`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    console.log("✅ Student Notifications Response:", response.data);

    // ✅ Filter out read notifications on the frontend if backend doesn't do it
    return Array.isArray(response.data)
      ? response.data.filter((notif) => !notif.read_status) // ✅ Keep only unread ones
      : [];

  } catch (error) {
    console.error("❌ Error fetching student notifications:", error.response?.data || error.message);
    return [];
  }
};

// ✅ Mark Notification as Read (`PUT` Request)
export const markStudentNotificationAsRead = async (notificationId) => {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  if (!token) {
    console.error("❌ No authentication token found.");
    return null;
  }

  try {
    // ✅ Corrected API endpoint
    const endpoint = `${BASE_URL}/student/notifications/${notificationId}/read`;
    console.log(`Attempting to PUT: ${endpoint}`);

    const response = await axios.put(endpoint, {}, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    console.log("✅ Notification marked as read:", response.data);
    return response.data;

  } catch (error) {
    console.error("❌ Error marking student notification as read:", error.response?.data || error.message);
    return null;
  }
};
