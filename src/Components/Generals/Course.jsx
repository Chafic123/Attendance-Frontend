import { useState, useEffect } from "react";
import "../../CSS/Course.css";
import { getCourses } from "../../ApiService/CourseService";
import PropTypes from "prop-types";

export default function Course({ coursefilter }) {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseData = await getCourses();
        setCourses(courseData);
        setFilteredCourses(courseData);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = [...courses];

    if (coursefilter?.courseCode) {
      filtered = filtered.filter(course =>
        course.Code.toUpperCase().includes(coursefilter.courseCode.toUpperCase())
      );
    }

    if (coursefilter?.courseSection) {
      filtered = filtered.filter(course =>
        course.Section === coursefilter.courseSection
      );
    }

    if (coursefilter?.courseInstructor) {
      filtered = filtered.filter(course =>
        course.instructors.some(instructor =>
          instructor.username.toUpperCase().includes(coursefilter.courseInstructor.toUpperCase())
        )
      );
    }

    if (coursefilter?.courseTime) {
      filtered = filtered.filter(course =>
        course.start_time.includes(coursefilter.courseTime)
      );
    }

    setFilteredCourses(filtered);
  }, [courses, coursefilter]);

  if (loading) return <p>Loading courses...</p>;
  if (!filteredCourses.length) return <p>No courses found.</p>;

  return (
    <div className="CourseContainer">
      {filteredCourses.map((course, index) => (
        <div className="course" key={index}>
          <div className="courseDetails">
            <div className="courseBorder"></div>
            <div className="courseText">
              <p className="courseCode">{course.Code}</p>
              <p className="courseName">{course.name}</p>
              <p className="courseInstructor">{course.instructors[0]?.username}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

Course.propTypes = {
  coursefilter: PropTypes.shape({
    courseCode: PropTypes.string,
    courseSection: PropTypes.string,
    courseInstructor: PropTypes.string,
    courseTime: PropTypes.string,
  }),
};