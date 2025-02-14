import { useState, useEffect } from "react";
import { Icon } from "@mui/material";
import PropTypes from "prop-types";
import "../../CSS/Course.css";
import coursesData from "../../JSON/Courses.json";

export default function Course(props) {
  const [courses, setCourses] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    // Filter courses based on student email
    const filteredCourses = coursesData.filter(
      (course) => course.studentEmail === props.studentEmail

    );
    setCourses(filteredCourses);
  }, [props.studentEmail]); // Runs whenever studentEmail prop changes

  const handleCourseClick = (index) => {
    setActiveIndex(index);
  };

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
              <p className="courseCode">{course.courseId}</p>
              <p className="courseName">{course.courseName}</p>
              <p className="courseInstructor">{course.courseInstructor}</p>
            </div>
          </div>
          <div className="percentageContainer">
              <p className="coursePercentage">75%</p>
              <span>Absence</span>
              <span>Percentage</span>
            </div>
          {props.user === "Admin" ? <Icon>more_vert</Icon> : null}
        </div>
      ))}
    </div>
  );
}

Course.propTypes = {
  user: PropTypes.string.isRequired,
  studentEmail: PropTypes.string.isRequired, // Ensuring student email is passed
};
