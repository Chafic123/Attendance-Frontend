import { useState, useEffect } from "react";
import "../../CSS/Course.css";
import { getCourses } from "../../ApiService/CourseService";
import { getStudentCourseCalendar } from "../../ApiService/StudentCalendarService";
import PropTypes from "prop-types";
import { useCourse } from "../../Contexts/CourseContext";
export default function Course({ filters }) {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [calendarData, setCalendarData] = useState([]); // State for storing calendar data
  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
  const { setCourseId } = useCourse();  // Access the setter function to set Course ID

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseData = await getCourses();
        setCourses(Array.isArray(courseData) ? courseData : []);
        setFilteredCourses(Array.isArray(courseData) ? courseData : []);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Apply filtering by search, code, and sorting
  useEffect(() => {
    let filtered = [...courses];

    // Filter by course code
    if (filters?.code) {
      filtered = filtered.filter(course =>
        course.course_code.toUpperCase().includes(filters.code.toUpperCase())
      );
    }

    // Filter by course name
    if (filters?.name) {
      filtered = filtered.filter(course =>
        course.course_name.toUpperCase().includes(filters.name.toUpperCase())
      );
    }

    // Sort courses (A-Z, Z-A)
    if (filters?.sort === "asc") {
      filtered.sort((a, b) => a.course_name.localeCompare(b.course_name));
    } else if (filters?.sort === "desc") {
      filtered.sort((a, b) => b.course_name.localeCompare(a.course_name));
    }

    setFilteredCourses(filtered);
  }, [courses, filters]);

  // Fetch calendar data when a course is clicked
  const userID = localStorage.getItem('userID') || sessionStorage.getItem('userID');
  console.log('user ID:', userID);

  const handleCourseClick = (index, courseId) => {
    setCourseId(courseId);
    setActiveIndex(index);

  };
  // const handleCourseClick = (index, courseId) => {
  //   setActiveIndex(index);

  //   if (courseId) {
  //     const fetchCalendarData = async () => {
  //       try {
  //         // Fetch calendar data based on selected courseId and studentId (replace 'studentId' with the actual student ID)
  //         const data = await getStudentCourseCalendar(courseId, userID);
  //         console.log("Calendar Data:",data)
  //         setCalendarData(data); // Set the fetched calendar data
  //       } catch (error) {
  //         console.error("Error fetching calendar data:", error);
  //       }
  //     };

  //     fetchCalendarData();
  //   }
  // };

  if (loading) return <p>Loading courses...</p>;
  if (!filteredCourses.length) return <p>No courses found.</p>;

  return (
    <div className="CourseContainer">
      {filteredCourses.map((course, index) => (
        <div
          className={`course ${activeIndex === index ? "activeCourse" : ""}`}
          key={index}
          onClick={() => handleCourseClick(index, course.course_id)} // Pass the course id here
        >
          <div className="courseDetails">
            <div className="courseBorder"></div>
            <div className="courseText">
              <p className="courseCode">{course.course_code || course.Code}</p>
              <p className="courseName">{course.course_name || course.name}</p>
              <p className="courseInstructor">Roaa Soloh</p>
            </div>
          </div>

          {userRole?.toLowerCase() === "student" && course.attendance_percentage !== undefined && (
            <div className="percentageContainer">
              <p className="coursePercentage">{`${course.attendance_percentage}%`}</p>
              <span>Absence</span>
              <span>Percentage</span>
            </div>
          )}
        </div>
      ))}

      {/* Display the calendar data if available */}
      {calendarData.length > 0 && (
        <div className="calendarData">
          <h2>Attendance Calendar</h2>
          {/* Render your calendar here */}
        </div>
      )}
    </div>
  );
}

Course.propTypes = {
  filters: PropTypes.shape({
    code: PropTypes.string,
    sort: PropTypes.string,
    name: PropTypes.string,
  }),
};
