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
  const [studentCourseFilters, setFilterOptions] = useState({ code: "", sort: "",name: "" });
  const [courses, setCourses] = useState([]);

 
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
          
          <MainContentTopSI onCourseFilterChange={setFilterOptions} title="Courses"  />

                    <StudentFilter onCourseFilterChange={setFilterOptions} />
          <Course courses={courses} setCourses={setCourses} studentCourseFilters={studentCourseFilters} />
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
          <MainContentTopSI onCourseFilterChange={setFilterOptions} title="Courses" />
          <StudentFilter onCourseFilterChange={setFilterOptions} />
          <Course courses={courses} setCourses={setCourses} studentCourseFilters={studentCourseFilters} />
        </div>
      )}
    </>
  );
}

StudentMainContent.propTypes = {
  selectedDashboardITem: PropTypes.string.isRequired,
  viewPanelIphone: PropTypes.func.isRequired,
};
