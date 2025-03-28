import axios from "axios";
import BASE_URL from "./BaseURL";

export const requestCorrection = async (attendanceId) => {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  try {
    const response = await axios.post(`${BASE_URL}/student/attendance-requests/${attendanceId}`, {}, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error sending correction request:", error);
    throw error;
  }
};
