import axios from 'axios';
import BASE_URL from './BaseURL';

export const getStudentSchedule = async () => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  if (!token) {
    console.warn("No authentication token found. Please log in again.");
    return null;
  }

  try {
    const { data } = await axios.get(`${BASE_URL}/student/schedule-report`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true, 
    });

    return data;

  } catch (error) {
    console.error('Student Schedule API Error:', error.response?.status, error.response?.data || error.message);
    return null;
  }
};




export const downloadStudentScheduleReport = async () => {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

  if (userRole.toLowerCase() !== "student") {
    console.warn("Only students can download their schedule report.");
    return;
  }

  if (!token) {
    console.error("No authentication token found.");
    return;
  }

  const endpoint = `${BASE_URL}/student/download-schedule-report`;

  try {
    const response = await axios.get(endpoint, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/octet-stream",
      },
      responseType: "blob",
    });

    // Trigger file download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;

    // Optional: name the file
    link.setAttribute("download", `My_Schedule_Report.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error downloading student schedule report:", error.response?.data || error.message);
  }
};
