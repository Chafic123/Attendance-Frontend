import { useRef, useEffect, useState } from "react";
import "../../CSS/Course.css";
import "../../CSS/StudentCard.css";
import { getCourses } from "../../ApiService/CourseService";
// import { getStudentCourseCalendar } from "../../ApiService/StudentCalendarService";
import PropTypes from "prop-types";
import { useCourse } from "../../Contexts/CourseContext";
import { useUser } from "../../Contexts/UserContext";
import { getCourseStudents } from "../../ApiService/CourseStudentsService";
import StudentCard from "./StudentCard";
import { Icon } from "@mui/material";
import AdminEnrollStudentsPopup from "../Admin/AdminEnrollStudentsPopup";
import { useStudent } from "../../Contexts/getClickedStudentID";

export default function Course({ setSelectedText,studentCourseFilters, setCourseTitle, setStudents, courses, setCourses, courseFilters, studentFilters, setStudentFilters, setSelectedCourseID, setActiveStudent, setFilterTop, setEditedCourse, setEditedStudent, onStudentFilterChange }) {
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]); 
  const [filteredStudentCourses, setFilteredStudentCourses] = useState([]);

  const [hideIcon, setHideIcon] = useState(false);
  const [courseStudentID, setCourseStudentID] = useState("")

  const { setStudentId } = useStudent();

  const [activeIndex, setActiveIndex] = useState(null);

  const [loading, setLoading] = useState(true);
  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

  const dropdownRef = useRef(null);
  const [showMenuIndex, setShowMenuIndex] = useState(null);

  const { setCourseId } = useCourse();
  const { user } = useUser();

  const [showStudents, setShowStudents] = useState(false);

  const [courseStudents, setCourseStudents] = useState([]);
  const [filteredCourseStudents, setFilteredCourseStudents] = useState([]);

  const [isPopupVisible, setPopupVisible] = useState(false);



  const handleDoubleClick = async (courseId, courseName, courseSection) => {
    setCourseStudentID(courseId);
    console.log("Course Double Clicked")
    setCourseId(courseId);
    if (userRole !== "instructor" && userRole !== "admin") {
      return;
    }
    if (userRole == "instructor") {
      setSelectedCourseID(courseId);
    }
    try {
      const students = await getCourseStudents(courseId);
      console.log("Course Students", students)
      setFilterTop("Course Students")
      setHideIcon(true)
      setCourseStudents(students);
      setShowStudents(true);
      setCourseTitle(`${courseName} - S${courseSection}`);
      setStudents(students);
      setSelectedText("View Course Students");
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  const handleEditCourseClick = (course) => {
    setEditedCourse(course);
    console.log("Edited Course: ", course)
  }

  const handleBackToCourses = () => {
    setEditedStudent(null)
    setFilterTop("Courses");
    setSelectedText("View Courses")
    setCourseTitle("Courses");
    setShowStudents(false);
    setActiveStudent(null);
    setStudentId(null)
    setCourseStudents([]);
    setActiveIndex(null);

  };

  const handleEnrollStudents = () => {
    setStudentFilters({ studentID: "", name: "", major: "", sort: "" });
    setPopupVisible(true);
  };
  const handleClosePopup = () => {
    setStudentFilters({ studentID: "", name: "", major: "", sort: "" });
    setPopupVisible(false);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById(`dropdown-${showMenuIndex}`);
      if (dropdown && !dropdown.contains(event.target)) {
        setShowMenuIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenuIndex]);




  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseData = await getCourses();
        setCourses(Array.isArray(courseData) ? courseData : []);
        setAllCourses(Array.isArray(courseData) ? courseData : []);
        setFilteredCourses(Array.isArray(courseData) ? courseData : [])
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

    if (courseFilters?.code) {
      filtered = filtered.filter(course =>
      (course.course_code?.toUpperCase().includes(courseFilters.code.toUpperCase()) ||
        course.Code?.toUpperCase().includes(courseFilters.code.toUpperCase()))
      );
    }


    if (courseFilters?.name) {
      filtered = filtered.filter(course =>
      (String(course.name).toUpperCase().includes(courseFilters.name.toUpperCase()) ||
        String(course.course_name).toUpperCase().includes(courseFilters.name.toUpperCase()))
      );
    }



    // Filter by course section
    if (courseFilters?.section) {
      filtered = filtered.filter(course =>
        String(course.Section) === String(courseFilters.section) ||
        String(course.course_section) === String(courseFilters.section));
    }


    if (courseFilters?.sort === "asc") {
      filtered.sort((a, b) => {
        const aName = String(a.name || a.course_name).toLowerCase();
        const bName = String(b.name || b.course_name).toLowerCase();
        return aName.localeCompare(bName);
      });
    } else if (courseFilters?.sort === "desc") {
      filtered.sort((a, b) => {
        const aName = String(a.name || a.course_name).toLowerCase();
        const bName = String(b.name || b.course_name).toLowerCase();
        return bName.localeCompare(aName);
      });
    }


    setFilteredCourses(filtered);
  }, [courses, courseFilters]);


  //test 
  useEffect(() => {
    let filtered = [...allCourses];

    if (studentCourseFilters?.code) {
      filtered = filtered.filter(course =>
      (course.course_code?.toUpperCase().includes(studentCourseFilters.code.toUpperCase()) ||
        course.Code?.toUpperCase().includes(studentCourseFilters.code.toUpperCase()))
      );
    }

    if (studentCourseFilters?.name) {
      filtered = filtered.filter(course =>
      (String(course.name).toUpperCase().includes(studentCourseFilters.name.toUpperCase()) ||
        String(course.course_name).toUpperCase().includes(studentCourseFilters.name.toUpperCase()))
      );
    }

    if (studentCourseFilters?.section) {
      filtered = filtered.filter(course =>
        String(course.Section) === String(studentCourseFilters.section) ||
        String(course.course_section) === String(studentCourseFilters.section)
      );
    }

    if (studentCourseFilters?.sort === "asc") {
      filtered.sort((a, b) => {
        const aName = String(a.name || a.course_name).toLowerCase();
        const bName = String(b.name || b.course_name).toLowerCase();
        return aName.localeCompare(bName);
      });
    } else if (studentCourseFilters?.sort === "desc") {
      filtered.sort((a, b) => {
        const aName = String(a.name || a.course_name).toLowerCase();
        const bName = String(b.name || b.course_name).toLowerCase();
        return bName.localeCompare(aName);
      });
    }

    setFilteredCourses(filtered);
  }, [studentCourseFilters]);


  useEffect(() => {
    let filteredStudents = [...courseStudents];
    console.log("Original Students: ", courseStudents);

    if (studentFilters?.name) {
      filteredStudents = filteredStudents.filter(student =>
        (student.first_name + " " + student.last_name).toUpperCase().includes(studentFilters.name.toUpperCase())
      );
    }

    if (studentFilters?.studentID) {
      console.log("Filtering by ID:", studentFilters.studentID);
      filteredStudents = filteredStudents.filter(student =>
        String(student.Uni_id).includes(studentFilters.studentID) ||
        String(student.student_id).includes(studentFilters.studentID)
      );
    }

    if (studentFilters?.major) {
      console.log("Filtering by major:", studentFilters.major);
      filteredStudents = filteredStudents.filter(student =>
        student.major.toUpperCase().includes(studentFilters.major.toUpperCase())
      );
    }


    if (studentFilters?.sort === "asc") {
      filteredStudents.sort((a, b) => {
        const aName = String(a.first_name || a.last_name).toLowerCase() || String(a.user.first_name || a.user.last_name).toLowerCase();
        const bName = String(b.first_name || b.last_name).toLowerCase() || String(b.user.first_name || b.user.last_name).toLowerCase();
        return aName.localeCompare(bName);
      });
    } else if (studentFilters?.sort === "desc") {
      filteredStudents.sort((a, b) => {
        const aName = String(a.first_name || a.last_name).toLowerCase() || String(a.user.first_name || a.user.last_name).toLowerCase();
        const bName = String(b.first_name || b.last_name).toLowerCase() || String(b.user.first_name || b.user.last_name).toLowerCase();
        return bName.localeCompare(aName);
      });
    }

    console.log("Filtered Students: ", filteredStudents);

    setFilteredCourseStudents(filteredStudents);
  }, [studentFilters, courseStudents]);

  const handleCourseClick = (index, courseId) => {
    setCourseId(courseId);
    setActiveIndex(index);
  };


  if (loading) return <p>Loading courses...</p>;
  if (!filteredCourses.length) return <p>No courses found.</p>;

  return (
    <div>
      <div className="CourseContainer">

        {!showStudents && (
          <>
            {filteredCourses.map((course, index) => (
              <div
                className={`course ${activeIndex === index ? "activeCourse" : ""}`}
                key={index}
                onClick={() => handleCourseClick(index, userRole === "admin" ? course.id : course.course_id)}
                onDoubleClick={() => handleDoubleClick(userRole === "admin" ? course.id : course.course_id, course.name || course.course_name, course.course_section || course.Section)}
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
                {userRole?.toLowerCase() === "admin" && (
                  <div style={{ position: "relative" }} ref={dropdownRef}>
                    <Icon
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMenuIndex(showMenuIndex === index ? null : index);
                        setActiveIndex(index);

                      }}
                      style={{ cursor: "pointer" }}
                    >
                      more_vert
                    </Icon>

                    {showMenuIndex === index && (
                      <div style={{
                        position: "absolute",
                        top: "25px",
                        right: "0",
                        background: "#fff",
                        padding: "5px",
                        zIndex: 100,
                        minWidth: "120px"
                      }}>
                        <button
                          style={{
                            width: "100%",
                            background: "#f0f0f0",
                            border: "none",
                            padding: "8px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginBottom: "5px",
                            fontWeight: "500",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditCourseClick(course);
                            setShowMenuIndex(null);
                          }}                        >
                          Edit
                        </button>

                        <button
                          style={{
                            width: "100%",
                            background: "#ffe5e5",
                            border: "none",
                            padding: "8px",
                            borderRadius: "5px",
                            color: "#c62828",
                            cursor: "pointer",
                            fontWeight: "500",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}


              </div>
            ))}
          </>
        )}

        {showStudents && (
          <div style={{ width: "100%", display: "flex", flexWrap: "wrap", flexDirection: "row" }} className="studentsContainer"
          >


            {filteredCourseStudents.map((student, index) => (
              <div>
                <StudentCard
                  key={student.student_id}
                  student={student}
                  setEditedStudent={setEditedStudent}
                  setActiveStudent={setActiveStudent}
                  hideIcon={hideIcon}
                />
              </div>
            ))}



          </div>
        )}
      </div>
      {showStudents && (
        <div className="buttonContainer">
          <button className="back-btn" onClick={handleBackToCourses}>
            Back to Courses
          </button>
          {userRole === "admin" && (
            <button className="enroll-btn" onClick={handleEnrollStudents}>
              Enroll Students
            </button>
          )}
          {isPopupVisible && <AdminEnrollStudentsPopup setCourseStudents={setCourseStudents} studentFilters={studentFilters} onStudentFilterChange={onStudentFilterChange} courseStudentID={courseStudentID} onClose={handleClosePopup} />}

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
