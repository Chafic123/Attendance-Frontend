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
import { downloadCourseAttendanceReport } from "../../ApiService/CourseService";
import { downloadStudentAttendanceReport } from "../../ApiService/AdminStudentService";
import LoadingSpinner from "./LoadingSpinner";
export default function Course({ setSelectedText, studentCourseFilters, setCourseTitle, setStudents, courses, setCourses, courseFilters, studentFilters, setStudentFilters, setSelectedCourseID, setActiveStudent, setFilterTop, setEditedCourse, setEditedStudent, onStudentFilterChange }) {
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filteredStudentCourses, setFilteredStudentCourses] = useState([]);

  const [onDelete, setOnDelete] = useState(false)

  const [activeCardId, setActiveCardId] = useState(null);

  const [hideIcon, setHideIcon] = useState(false);
  const [courseStudentID, setCourseStudentID] = useState("")

  const { setStudentId } = useStudent();
  const { studentId } = useStudent();


  const [activeIndex, setActiveIndex] = useState(null);

  const [loading, setLoading] = useState(true);
  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

  const [showMenuIndex, setShowMenuIndex] = useState(null);

  const { setCourseId } = useCourse();
  const { courseId } = useCourse();
  const { user } = useUser();





  const [showStudents, setShowStudents] = useState(false);

  const [courseStudents, setCourseStudents] = useState([]);
  const [filteredCourseStudents, setFilteredCourseStudents] = useState([]);

  const [isPopupVisible, setPopupVisible] = useState(false);



  const handleDoubleClick = async (courseId, courseName, courseSection) => {
    setCourseStudentID(courseId);
    setCourseId(courseId);

    if (userRole !== "instructor" && userRole !== "admin") {
      return;
    }
    if (userRole == "instructor") {
      setSelectedCourseID(courseId);
    }
    try {
      const students = await getCourseStudents(courseId);
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
  //here
  useEffect(() => {

    const fetchStudents = async () => {

      if (!onDelete) return;
      try {
        const studentsAfterDelete = await getCourseStudents(courseId);
        setCourseStudents(studentsAfterDelete);
        if (onDelete) setOnDelete(false);
      } catch (error) {
        console.error("Error fetching students after delete:", error);
      }
    };

    fetchStudents();
  }, [onDelete])

  // useEffect(() => {
  //   console.log("hi", onDelete)
  // }, [onDelete])

  const handleEditCourseClick = (course) => {
    setEditedCourse(course);
  }
  useEffect(() => {
    console.log("Course ID: ", courseId)
    console.log("Student ID: ", studentId)
  }, [courseId, studentId])
  const handleGenerateStudentReport = async () => {
    if (!courseId || !studentId) return;
    setIsGenerating(true);
    try {
      await downloadStudentAttendanceReport(studentId, courseId);
    } catch (error) {
      console.error("Failed to generate student attendance report:", error.message);
    } finally {
      setActiveIndex(null);
      setIsGenerating(false);
      setStudentId(null);

    }
  };
  const handleGenerateCourseStudentReport = async () => {
    if (!courseId) return;

    setIsGenerating(true);
    try {
      await downloadCourseAttendanceReport(courseId);
    } finally {
      setIsGenerating(false);
      setCourseId(null);
      setActiveIndex(null);

    }
  };


  const handleBackToCourses = () => {
    setActiveCardId(null)
    setStudentId(null)
    setCourseId(null)
    setEditedStudent(null)
    setFilterTop("Courses");
    setSelectedText("View Courses")
    setCourseTitle("Courses");
    setShowStudents(false);
    setActiveStudent(null);
    setCourseStudents([]);
    setActiveIndex(null);

  };

  const [isGenerating, setIsGenerating] = useState(false);

  const handleEnrollStudents = () => {
    setStudentFilters({ studentID: "", name: "", major: "", sort: "" });
    setPopupVisible(true);
  };
  const handleClosePopup = () => {
    setStudentFilters({ studentID: "", name: "", major: "", sort: "" });
    setPopupVisible(false);
  };

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside any course element
      if (!event.target.closest('.course')) {
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

    // Filter by course code
    if (courseFilters?.code) {
      filtered = filtered.filter(course =>
      (course.course_code?.toUpperCase().includes(courseFilters.code.toUpperCase()) ||
        course.Code?.toUpperCase().includes(courseFilters.code.toUpperCase()))
      );
    }

    // Filter by course name
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
        String(course.course_section) === String(courseFilters.section)
      );
    }

    // Sorting logic based on 'asc' or 'desc'
    if (courseFilters?.sort === "asc") {
      filtered.sort((a, b) => {
        const aKey = (a.name || a.course_name || "").toLowerCase();
        const bKey = (b.name || b.course_name || "").toLowerCase();
        return aKey.localeCompare(bKey);
      });
    } else if (courseFilters?.sort === "desc") {
      filtered.sort((a, b) => {
        const aKey = (a.name || a.course_name || "").toLowerCase();
        const bKey = (b.name || b.course_name || "").toLowerCase();
        return bKey.localeCompare(aKey);
      });
    }


    setFilteredCourses(filtered);
  }, [courses, courseFilters]);


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

    if (studentFilters?.name) {
      filteredStudents = filteredStudents.filter(student =>
        (student.first_name + " " + student.last_name).toUpperCase().includes(studentFilters.name.toUpperCase())
      );
    }

    if (studentFilters?.studentID) {
      filteredStudents = filteredStudents.filter(student =>
        String(student.Uni_id).includes(studentFilters.studentID) ||
        String(student.student_id).includes(studentFilters.studentID)
      );
    }

    if (studentFilters?.major) {
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


    setFilteredCourseStudents(filteredStudents);
  }, [studentFilters, courseStudents]);

  const handleCourseClick = (index, courseId) => {
    setCourseId(courseId);
    setActiveIndex(index);
  };



  return (
    <div>
      <div className="CourseContainer" style={loading ? {
        position: 'relative',
        minHeight: '400px'
      } : {}} > {/* Added Loading */}
          {loading ? (
            <LoadingSpinner />
          ) : !showStudents ? (
            <>
              {filteredCourses.map((course, index) => (
                <div
                  className={`course ${activeIndex === index ? "activeCourse" : ""}`}
                  key={index}
                  onClick={() => handleCourseClick(index, userRole === "admin" ? course.id : course.course_id)}
                >
                  <div className="courseDetails">
                    <div className="courseBorder"></div>
                    <div className="courseText">
                      <p className="courseCode">{course.course_code || course.Code}</p>
                      <p className="courseName">{course.course_name || course.name}</p>
                      <p className="courseInstructor">
                        <span className="courseInstructor"> {/*It was <p>*/}
                          {userRole?.toLowerCase() === "instructor"
                            ? `${course.name}`
                            : userRole?.toLowerCase() === "admin"
                              ? `${course.instructors?.[0]?.user?.first_name || ''} ${course.instructors?.[0]?.user?.last_name || ''}`
                              : typeof course.instructor_name === "object"
                                ? `${course.instructor_name?.first_name || ''} ${course.instructor_name?.last_name || 'No Instructor Found'}`
                                : course.instructor_name || "No Instructor Found"}
                        </span>
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
                  {(userRole?.toLowerCase() === "admin" || userRole?.toLowerCase() === "instructor") && (
                    <div style={{ position: "relative" }} ref={dropdownRef}>

                      {userRole.toLowerCase() === "instructor" && (
                        <button
                          style={{
                            width: "100%",
                            background: !courseId
                              ? "linear-gradient(180deg, #604099 0%, #4A5DA9 100%)"
                              : "#1496D3",
                            color: "white",
                            border: "none",
                            padding: "8px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginBottom: "0px",
                            fontWeight: "500",
                          }}
                          onClick={() => {
                            handleDoubleClick(
                              course.course_id,
                              course.course_name,
                              course.course_section || course.Section
                            );
                          }}
                        >
                          View Students
                        </button>
                      )}

                      {/* ADMIN: Icon with dropdown options */}
                      {userRole.toLowerCase() === "admin" && (
                        <>
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
                            <div
                              style={{
                                position: "absolute",
                                top: "-28px",
                                right: "0px",
                                background: "#fff",
                                padding: "5px",
                                zIndex: 100,
                                minWidth: "120px",
                              }}
                            >
                              {/* View Students */}
                              <button
                                style={{
                                  width: "100%",
                                  background: "#1496D3",
                                  color: "white",
                                  border: "none",
                                  padding: "3px 8px",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  marginBottom: "5px",
                                  fontWeight: "500",
                                }}
                                onClick={() => {
                                  handleDoubleClick(course.id, course.name, course.course_section || course.Section);
                                }}
                              >
                                View Students
                              </button>

                              {/* Edit */}
                              <button
                                style={{
                                  width: "100%",
                                  background: "#f0f0f0",
                                  border: "none",
                                  padding: "3px 8px",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  marginBottom: "5px",
                                  fontWeight: "500",
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditCourseClick(course);
                                  setShowMenuIndex(null);

                                  const isMobile = window.matchMedia(
                                    '(max-width: 431px) and (max-height: 932px), ' +
                                    '(max-width: 413px) and (max-height: 916px)'
                                  ).matches;

                                  if (isMobile) {
                                    const adminPanel = document.querySelector(".AdminPanelParent");
                                    if (adminPanel) {
                                      adminPanel.style.display = "block";
                                      adminPanel.style.zIndex = "1000";
                                    }
                                  }
                                }}
                              >
                                Edit
                              </button>

                              {/* Delete */}
                              <button
                                style={{
                                  width: "100%",
                                  background: "#ffe5e5",
                                  border: "none",
                                  padding: "3px 8px",
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
                        </>
                      )}
                    </div>
                  )}



                </div>
              ))}
            </>
          ) : showStudents ? (
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
                    activeCardId={activeCardId}
                    setActiveCardId={setActiveCardId}
                    setOnDelete={setOnDelete}
                  />
                </div>
              ))}
              {userRole === "instructor" && (
                <button
                  onClick={handleGenerateStudentReport}
                  className={`generate-studentCourse-report-btn ${!studentId ? 'disabled' : ''}`}
                  disabled={!studentId || isGenerating}
                >
                  {isGenerating ? "Generating..." : "Generate Report"}
                </button>
              )}



            </div>
          ):null}
        </div>
        {(userRole === "admin" || userRole === "instructor") && !showStudents && (
          <button
            className={`generate-report-btn ${!courseId || isGenerating ? "disabled" : ""}`}
            onClick={handleGenerateCourseStudentReport}
            disabled={!courseId || isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Report"}
          </button>

        )}


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
        {/* {userRole === "instructor" && (
        <button className="back-btn" onClick={handleGenerateCourseStudentReport}>
          Generate Report
        </button>
      )} */}
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
