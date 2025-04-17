import axios from 'axios';
import BASE_URL from './BaseURL';

export const updateCourse = async (courseId, courseData) => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  if (!token) {
    throw new Error("No authentication token found");
  }

  // Prepare payload that exactly matches backend expectations
  const payload = {
    Code: courseData.Code,
    name: courseData.name,
    instructor_id: courseData.instructor_id,
    start_time: courseData.start_time,
    end_time: courseData.end_time,
    day_of_week: courseData.day_of_week,
    room: courseData.Room,  // Note: backend expects 'room' but frontend uses 'Room'
    section: courseData.Section.toString(),
    credits: Number(courseData.credit)  // Backend expects 'credits' but frontend uses 'credit'
  };

  try {
    const response = await axios.put(`${BASE_URL}/admin/courses/${courseId}`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return {
      ...response.data,
      // Ensure consistent structure with frontend expectations
      course: {
        ...response.data.course,
        Section: response.data.course.section,
        Room: response.data.course.room,
        credit: response.data.course.credits
      }
    };

  } catch (error) {
    console.error("Course update failed:", {
      url: `${BASE_URL}/admin/courses/${courseId}`,
      error: error.response?.data || error.message,
      payload
    });

    if (error.response?.status === 422) {
      // Handle validation errors specifically
      const serverErrors = error.response.data.errors || {};
      const errorMessage = Object.values(serverErrors).flat().join('\n') || 
                         error.response.data.message || 
                         "Validation failed";
      throw new Error(errorMessage);
    }

    if (error.response?.status === 404) {
      throw new Error(error.response.data.message || "Course or instructor not found");
    }

    if (error.response?.data?.conflict_with) {
      const conflict = error.response.data.conflict_with;
      throw new Error(`Room conflict with ${conflict.Code} (${conflict.start_time}-${conflict.end_time})`);
    }

    throw new Error(error.response?.data?.message || "Failed to update course");
  }
};