import axios from 'axios';
import BASE_URL from './BaseURL';

const generateRandomPhoneNumber = () => {
  const length = Math.floor(Math.random() * 9);
  let phoneNumber = "";
  for (let i = 0; i < length; i++) {
    phoneNumber += Math.floor(Math.random() * 10); 
  }
  return phoneNumber; 
};

export const editStudent = async (studentId, studentData) => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    console.log("Student Data: ",studentData)
  try {
    const response = await axios.put(
      `${BASE_URL}/admin/students/${studentId}`,
      {
        student_id:studentData.student_id,
        first_name: studentData.first_name,
        last_name: studentData.last_name,
        email: studentData.email,
        phone: generateRandomPhoneNumber(),
        major: studentData.major,
        // department: studentData.department,
        department: "Business",
    },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating student:', error);
    
    // Extract error message from response if available
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        'Failed to update student. Please try again.';
    
    throw new Error(errorMessage);
  }
};


export const addStudent = async (studentData) => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  const newStudent = {
    ...studentData,
    department_id: "2", 
    phone_number: generateRandomPhoneNumber(),
  };

  try {
    const response = await axios.post(
      `${BASE_URL}/admin/add-student`,
      newStudent,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error adding student:', error.response?.data || error.message);

    // Extract error message from response if available
    const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to add student. Please try again.';

    throw new Error(errorMessage);
  }
};



export const enrollStudents = async (studentIds, courseId) => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  console.log("data", studentIds, courseId)
  try {
    const response = await fetch(`${BASE_URL}/admin/enrollStudents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        student_ids: studentIds,
        course_id: courseId,
      }),
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }
  
    const data = await response.json();
    return {
      success: true,
      data: data,
      message: data.message || 'Students enrolled successfully'
    };
  
  } catch (error) {
    console.error('Enrollment error:', error);
    return {
      success: false,
      message: error.message || 'Failed to enroll students'
    };
  }
  
  
}
  