import axios from 'axios';
import BASE_URL from './BaseURL';

export const getAdminStudentCourseCalendar = async (courseId, studentId) => {
    try {
        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
        if (!token) {
            throw new Error('No authorization token found');
        }

        console.log("Student ID: ", studentId);
        console.log("Course ID: ", courseId);

        const response = await axios.get(
            `${BASE_URL}/admin/students/${studentId}/courses/${courseId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log("Admin - Student Calendar Data: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching student course calendar:", error);
        throw error;
    }
};

export const getAdminCourseCalendar = async (courseId) => {
    try {
        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
        if (!token) {
            throw new Error('No authorization token found');
        }

        console.log("Course ID: ", courseId);

        const response = await axios.get(
            `${BASE_URL}/admin/${courseId}/calender`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log("Admin - Course Calendar Data: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching admin course calendar:", error);
        throw error;
    }
};
