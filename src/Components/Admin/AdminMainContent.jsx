import { useState, useEffect } from "react";
import AdminFilter from "./AdminFilter";
import Course from "../Generals/Course";
import MainContentTop from "./AdminMainContentTop";
import StudentCard from "../Generals/StudentCard";
import InstructorCard from "../Generals/InstructorCard";
import PropTypes from "prop-types";
import { getStudents } from "../../ApiService/StudentService";
import { getInstructors } from "../../ApiService/InstructorService";
import { getCourseStudents } from "../../ApiService/CourseService";

export default function AdminMainContent({ selectedDashboardITem, showAdminPanel, setEditedCourse, setEditedStudent }) {
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewCourseStudents, setViewCourseStudents] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const handleCancelViewCourseStudents = () => {
    setViewCourseStudents(false); // ✅ Return to course list view
    setSelectedCourseId(null);   
    setStudents([]);              
  };

  useEffect(() => {
    // Reset view when switching dashboard items
    setViewCourseStudents(false);

    if (selectedDashboardITem === "View Students") {
      setLoading(true);
      getStudents()
        .then(setStudents)
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

  const handleCourseDoubleClick = async (courseId) => {
    setLoading(true);
    setSelectedCourseId(courseId);
    setViewCourseStudents(true);  // Show enrolled students
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
          <MainContentTop title="Students" showAdminPanel={showAdminPanel} />
          <AdminFilter title="StudentFilter" />
          {loading ? (
            <p>Loading students...</p>
          ) : (
            <div className="StudentContainer">
              {students.length > 0 ? (
                students.map((student) => (
                  <StudentCard
                    key={student.student_id}
                    student={student}
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
          <MainContentTop title="Courses" />
          <AdminFilter title="CourseFilter" />
          <div className="">
            <Course setEditedStudent={setEditedStudent} onCourseDoubleClick={handleCourseDoubleClick} setEditedCourse={setEditedCourse} />
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
          <MainContentTop
            title="Enrolled Students"
            showAdminPanel={showAdminPanel}
          />
          <AdminFilter title="StudentFilter" />

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
        <MainContentTop title="Instructors" />
        <AdminFilter title="InstructorFilter" />
        {loading ? (
          <p>Loading instructors...</p>
        ) : (
          <div className="InstructorContainer">
            {instructors.length > 0 ? (
              instructors.map((instructor) => (
                <InstructorCard
                  key={instructor.id}
                  firstName={instructor.first_name || "Unknown"}
                  lastName={instructor.last_name || ""}
                  department={instructor.instructor?.department?.name || "N/A"}
                  id={instructor.instructor?.id || "N/A"}
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