import { useState, useEffect, useRef } from "react";
import AdminFilter from "./AdminFilter";
import Course from "../Generals/Course";
import StudentCard from "../Generals/StudentCard";
import InstructorCard from "../Generals/InstructorCard";
import PropTypes from "prop-types";
import { getStudents } from "../../ApiService/StudentService";
import { getInstructors } from "../../ApiService/InstructorService";
import { getCourseStudents } from "../../ApiService/CourseService";
import AdminMainContentTop from "../Admin/AdminMainContentTop";
import { getStudentCourses } from "../../ApiService/CourseService";
import { useCourse } from "../../Contexts/CourseContext";
import { Icon } from "@mui/material";
import { useStudent } from "../../Contexts/getClickedStudentID";
import { deleteStudentCourse } from "../../ApiService/AdminStudentService";
import LoadingSpinner from "../Generals/LoadingSpinner";
export default function AdminMainContent({ selectedText, setSelectedText, courses, setCourses, instructors, setInstructors, students, setStudents, selectedDashboardITem, showAdminPanel, setEditedCourse, setEditedStudent, setEditedInstructor, setFilterTop, filterTop }) {
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewCourseStudents, setViewCourseStudents] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const { setStudentId } = useStudent();
  const { studentId } = useStudent();

  const [openMenuId, setOpenMenuId] = useState(null);

  const [activeCardId, setActiveCardId] = useState(null);
  const [activeInstructorCardId, setActiveInstructorCardId] = useState(null);

  const [courseTitle, setCourseTitle] = useState("Courses");
  const [studentTitle, setStudentTitle] = useState("Students");

  const [filteredStudentCourses, setFilteredStudentCourses] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [studentCourses, setStudentCourses] = useState([])

  const [hoveredCourseId, setHoveredCourseId] = useState(null);

  const { setCourseId } = useCourse();

  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

  const [showMenu, setShowMenu] = useState(false);

  const [courseFilterOptions, setCourseFilterOptions] = useState({ code: "", sort: "", name: "", section: "" });
  const [studentFilterOptions, setStudentFilterOptions] = useState({ studentID: "", name: "", major: "", sort: "" });
  const [instructorFilterOptions, setInstructorFilterOptions] = useState({ instructorName: "", department: "", sort: "" });
  const [filteredInstructors, setFilteredInstructors] = useState([]);
  const [studentCourseFilterOptions, setStudentCourseFilterOptions] = useState({ code: "", name: "", sort: "", section: "" });

  useEffect(() => {
      if(selectedText ==="View Courses"){
        setCourseTitle("Courses"); 
        setFilterTop("Courses")

      }
      if(selectedText !== "View Student Courses"){
        setStudentTitle("Students");
        setStudentCourses([]);
      }
  }, [selectedText]);

  const [onDelete, setOnDelete] = useState(false)

  const [onStudentCourseDelete, setStudentCourseDelete] = useState(false);
  const dropdownRefs = useRef({});



  useEffect(() => {
    const handleClickOutside = (event) => {
      const currentRef = dropdownRefs.current[openMenuId];
      if (currentRef && !currentRef.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);


  useEffect(() => {
    setActiveCardId(null)
    setActiveInstructorCardId(null)
  }, [selectedDashboardITem]);

  // useEffect(() => {
  //   console.log(onDelete)
  // }, [onDelete]);






  const handleStudentDoubleClick = async (studentId, studentName, studentID) => {
    if (userRole != "admin") return;
    if (!studentId) return;
    setCourseId("");
    setStudentId(studentId)

    try {
      const courses = await getStudentCourses(studentId);
      setStudentCourses(courses);
      setStudentTitle(`${studentName} - ${studentID}`);
      setSelectedText("View Student Courses")
    } catch (error) {
      console.error("Failed to fetch student courses:", error);
    }
  };


  const handleBackToStudents = () => {
    setActiveCardId(null)
    setStudentCourses([])
    setFilterTop("Courses");
    setStudentTitle("View Students");
    setSelectedText("View Students")
    setActiveIndex(null);

  };



  useEffect(() => {
    let filtered = [...students];

    if (studentFilterOptions?.studentID) {
      filtered = filtered.filter((student) =>
        student.student_id?.toString().includes(studentFilterOptions.studentID)
      );
    }

    if (studentFilterOptions?.name) {
      filtered = filtered.filter((student) =>
        `${student.first_name || student.user.first_name} ${student.last_name || student.user.last_name}`
          .toUpperCase()
          .includes(studentFilterOptions.name.toUpperCase())
      );
    }

    if (studentFilterOptions?.major) {
      filtered = filtered.filter((student) =>
        student.major?.toUpperCase().includes(studentFilterOptions.major.toUpperCase())
      );
    }

    if (studentFilterOptions?.sort === "asc") {
      filtered.sort((a, b) =>
        `${a.first_name || a.user.first_name} ${a.last_name || b.user.last_name}`.localeCompare(`${b.first_name || b.user.first_name} ${b.last_name || b.user.last_name}`)
      );
    } else if (studentFilterOptions?.sort === "desc") {
      filtered.sort((a, b) =>
        `${b.first_name || a.user.first_name} ${b.last_name || b.user.last_name}`.localeCompare(`${a.first_name || a.user.first_name} ${a.last_name || a.user.last_name}`)
      );
    }

    setFilteredStudents(filtered);
  }, [studentFilterOptions, students, onDelete]);




  useEffect(() => {
    let filtered = [...instructors];

    if (instructorFilterOptions?.instructorName) {
      filtered = filtered.filter((instructor) =>
        `${instructor.first_name} ${instructor.last_name}`
          .toUpperCase()
          .includes(instructorFilterOptions.instructorName.toUpperCase())
      );
    }

    if (instructorFilterOptions?.department) {
      filtered = filtered.filter((instructor) =>
        instructor.instructor?.department?.name
          ?.toUpperCase()
          .includes(instructorFilterOptions.department.toUpperCase())
      );
    }

    if (instructorFilterOptions?.sort === "asc") {
      filtered.sort((a, b) =>
        `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`)
      );
    } else if (instructorFilterOptions?.sort === "desc") {
      filtered.sort((a, b) =>
        `${b.first_name} ${b.last_name}`.localeCompare(`${a.first_name} ${a.last_name}`)
      );
    }
    setFilteredInstructors(filtered);
  }, [instructorFilterOptions, instructors]);

  useEffect(() => {
    let filteredCourses = [...studentCourses];

    if (studentCourseFilterOptions?.code) {
      filteredCourses = filteredCourses.filter((course) =>
        course.course_code
          ?.toUpperCase()
          .includes(studentCourseFilterOptions.code.toUpperCase())
      );
    }

    if (studentCourseFilterOptions?.name) {
      filteredCourses = filteredCourses.filter((course) =>
      (String(course.name).toUpperCase().includes(studentCourseFilterOptions.name.toUpperCase()) ||
        String(course.course_name).toUpperCase().includes(studentCourseFilterOptions.name.toUpperCase()))
      );
    }

    if (studentCourseFilterOptions?.section) {
      filteredCourses = filteredCourses.filter(course =>
        String(course.section) === String(studentCourseFilterOptions.section) ||
        String(course.course_section) === String(studentCourseFilterOptions.section)
      );
    }


    if (studentCourseFilterOptions?.sort === "asc") {
      filteredCourses.sort((a, b) => a.course_code.localeCompare(b.course_code));
    } else if (studentCourseFilterOptions?.sort === "desc") {
      filteredCourses.sort((a, b) => b.course_code.localeCompare(a.course_code));
    }

    setFilteredStudentCourses(filteredCourses);
  }, [studentCourseFilterOptions, studentCourses]);

  const handleCourseClick = (index, courseId) => {
    setCourseId(courseId);
    setActiveIndex(index);

  };



  const handleCourseDoubleClick = async (courseId) => {
    setLoading(true);
    setSelectedCourseId(courseId);
    setViewCourseStudents(true);
    setCourseId(courseId);
    try {
      const enrolledStudents = await getCourseStudents(courseId);
      setStudents(enrolledStudents);
    } catch (error) {
      console.error("Failed to fetch enrolled students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      if (!onDelete) return;

      try {
        const studentsAfterDelete = await getStudents();
        setStudents(studentsAfterDelete);
        if (onDelete) setOnDelete(false);
      } catch (error) {
        console.error("Error fetching students after delete:", error);
      }
    };

    fetchStudents();
  }, [onDelete]);


  useEffect(() => {
    const fetchStudentCourses = async () => {
      if (userRole !== "admin" || !studentId) return;

      try {
        const coursesAfterDelete = await getStudentCourses(studentId);
        setStudentCourses(coursesAfterDelete);
      } catch (error) {
        console.error("Failed to fetch student courses:", error);
      }
    };

    fetchStudentCourses();
  }, [onStudentCourseDelete]);



  useEffect(() => {
    const fetchInstructors = async () => {
      if (!onDelete) return;

      try {
        const instructorsAfterDelete = await getInstructors();
        setInstructors(instructorsAfterDelete);
        if (onDelete) setOnDelete(false);
      } catch (error) {
        console.error("Error fetching students after delete:", error);
      }
    };

    fetchInstructors();
  }, [onDelete]);


  useEffect(() => {
    setViewCourseStudents(false);

    if (selectedDashboardITem === "View Students") {
      setLoading(true);
      getStudents()
        .then((data) => {
          setStudents(data);
          setFilteredStudents(data);
        })
        .catch((err) => console.error("Failed to fetch students:", err))
        .finally(() => setLoading(false));
    } else if (selectedDashboardITem === "View Instructors") {
      setLoading(true);
      getInstructors()
        .then(setInstructors)
        .catch((err) => console.error("Failed to fetch instructors:", err))
        .finally(() => setLoading(false));
    }
  }, [selectedDashboardITem]);



  return (
    <>
      {selectedDashboardITem === "View Students" || selectedDashboardITem === "View Student Courses" ? (
        <div
          style={{
            width: "48%",
            padding: "57px",
            paddingBottom: "0",
            borderRadius: "66px 0 0 66px",
            display: "flex",
            flexDirection: "column",
            gap: "17px",
            position: "relative",
          }}
        >
          <AdminMainContentTop onCourseFilterChange={setCourseFilterOptions} title={studentTitle} showAdminPanel={showAdminPanel} />
          <AdminFilter selectedText={selectedText} studentCourses={studentCourses} onStudentCoursesFilterChange={setStudentCourseFilterOptions} onStudentFilterChange={setStudentFilterOptions} onCourseFilterChange={setCourseFilterOptions} title="StudentFilter" />
          {loading ? (
            <LoadingSpinner/>
          ) : studentCourses.length === 0 ? (
            <div className="StudentContainer" style={{ display: "flex", flexWrap: "wrap" }}>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <StudentCard
                    key={student.student_id}
                    student={student}
                    setEditedStudent={setEditedStudent}
                    handleStudentDoubleClick={handleStudentDoubleClick}
                    activeCardId={activeCardId}
                    setActiveCardId={setActiveCardId}
                    setOnDelete={setOnDelete}
                  />
                ))
              ) : (
                <p>No students found</p>
              )}
            </div>
          ) : (
            <div className="StudentContainer" style={{ display: "flex", flexWrap: "wrap" }}>
              {filteredStudentCourses.length > 0 ? (
                filteredStudentCourses.map((course, index) => (
                  <div
                    onMouseEnter={() => setHoveredCourseId(course.id)}
                    onMouseLeave={() => setHoveredCourseId(null)}
                    ref={(el) => (dropdownRefs.current[course.id] = el)}
                    isHovered={hoveredCourseId === course.id}
                    className={`studentCourse ${activeIndex === index ? "activeCourse" : ""}`}
                    key={index}
                    onClick={() => handleCourseClick(index, userRole === "admin" ? course.id : course.course_id)}
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
                              ? `${course.instructors[0]?.instructor_name || ''}`
                              : course.instructor_name}
                        </p>
                      </div>
                    </div>
                    {userRole?.toLowerCase() === "admin" && course.absence_percentage !== undefined && (
                      <div className="percentageContainer" style={{ position: "relative" }}>
                        {hoveredCourseId === course.id && course.absence_percentage !== "Dropped" ? (
                          <Icon
                            onClick={() => setOpenMenuId(prevId => prevId === course.id ? null : course.id)}
                            style={{ cursor: "pointer", width: "1 rem" }}
                          >
                            more_vert
                          </Icon>
                        ) : (
                          <>
                            {course.absence_percentage === "Dropped" ? (
                              <p className="coursePercentage" style={{ color: "red", fontWeight: "bold" }}>
                                Dropped
                              </p>
                            ) : (
                              <>
                                <p className="coursePercentage">{`${course.absence_percentage}`}</p>
                                <span>Absence</span>
                                <span>Percentage</span>
                              </>
                            )}
                          </>

                        )}
                        {openMenuId === course.id && (
                          <div
                            style={{
                              position: "absolute",
                              top: "5px",
                              right: "0px",
                              background: "#fff",
                              padding: "5px",
                              zIndex: 100,
                              minWidth: "120px",
                              border: "1px solid #ddd",
                              borderRadius: "5px",
                            }}
                          >
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
                              onClick={async (e) => {
                                e.stopPropagation();
                                const result = await deleteStudentCourse(course.id, studentId);
                                setStudentCourseDelete(true);
                                // if (result.success) {
                                //   console.log(result.message);
                                // } else {
                                //   console.error(result.message);
                                // }
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No courses found for student</p>
              )}
            </div>
          )}

          {studentCourses.length > 0 && (
            <button
              className="back-students-btn"
              onClick={handleBackToStudents}
            >
              Back to Students
            </button>
          )}
        </div>
      ) : selectedDashboardITem === "View Courses" || selectedDashboardITem == "View Course Students" || !selectedDashboardITem ? (
        <div
          style={{
            width: "48%",
            padding: "57px",
            paddingBottom: "0",
            borderRadius: "66px 0 0 66px",
            display: "flex",
            flexDirection: "column",
            gap: "17px",
          }}
        >
          <AdminMainContentTop onCourseFilterChange={setCourseFilterOptions} title={courseTitle} />
          <AdminFilter filterTop={filterTop} onStudentFilterChange={setStudentFilterOptions} onCourseFilterChange={setCourseFilterOptions} title="CourseFilter" />
          <div className="">
            <Course setSelectedText={setSelectedText} setCourseTitle={setCourseTitle} setStudents={setStudents} setViewCourseStudents={setViewCourseStudents} setStudentFilters={setStudentFilterOptions} courses={courses} setCourses={setCourses} studentFilters={studentFilterOptions} setFilterTop={setFilterTop} courseFilters={courseFilterOptions} setEditedStudent={setEditedStudent} onCourseDoubleClick={handleCourseDoubleClick} setEditedCourse={setEditedCourse} onStudentFilterChange={setStudentFilterOptions} />
          </div>

        </div>
      ) : selectedDashboardITem === "View Instructors" ? (
        <div
        style={{
          width: "48%",
          padding: "57px",
          paddingBottom: "0",
          borderRadius: "66px 0 0 66px",
          display: "flex",
          flexDirection: "column",
          gap: "17px",
          ...( loading && { position: 'relative', minHeight: '500px' } )
        }}
        >
          <AdminMainContentTop title="Instructors" />
          <AdminFilter onInstructorFilterChange={setInstructorFilterOptions} title="InstructorFilter" />
          {loading ? (
            <LoadingSpinner/>
          ) : (
            <div className="InstructorContainer" >

              {filteredInstructors.length > 0 ? (
                filteredInstructors.map((instructor) => (
                  <InstructorCard
                    key={instructor.id}
                    instructor={instructor}
                    setEditedInstructor={setEditedInstructor}
                    activeInstructorCardId={activeInstructorCardId}
                    setActiveInstructorCardId={setActiveInstructorCardId}
                    setOnDelete={setOnDelete}
                  />
                ))
              ) : (
                <p>No instructors found.</p>
              )}

            </div>

          )}
        </div>
      ) : null}

    </>
  );
}
