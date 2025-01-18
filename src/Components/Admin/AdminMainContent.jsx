import AdminFilter from "./AdminFilter";
import Course from "../Generals/Course";
import Calender from "../Generals/CalenderForm";
import MainContentTop from "../MainContentTop";
import StudentCard from "../Generals/StudentCard";

import PropTypes from "prop-types"; 
// import AdminPanel from "./AdminPanel";

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
            width: "57%",
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
            width: "57%",
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
          {/* <AdminPanel title="AddCourse"/> */}

        </div>
      ) : props.selectedDashboardITem === "View Instructors" ? (
        <div
          style={{
            width: "57%",
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
          <Calender />
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
