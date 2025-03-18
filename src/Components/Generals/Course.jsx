import { useState, useEffect } from "react";
import "../../CSS/Course.css";
import { getCourses } from "../../ApiService/CourseService";
import PropTypes from "prop-types";

export default function Course({ filters, onCourseDoubleClick }) {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

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

  // ✅ Apply filtering by search, code, and sorting
  useEffect(() => {
    let filtered = [...courses];


    // ✅ Filter by course code
    if (filters?.code) {
      filtered = filtered.filter(course =>
        course.course_code.toUpperCase().includes(filters.code.toUpperCase())
      );
    }

    if (filters?.name) {
      filtered = filtered.filter(course =>
        course.course_name.toUpperCase().includes(filters.name.toUpperCase())
      );
    }


    // ✅ Sort courses (A-Z, Z-A)
    if (filters?.sort === "asc") {
      filtered.sort((a, b) => a.course_name.localeCompare(b.course_name));
    } else if (filters?.sort === "desc") {
      filtered.sort((a, b) => b.course_name.localeCompare(a.course_name));
    }

    setFilteredCourses(filtered);
  }, [courses, filters]);

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

          {userRole?.toLowerCase() === "student" && course.attendance_percentage !== undefined && (
            <div className="percentageContainer">
              <p className="coursePercentage">{`${course.attendance_percentage}%`}</p>
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
  filters: PropTypes.shape({
    code: PropTypes.string,
    sort: PropTypes.string,
  }),
  onCourseDoubleClick: PropTypes.func.isRequired,
};
