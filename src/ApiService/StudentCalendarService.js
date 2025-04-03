import axios from 'axios';
import BASE_URL from './BaseURL';
// import { data } from 'react-router-dom';

export const getStudentCourseCalendar = async (courseId, studentId) => {
  try {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('No authorization token found');
    }
    console.log("Auth Token: ", token)
    console.log("Student ID: ", studentId)

    const response = await axios.get(
      `${BASE_URL}/student/courses/${courseId}/${studentId}/calendar`, 
      {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      }
    );
    console.log("Calendar Data: ",response.data)
    return response.data; 
  } catch (error) {
    console.error("Error fetching course calendar:", error);
    throw error;
  }
};
