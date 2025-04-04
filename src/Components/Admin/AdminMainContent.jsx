import { useState, useEffect } from "react";
import AdminFilter from "./AdminFilter";
import Course from "../Generals/Course";
import StudentCard from "../Generals/StudentCard";
import InstructorCard from "../Generals/InstructorCard";
import PropTypes from "prop-types";
import { getStudents } from "../../ApiService/StudentService";
import { getInstructors } from "../../ApiService/InstructorService";
import { getCourseStudents } from "../../ApiService/CourseService";
import MainContentTopSI from "../Student/MainContentTopSI";


export default function AdminMainContent({courses, setCourses, instructors, setInstructors, students, setStudents, selectedDashboardITem, showAdminPanel, setEditedCourse, setEditedStudent, setEditedInstructor, setFilterTop, filterTop }) {
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewCourseStudents, setViewCourseStudents] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const [courseFilterOptions, setCourseFilterOptions] = useState({ code: "", sort: "", name: "", section: "" });
  const [studentFilterOptions, setStudentFilterOptions] = useState({ studentID: "", name: "", major: "", sort: "" });
  const [instructorFilterOptions, setInstructorFilterOptions] = useState({ instructorName: "", department: "", sort: "" });
  const [filteredInstructors, setFilteredInstructors] = useState([]);


  // Testing
  useEffect(() => {
    console.log("instructorFilterOptions: ", instructorFilterOptions)
  }, [instructorFilterOptions]);

  const handleCancelViewCourseStudents = () => {
    setViewCourseStudents(false);
    setSelectedCourseId(null);
    setStudents([]);
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


  useEffect(() => {
    let filtered = [...students];

    // Apply filters only if there are filter options set
    if (studentFilterOptions?.studentID) {
      filtered = filtered.filter((student) =>
        student.student_id?.toString().includes(studentFilterOptions.studentID)
      );
    }

    if (studentFilterOptions?.name) {
      filtered = filtered.filter((student) =>
        `${student.user.first_name} ${student.user.last_name}`
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
        `${a.user.first_name} ${a.user.last_name}`.localeCompare(`${b.user.first_name} ${b.user.last_name}`)
      );
    } else if (studentFilterOptions?.sort === "desc") {
      filtered.sort((a, b) =>
        `${b.user.first_name} ${b.user.last_name}`.localeCompare(`${a.user.first_name} ${a.user.last_name}`)
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

  return (
    <>
      {selectedDashboardITem === "View Students" ? (
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
          <MainContentTopSI onCourseFilterChange={setCourseFilterOptions} title="Students" showAdminPanel={showAdminPanel} />
          <AdminFilter onStudentFilterChange={setStudentFilterOptions} onCourseFilterChange={setCourseFilterOptions} title="StudentFilter" />
          {loading ? (
            <p>Loading students...</p>
          ) : (
            <div className="StudentContainer" style={{display:"flex",flexWrap:"wrap"}}>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <StudentCard
                    key={student.student_id}
                    student={student}
                    setEditedStudent={setEditedStudent}
                  />
                ))
              ) : (
                <p>No students found</p>
              )}
            </div>
          )}
        </div>
      ) : selectedDashboardITem === "View Courses" && !viewCourseStudents ? (
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
          <MainContentTopSI onCourseFilterChange={setCourseFilterOptions} title="Courses" />
          <AdminFilter filterTop={filterTop} onStudentFilterChange={setStudentFilterOptions} onCourseFilterChange={setCourseFilterOptions} title="CourseFilter" />
          <div className="">
            <Course setStudentFilters={setStudentFilterOptions} courses={courses} setCourses={setCourses} studentFilters={studentFilterOptions} setFilterTop={setFilterTop} courseFilters={courseFilterOptions} setEditedStudent={setEditedStudent} onCourseDoubleClick={handleCourseDoubleClick} setEditedCourse={setEditedCourse} onStudentFilterChange={setStudentFilterOptions} />
          </div>
        </div>
      ) : selectedDashboardITem === "View Courses" && viewCourseStudents ? (
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
          <MainContentTopSI
            title="Enrolled Students"
            showAdminPanel={showAdminPanel}
          />
          <AdminFilter filterTop={filterTop} title="StudentFilter" />

          {loading ? (
            <p>Loading enrolled students...</p>
          ) : (
            <div className="courseStudentContainer">
              <div className="StudentContainer">
                {students.length > 0 ? (
                  students.map((student) => (
                    <StudentCard
                      key={student.student_id}
                      student={student}

                    />
                  ))
                ) : (
                  <p>No enrolled students found.</p>
                )}
              </div>

              <button className="viewAdminCourses" onClick={handleCancelViewCourseStudents}>
                Cancel
              </button>
            </div>
          )}
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
          <MainContentTopSI title="Instructors" />
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