import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import StudentFilter from "./StudentFilter";
import Course from "../Generals/Course";
import MainContentTopSI from "./MainContentTopSI";
import PropTypes from "prop-types";
import StudentNotificationCenter from "./StudentNotificationCenter";
import "../../CSS/StudentMainContent.css";
import StudentScheduleReport from "./StudentScheduleReport";

export default function StudentMainContent({ selectedDashboardITem, viewPanelIphone }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOptions, setFilterOptions] = useState({ code: "", sort: "",name: "" });

  // Clear search query from URL when switching views (except when in "View Courses")
  useEffect(() => {
    if (selectedDashboardITem !== "View Courses") {
      setSearchParams({}, { replace: true }); // Clears URL search query when leaving "View Courses"
    }
  }, [selectedDashboardITem, setSearchParams]); // Runs whenever the user changes tabs

  

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
          
          <MainContentTopSI onFilterChange={setFilterOptions} title="Courses"  />

                    <StudentFilter onFilterChange={setFilterOptions} />
          <Course filters={filterOptions} />
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
          
          <MainContentTopSI title="Schedule"  />
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
          <MainContentTopSI title="Notifications"/>
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
          <MainContentTopSI onFilterChange={setFilterOptions} title="Courses" />
          <StudentFilter onFilterChange={setFilterOptions} />
          <Course filters={filterOptions} />
        </div>
      )}
    </>
  );
}

StudentMainContent.propTypes = {
  selectedDashboardITem: PropTypes.string.isRequired,
  viewPanelIphone: PropTypes.func.isRequired,
};
