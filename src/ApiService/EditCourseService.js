import axios from 'axios';
import BASE_URL from './BaseURL';

export const updateCourse = async (courseId, courseData) => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  if (!token) {
    throw new Error("No auth token found");
  }

  // Prepare correct field names for API
  const payload = {
    Code: courseData.Code,
    name: courseData.name,
    instructor_email: courseData.email, 
    day_of_week: courseData.day_of_week,
    start_time: courseData.start_time,
    end_time: courseData.end_time,
    section: String(courseData.section),     // force string
    room: courseData.room,        
    credits: Number(courseData.credits)       // ensure it's a number
};

  try {
    const response = await axios.put(`${BASE_URL}/admin/courses/${courseId}`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update course:", error);

    if (error.response) {
      console.error("Response data:", error.response.data);
    }

    throw error;
  }
};
