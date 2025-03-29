import axios from "axios";
import BASE_URL from "./BaseURL";

export const submitCorrectionRequest = async (attendanceId, reason) => {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  try {
    const response = await axios.post(
      `${BASE_URL}/student/attendance-requests/${attendanceId}`,
      { reason },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Correction Request Error:", error.response?.data || error.message);
    throw error;
  }
};
