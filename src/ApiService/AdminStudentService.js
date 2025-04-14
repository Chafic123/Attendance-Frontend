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
        department: studentData.department,
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


  

export const removeCourseStudent = async (courseId, studentId) => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  try {
    const response = await fetch(`${BASE_URL}/admin/courses/${courseId}/students/${studentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
      message: data.message || 'Student removed successfully from the course.'
    };

  } catch (error) {
    console.error('Error');
    return {
      success: false,
      message: error.message || 'Failed to remove student from the course.'
    };
  }
};


export const removeStudent = async (studentId) => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  try {
    const response = await fetch(`${BASE_URL}/admin/students/${studentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
      message: data.message || 'Student deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting student:', error);
    return {
      success: false,
      message: error.message || 'Failed to delete student.',
    };
  }
};



export const deleteStudentCourse = async (courseId, studentId) => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  try {
    const response = await fetch(`${BASE_URL}/admin/courses/${courseId}/students/${studentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
      message: data.message || 'Course removed from student successfully',
    };
  } catch (error) {
    console.error('Error removing course from student:', error);
    return {
      success: false,
      message: error.message || 'Failed to remove course from student.',
    };
  }
};




export const getNonEnrolledStudents = async (courseId) => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  try {
    const response = await fetch(`${BASE_URL}/admin/courses/${courseId}/Not-Enrolled-students`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    return {
      success: true,
      data: data,
      message: 'Fetched non-enrolled students successfully',
    };
  } catch (error) {
    console.error('Error fetching non-enrolled students:', error);
    return {
      success: false,
      message: error.message || 'Failed to fetch non-enrolled students.',
    };
  }
};
