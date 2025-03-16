import { useSearchParams } from "react-router-dom";
import StudentFilter from "./StudentFilter";
import Course from "../Generals/Course";
import MainContentTopSI from "./MainContentTopSI";
import PropTypes from "prop-types";
import StudentNotificationCenter from "./StudentNotificationCenter";
import "../../CSS/StudentMainContent.css";
import StudentScheduleReport from "./StudentScheduleReport";
import { useEffect } from "react";

export default function StudentMainContent({ selectedDashboardITem, viewProfile, viewPanelIphone }) {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get("search")) {
      setSearchParams({});
    }
  }, []); 

  const handleSearch = (query) => {
    const currentSearch = searchParams.get("search") || "";
    
    if (query !== currentSearch) {
      if (query) {
        setSearchParams({ search: query }); // ✅ Update only if different
      } else {
        setSearchParams({});
      }
    }
  };

  return (
    <>
      <img
        onClick={viewPanelIphone}
        className="notification-schedule-icon"
        src="../public/Images/Notification-Schedule-icon.png"
        alt=""
      />
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
          {/* ✅ Pass `handleSearch` to prevent unnecessary URL updates */}
          <MainContentTopSI title="Courses" viewProfile={viewProfile} onSearch={handleSearch} />
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
          <StudentScheduleReport />
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
          <MainContentTopSI title="Courses" viewProfile={viewProfile} onSearch={handleSearch} />
          <div className="studentFilterContainer">
            <StudentFilter title="StudentFilter" />
          </div>
          <Course />
        </div>
      )}
    </>
  );
}

StudentMainContent.propTypes = {
  selectedDashboardITem: PropTypes.string.isRequired,
  viewProfile: PropTypes.func.isRequired,
  viewPanelIphone: PropTypes.func.isRequired,
};
