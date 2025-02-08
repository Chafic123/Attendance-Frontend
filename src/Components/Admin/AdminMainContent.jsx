import AdminFilter from "./AdminFilter";
import Course from "../Generals/Course";
import MainContentTop from "./AdminMainContentTop";
import StudentCard from "../Generals/StudentCard";
import PropTypes from "prop-types";
import InstructorCard from "../Generals/InstructorCard";

export default function AdminMainContent(props) {

  // const handleCourseClick = (id) => {

  // }

  // const handleStudentClick = (id) => {

  // }

  // const handleInstructorClick = (id) => {

  // }

  return (
    <>
      {props.selectedDashboardITem === "View Students" ? (
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
          <MainContentTop title="Students" showAdminPanel={props.showAdminPanel}/>
          <AdminFilter title="StudentFilter" />

          <div className="StudentContainer"

          >
            <StudentCard user="Admin" />
            <StudentCard user="Admin" />
            <StudentCard user="Admin" />
            <StudentCard user="Admin" />
            <StudentCard user="Admin" />
          </div>
        </div>
      ) : props.selectedDashboardITem === "View Courses" ? (
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

          <div className="CourseContainer">
            <Course user="Admin" />
            <Course user="Admin" />
            <Course user="Admin" />
          </div>

        </div>
      ) : props.selectedDashboardITem === "View Instructors" ? (
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
          <MainContentTop title="Instructors"/>
          <AdminFilter title="InstructorFilter" />

          <div className="InstructorContainer">
            <InstructorCard user="Admin"/>
            <InstructorCard user="Admin"/>
            <InstructorCard user="Admin"/>
            
          </div>
        </div>
      ) : null}
    </>
  );
}

AdminMainContent.propTypes = {
  selectedDashboardITem: PropTypes.string.isRequired,
};
