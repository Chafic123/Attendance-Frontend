import { useState, useEffect } from "react";
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
import AdminEnrollStudentsPopup from "./AdminEnrollStudentsPopup";

export default function AdminMainContent({ setSelectedText, courses, setCourses, instructors, setInstructors, students, setStudents, selectedDashboardITem, showAdminPanel, setEditedCourse, setEditedStudent, setEditedInstructor, setFilterTop, filterTop }) {
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewCourseStudents, setViewCourseStudents] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const [courseTitle, setCourseTitle] = useState("Courses");
  const [studentTitle, setStudentTitle] = useState("Students");

  const [filteredStudentCourses, setFilteredStudentCourses] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [studentCourses, setStudentCourses] = useState([])

  const { setCourseId } = useCourse();
  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

  const [courseFilterOptions, setCourseFilterOptions] = useState({ code: "", sort: "", name: "", section: "" });
  const [studentFilterOptions, setStudentFilterOptions] = useState({ studentID: "", name: "", major: "", sort: "" });
  const [instructorFilterOptions, setInstructorFilterOptions] = useState({ instructorName: "", department: "", sort: "" });
  const [filteredInstructors, setFilteredInstructors] = useState([]);
  const [studentCourseFilterOptions, setStudentCourseFilterOptions] = useState({ code: "", name:"", sort: "", section: "" });



  // Testing
  // useEffect(() => {
  //   console.log("viewCourseStudents: ", viewCourseStudents)
  // }, [viewCourseStudents]);



 


  const handleStudentDoubleClick = async (studentId, studentName,studentID) => {
    if (userRole != "admin") return;
    if (!studentId) return;
    setCourseId("");
    try {
      const courses = await getStudentCourses(studentId);
      setStudentCourses(courses);
      setStudentTitle(`${studentName} - ${studentID}`);
      setSelectedText("View Student Courses")
      console.log("Student ID: ", studentId, "Courses: ", courses)
    } catch (error) {
      console.error("Failed to fetch student courses:", error);
    }
  };


  const handleBackToStudents = () => {
    setStudentCourses([])
    setFilterTop("Courses");
    setStudentTitle("Students");
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
  }, [studentFilterOptions, students]);

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
    console.log("Double Clicked")
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
          <AdminFilter studentCourses={studentCourses} onStudentCoursesFilterChange={setStudentCourseFilterOptions} onStudentFilterChange={setStudentFilterOptions} onCourseFilterChange={setCourseFilterOptions} title="StudentFilter" />
          {loading ? (
            <p>Loading students...</p>
          ) : studentCourses.length === 0 ? (
            <div className="StudentContainer" style={{ display: "flex", flexWrap: "wrap" }}>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <StudentCard
                    key={student.student_id}
                    student={student}
                    setEditedStudent={setEditedStudent}
                    handleStudentDoubleClick={handleStudentDoubleClick}

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
      ) : selectedDashboardITem === "View Courses" || selectedDashboardITem=="View Course Students" || !selectedDashboardITem ? (
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
          }}
        >
          <AdminMainContentTop title="Instructors" />
          <AdminFilter onInstructorFilterChange={setInstructorFilterOptions} title="InstructorFilter" />
          {loading ? (
            <p>Loading instructors...</p>
          ) : (
            <div className="InstructorContainer">
              {filteredInstructors.length > 0 ? (
                filteredInstructors.map((instructor) => (
                  <InstructorCard
                    key={instructor.id}
                    instructor={instructor}
                    setEditedInstructor={setEditedInstructor}
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

AdminMainContent.propTypes = {
  selectedDashboardITem: PropTypes.string.isRequired,
  showAdminPanel: PropTypes.bool.isRequired,
};