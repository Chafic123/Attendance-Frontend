import axios from 'axios';
import BASE_URL from './BaseURL';

export const getCourses = async () => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole');

  if (!token) {
    console.log("No authentication token found. Please log in again.");
    return [];
  }

  if (!userRole) {
    console.error("User role not found. Please log in again.");
    return [];
  }

  const endpoint = `${BASE_URL}/${userRole.toLowerCase()}/courses`;

  try {
    const { data } = await axios.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    });
    if (Array.isArray(data)) {
      return data; // Student API case (returns an array)
    } else if (data?.data && Array.isArray(data.data)) {
      return data.data; // Admin API case (returns { data: [...] })
    } else {
      console.warn("Unexpected API response structure:", data);
      return [];
    }

  } catch (error) {
    console.error('API Error:', error.response?.status, error.response?.data || error.message);
    return [];
  }
};
//Temporary
export const getCourseStudents = async (courseId) => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  if (!token) {
    console.error("No authentication token found.");
    return [];
  }

  try {
    const { data } = await axios.get(`${BASE_URL}/admin/courses/${courseId}/students`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return Array.isArray(data) ? data : [];

  } catch (error) {
    console.error(`Error fetching students for course ${courseId}:`, error.response?.data || error.message);
    return [];
  }
};

export const addCourse = async (
  Code,
  name,
  Room,
  credit,
  Section,
  day_of_week,
  start_time,
  end_time,
  instructor_id
) => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  if (!token) {
    console.error("No authentication token found.");
    return [];
  }

  const formData = new FormData();

  formData.append('Code', Code);
  formData.append('name', name);
  formData.append('Room', Room);
  formData.append('credit', credit);
  formData.append('Section', Section);
  formData.append('day_of_week', day_of_week);
  formData.append('start_time', start_time);
  formData.append('end_time', end_time);
  formData.append('instructor_id', instructor_id);  // Changed to use instructor_id

  try {
    const response = await axios.post(`${BASE_URL}/admin/Addcourse`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data;

  } catch (error) {
    console.error(`Error adding course:`, error.response?.data || error.message);
    throw error;
  }
};



export const getStudentCourses = async (studentId) => {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  if (!token) {
    console.error("No authentication token found. Please log in again.");
    return [];
  }

  const endpoint = `${BASE_URL}/admin/students/${studentId}/courses`;

  try {
    const { data } = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching student courses:", error.response?.status, error.response?.data || error.message);
    return [];
  }
};



export const downloadCourseAttendanceReport = async (courseId) => {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole');
  if (userRole.toLowerCase() === "student") return;

  if (!token) {
    console.error("No authentication token found.");
    return;
  }

  const endpoint = `${BASE_URL}/${userRole}/courses/${courseId}/attendance-report`;

  try {
    const response = await axios.get(endpoint, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/octet-stream",
      },
      responseType: "blob", // Important for file download
    });

    // Trigger file download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;

    // Optional: dynamic file name
    link.setAttribute("download", `Attendance_Schedule_Course_${courseId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error downloading attendance report:", error.response?.data || error.message);
  }
};

