import axios from "axios";
import BASE_URL from "./BaseURL";

export const courseCalendar = async (courseId) => {
  try {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (!token) {
      throw new Error("No authorization token found");
    }

    const response = await axios.get(
      `${BASE_URL}/instructor/courses/${courseId}/calendar`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Instructor Calendar Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching instructor course calendar:", error);
    throw error;
  }
};


export const getInstructorStudentCourseCalendar = async (courseId, studentId) => {
    try {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('No authorization token found');
      }
      console.log("Auth Token: ", token)
      console.log("Student ID: ", studentId)
  
      const response = await axios.get(
        `${BASE_URL}/instructor/students/${studentId}/courses/${courseId}`, 
        {
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Calendar Dataa: ",response.data)
      return response.data; 
    } catch (error) {
      console.error("Error fetching course calendar:", error);
      throw error;
    }
  };
  
