import { useState, useEffect } from "react";
import "../../CSS/Course.css";
import { getCourses } from "../../ApiService/CourseService";
import PropTypes from "prop-types";

export default function Course({ onCourseDoubleClick }) {
  const [courses, setCourses] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseData = await getCourses();
        setCourses(Array.isArray(courseData) ? courseData : []);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (index) => setActiveIndex(index);

  const handleCourseDoubleClick = (courseId) => {
    if (onCourseDoubleClick) {
      onCourseDoubleClick(courseId); // Pass the course ID to parent
    }
  };

  if (loading) return <p>Loading courses...</p>;
  if (!courses.length) return <p>No courses available.</p>;

  return (
    <div className="CourseContainer">
      {courses.map((course, index) => (
        <div
          className={`course ${activeIndex === index ? "activeCourse" : ""}`}
          key={index}
          onClick={() => handleCourseClick(index)}
          onDoubleClick={() => handleCourseDoubleClick(course.id)}  //Added double-click
        >
          <div className="courseDetails">
            <div className="courseBorder"></div>
            <div className="courseText">
              <p className="courseCode">{course.course_code || course.Code}</p>
              <p className="courseName">{course.course_name || course.name}</p>
              <p className="courseInstructor">
                {course.instructor_name ||
                  (course.instructors?.[0]?.user
                    ? `${course.instructors[0].user.first_name} ${course.instructors[0].user.last_name}`
                    : "No instructor")}
              </p>
            </div>
          </div>

          {userRole?.toLowerCase() === "student" && (
            <div className="percentageContainer">
              <p className="coursePercentage">
                {course.attendance_percentage !== undefined
                  ? `${course.attendance_percentage}%`
                  : "N/A"}
              </p>
              <span>Absence</span>
              <span>Percentage</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

Course.propTypes = {
  onCourseDoubleClick: PropTypes.func.isRequired,
};
