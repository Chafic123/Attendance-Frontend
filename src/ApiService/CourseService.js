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

    console.log('Courses Response:', data);

    // ✅ Handle both cases:
    // - If 'data' is an array (student case), return it directly.
    // - If 'data' is an object with 'data' field (admin case), return data.data.
    if (Array.isArray(data)) {
      return data; // Student API returns direct array
    } else if (data?.data && Array.isArray(data.data)) {
      return data.data; // Admin API returns paginated object with 'data' array
    }

    console.warn("Unexpected API response structure.");
    return [];

  } catch (error) {
    console.error('API Error:', error.response?.status, error.response?.data || error.message);
    return [];
  }
};


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

    console.log(`Students for course ${courseId}:`, data);
    return Array.isArray(data) ? data : [];

  } catch (error) {
    console.error(`Error fetching students for course ${courseId}:`, error.response?.data || error.message);
    return [];
  }
};
