import axios from 'axios';
import BASE_URL from './BaseURL';

export const getStudentCourseCalendar = async (courseId, studentId) => {
  try {
    // Get the token from localStorage or sessionStorage
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    
    // Check if token exists
    if (!token) {
      throw new Error('No authorization token found');
    }

    const response = await axios.get(
      `${BASE_URL}/student/courses/${courseId}/${studentId}/calendar`, 
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Pass the token here
          'Content-Type': 'application/json',
        },
      }
    );
    
    return response.data; // Return the calendar data
  } catch (error) {
    console.error("Error fetching course calendar:", error);
    throw error;
  }
};
