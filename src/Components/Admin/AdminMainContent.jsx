import AdminFilter from "./AdminFilter";
import Course from "../Generals/Course";
import MainContentTop from "./AdminMainContentTop";
import StudentCard from "../Generals/StudentCard";
import PropTypes from "prop-types";

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
          <MainContentTop title="Students" />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "40px",
            }}
          >
            <AdminFilter title="StudentFilter" />
            <StudentCard />
            <StudentCard />
            <StudentCard />
            <StudentCard />
            <StudentCard />
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
          <Course/>
          <Course />

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
          <MainContentTop title="Instructors" />
          <AdminFilter title="InstructorFilter" />
        </div>
      ) : (
        <MainContentTop title="Courses" />
      )}
    </>
  );
}

AdminMainContent.propTypes = {
  selectedDashboardITem: PropTypes.string.isRequired, 
};
