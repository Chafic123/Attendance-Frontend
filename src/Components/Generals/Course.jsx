import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "../../CSS/Course.css";
import { getCourses } from "../../ApiService/CourseService";
import PropTypes from "prop-types";

export default function Course({ onCourseDoubleClick }) {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams(); // Listen to search parameters
  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseData = await getCourses();
        setCourses(Array.isArray(courseData) ? courseData : []);
        setFilteredCourses(Array.isArray(courseData) ? courseData : []); // Default to full list
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // ✅ Listen for search query in the URL and filter courses properly
  useEffect(() => {
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";

    if (!searchQuery) {
      setFilteredCourses([...courses]); // ✅ Reset courses when search is cleared
    } else {
      const filtered = courses.filter(course =>
        course.course_name.toLowerCase().includes(searchQuery)
      );
      setFilteredCourses(filtered);
    }
  }, [searchParams, courses]); // ✅ Include `courses` in dependencies to update properly

  // ✅ Function to clear search completely and reset the URL
  const clearSearch = () => {
    setSearchParams({}); // ✅ Remove search query from the URL
    setFilteredCourses([...courses]); // ✅ Restore full course list
  };

  const handleCourseClick = (index) => setActiveIndex(index);

  const handleCourseDoubleClick = (courseId) => {
    if (onCourseDoubleClick) {
      onCourseDoubleClick(courseId);
    }
  };

  if (loading) return <p>Loading courses...</p>;
  if (!filteredCourses.length) return <p>No courses found.</p>;

  return (
    <div className="CourseContainer">
      {filteredCourses.map((course, index) => (
        <div
          className={`course ${activeIndex === index ? "activeCourse" : ""}`}
          key={index}
          onClick={() => handleCourseClick(index)}
          onDoubleClick={() => handleCourseDoubleClick(course.id)}
        >
          <div className="courseDetails">
            <div className="courseBorder"></div>
            <div className="courseText">
              <p className="courseCode">{course.course_code || course.Code}</p>
              <p className="courseName">{course.course_name || course.name}</p>
              <p className="courseInstructor">Roaa Soloh</p>
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
