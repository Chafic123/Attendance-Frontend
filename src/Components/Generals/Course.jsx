import { useState, useEffect } from "react";
import { Icon } from "@mui/material";
import PropTypes from "prop-types";
import "../../CSS/Course.css";
import { getCourses } from "../../ApiService/CourseService";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading courses...</p>;
  if (!courses.length) return <p>No courses available.</p>;

  return (
    <div className="CourseContainer">
      {courses.map((course, index) => (
        <div
          className={`course ${activeIndex === index ? "activeCourse" : ""}`}
          key={index}
          onClick={() => handleCourseClick(index)}
        >
          <div className="courseDetails">
            <div className="courseBorder"></div>
            <div className="courseText">
              <p className="courseCode">{course.course_code}</p>
              <p className="courseName">{course.course_name}</p>
              <p className="courseInstructor">{course.instructor_name}</p>
            </div>
          </div>
          <div className="percentageContainer">
            <p className="coursePercentage">75%</p>
            <span>Absence</span>
            <span>Percentage</span>
          </div>
        </div>
      ))}
    </div>
  );
}


