import { useState, useEffect } from "react";
import "../../CSS/Course.css";
import "../../CSS/StudentCard.css";
import { getCourses } from "../../ApiService/CourseService";
// import { getStudentCourseCalendar } from "../../ApiService/StudentCalendarService";
import PropTypes from "prop-types";
import { useCourse } from "../../Contexts/CourseContext";
import { useUser } from "../../Contexts/UserContext";
import { getCourseStudents } from "../../ApiService/CourseStudentsService";
import StudentCard from "./StudentCard";
export default function Course({ courseFilters, studentFilters, handleStudentSelect, setSelectedCourseID, setActiveStudent, setFilterTop }) {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [calendarData] = useState([]);
  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

  const { setCourseId } = useCourse();
  const { user } = useUser();

  const [showStudents, setShowStudents] = useState(false); // new toggle state

  const [courseStudents, setCourseStudents] = useState([]); // to store students
  const [filteredCourseStudents, setFilteredCourseStudents] = useState([]);

  const handleDoubleClick = async (courseId) => {
    if (userRole !== "instructor") {
      return;
    }

    try {
      const students = await getCourseStudents(courseId);
      setSelectedCourseID(courseId);
      console.log("Course Students", students)
      setCourseStudents(students);
      setShowStudents(true);
      setFilterTop("Course Students")
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  const handleBackToCourses = () => {
    setShowStudents(false);
    setCourseStudents([]);
    setActiveIndex(null);
    setActiveStudent(null);
    setFilterTop("Courses")

  };



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

  useEffect(() => {
    let filtered = [...courses];

    // Filter by course code
    if (courseFilters?.code) {
      filtered = filtered.filter(course =>
        course.course_code.toUpperCase().includes(courseFilters.code.toUpperCase())
      );
    }

    // Filter by course name
    if (courseFilters?.name) {
      filtered = filtered.filter(course =>
        course.course_name.toUpperCase().includes(courseFilters.name.toUpperCase())
      );
    }

    // Filter by course section
    if (courseFilters?.section) {
      filtered = filtered.filter(course =>
        String(course.course_section) === String(courseFilters.section)
      );
    }

    // Sort courses (A-Z, Z-A)
    if (courseFilters?.sort === "asc") {
      filtered.sort((a, b) => a.course_name.localeCompare(b.course_name));
    } else if (courseFilters?.sort === "desc") {
      filtered.sort((a, b) => b.course_name.localeCompare(a.course_name));
    }

    setFilteredCourses(filtered);
  }, [courses, courseFilters]);


  useEffect(() => {
    let filteredStudents = [...courseStudents];
    console.log("Original Students: ", courseStudents);

    // Filter students by name (first_name + last_name)
    if (studentFilters?.name) {
      filteredStudents = filteredStudents.filter(student =>
        (student.first_name + " " + student.last_name).toUpperCase().includes(studentFilters.name.toUpperCase())
      );
    }

    // Filter students by student ID
    if (studentFilters?.studentID) {
      // Debugging the student ID filter
      console.log("Filtering by ID:", studentFilters.studentID);
      filteredStudents = filteredStudents.filter(student =>
        String(student.Uni_id).includes(studentFilters.studentID)
      );
    }

    // Filter students by major
    if (studentFilters?.major) {
      // Debugging the major filter
      console.log("Filtering by major:", studentFilters.major);
      filteredStudents = filteredStudents.filter(student =>
        student.major.toUpperCase().includes(studentFilters.major.toUpperCase())
      );
    }

    // Log the filtered results
    console.log("Filtered Students: ", filteredStudents);

    // Update the filtered students
    setFilteredCourseStudents(filteredStudents);
  }, [studentFilters, courseStudents]);  // Trigger this effect when studentFilters or courseStudents change

  const handleCourseClick = (index, courseId) => {
    setCourseId(courseId);
    setActiveIndex(index);

  };


  if (loading) return <p>Loading courses...</p>;
  if (!filteredCourses.length) return <p>No courses found.</p>;

  return (
    <div>
      <div className="CourseContainer">

        {/* 👇 IF viewing courses */}
        {!showStudents && (
          <>
            {filteredCourses.map((course, index) => (
              <div
                className={`course ${activeIndex === index ? "activeCourse" : ""}`}
                key={index}
                onClick={() => handleCourseClick(index, course.course_id)}
                onDoubleClick={() => handleDoubleClick(course.course_id)}
              >
                <div className="courseDetails">
                  <div className="courseBorder"></div>
                  <div className="courseText">
                    <p className="courseCode">{course.course_code || course.Code}</p>
                    <p className="courseName">{course.course_name || course.name}</p>
                    <p className="courseInstructor">
                      {userRole?.toLowerCase() === "instructor"
                        ? `${user?.first_name} ${user?.last_name}`
                        : userRole?.toLowerCase() === "admin"
                          ? `${course.instructors[0]?.user?.first_name || ''} ${course.instructors[0]?.user?.last_name || ''}`
                          : course.instructor_name}
                    </p>
                  </div>
                </div>

                {userRole?.toLowerCase() === "student" && course.absence_percentage !== undefined && (
                  <div className="percentageContainer">
                    <p className="coursePercentage">{`${course.absence_percentage}`}</p>
                    <span>Absence</span>
                    <span>Percentage</span>
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {/* 👇 IF viewing students */}
        {showStudents && (
          <div style={{ width: "100%" }} className="studentsContainer"
          >


            {filteredCourseStudents.map((student, index) => (
              <div onClick={() => handleStudentSelect(student, index)}>

                <StudentCard
                  key={student.student_id}
                  user={user.status}
                  firstName={student.first_name}
                  lastName={student.last_name}
                  major={student.major}
                  studentId={student.Uni_id}
                  image={student.image}
                />

              </div>
            ))}



          </div>
        )}
      </div>
      {showStudents && (
        <div className="backButtonContainer">
          <button className="back-btn" onClick={handleBackToCourses}>
            Back to Courses
          </button>
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
