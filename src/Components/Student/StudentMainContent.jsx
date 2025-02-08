import StudentFilter from "./StudentFilter";
import Course from "../Generals/Course";
import MainContentTopSI from "./MainContentTopSI";
import PropTypes from "prop-types";
import StudentNotificationCenter from "./StudentNotificationCenter";

export default function StudentMainContent({ selectedDashboardITem, viewProfile }) {
  return (
    <>
      {selectedDashboardITem === "View Courses" ? (
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
          <MainContentTopSI title="Courses" viewProfile={viewProfile} />
          <div>
            <StudentFilter title="StudentFilter" />
          </div>
          <Course studentEmail="student1@example.com" />
        </div>
      ) : selectedDashboardITem === "View Schedule" ? (
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
          <MainContentTopSI title="Schedule" viewProfile={viewProfile} />
        </div>
      ) : selectedDashboardITem === "View Notifications" ? (
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
          <MainContentTopSI title="Notifications" viewProfile={viewProfile} />
          <StudentNotificationCenter />
        </div>
      ) : (
        <MainContentTopSI title="Courses" viewProfile={viewProfile} />
      )}
    </>
  );
}

StudentMainContent.propTypes = {
  selectedDashboardITem: PropTypes.string.isRequired,
  viewProfile: PropTypes.func.isRequired, 
};
