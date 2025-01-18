import StudentFilter from "./StudentFilter";
import Course from "../Generals/Course";
import MainContentTopSI from "./MainContentTopSI";
import PropTypes from "prop-types";

export default function StudentMainContent(props) {

  // const handleCourseClick = (id) => {
    
  // }

  // const handleStudentClick = (id) => {
    
  // }

  // const handleInstructorClick = (id) => {
    
  // }

  return (
    <>
      {props.selectedDashboardITem === "View Courses" ? (
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
          <MainContentTopSI title="Courses" />
          <div>
            <StudentFilter title="StudentFilter" />
          </div>
          <Course />
        </div>
      ) : props.selectedDashboardITem === "View Schedule" ? (
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
          <MainContentTopSI title="Schedule" />
        </div>
      ) : props.selectedDashboardITem === "View Notifications" ? (
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
          <MainContentTopSI title="Notifications" />
        </div>
      ) : (
        <MainContentTopSI title="Courses" />
      )}
    </>
  );
}

StudentMainContent.propTypes = {
  selectedDashboardITem: PropTypes.string.isRequired, 
};
