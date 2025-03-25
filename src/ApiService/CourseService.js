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
    console.log(data)
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

    console.log(`Students for course ${courseId}:`, data);
    return Array.isArray(data) ? data : [];

  } catch (error) {
    console.error(`Error fetching students for course ${courseId}:`, error.response?.data || error.message);
    return [];
  }
};

export const addCourse = async (Code, name, Room, credit, Section, day_of_week, start_time, end_time,
  instructor_first_name, instructor_last_name, instructor_email) => {

  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  if (!token) {
    console.error("No authentication token found.");
    return [];
  }

  const formData = new FormData();

  formData.append('Code', Code)
  formData.append('name', name)
  formData.append('Room', Room)
  formData.append('credit', credit)
  formData.append('Section', Section)
  formData.append('day_of_week', day_of_week)
  formData.append('start_time', start_time)
  formData.append('end_time', end_time)
  formData.append('instructor_first_name', instructor_first_name)
  formData.append('instructor_last_name', instructor_last_name)
  formData.append('instructor_email', instructor_email)

  try {
    const response = await axios.post(`${BASE_URL}/admin/courses/Addcourse`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    });

    console.log(response.data);
    return response.data;

  } catch (error) {
    console.error(`Error adding course:`, error.response?.data || error.message);
    return [];
  }
}