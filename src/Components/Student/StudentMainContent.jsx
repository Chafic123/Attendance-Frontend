import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import StudentFilter from "./StudentFilter";
import Course from "../Generals/Course";
import MainContentTopSI from "./MainContentTopSI";
import PropTypes from "prop-types";
import StudentNotificationCenter from "./StudentNotificationCenter";
import "../../CSS/StudentMainContent.css";
import StudentScheduleReport from "./StudentScheduleReport";

export default function StudentMainContent({ isNotificationStatusChanged,setIsNotificationStatusChanged,selectedDashboardITem, viewPanelIphone }) {
  const [studentCourseFilters, setFilterOptions] = useState({ code: "", sort: "", name: "" });
  const [courses, setCourses] = useState([]);

  const [isIpadPro, setIsIpadPro] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(min-width: 1024px) and (min-height: 1366px) and (-webkit-device-pixel-ratio: 2)'
    );

    setIsIpadPro(mediaQuery.matches);

    const handler = (e) => setIsIpadPro(e.matches);
    mediaQuery.addListener(handler);

    return () => mediaQuery.removeListener(handler);
  }, []);


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
          <img
            onClick={viewPanelIphone}
            className="notification-schedule-icon"
            src="../public/Images/Notification-Schedule-icon.png"
            alt=""
          />
          <MainContentTopSI onCourseFilterChange={setFilterOptions} title="Courses" />

          <StudentFilter onCourseFilterChange={setFilterOptions} />
          <Course courses={courses} setCourses={setCourses} studentCourseFilters={studentCourseFilters} />
        </div>
      ) : selectedDashboardITem === "View Schedule" ? (
        <div
          style={{
            width: "100%",
            padding: "57px",
            paddingBottom: "0",
            borderRadius: "66px 0 0 66px",
            display: "flex",
            flexDirection: "column",
            gap: "17px",
          }}
        >

          <MainContentTopSI title="Schedule" />
          <StudentScheduleReport />
        </div>
      ) : selectedDashboardITem === "View Notifications" ? (
        <div
          style={{
            width: isIpadPro ? "41%" : "48%",
            padding: "57px",
            paddingBottom: "0",
            borderRadius: "66px 0 0 66px",
            display: "flex",
            flexDirection: "column",
            gap: "17px",
          }}
        >
          {/* <img
            onClick={viewPanelIphone}
            className="notification-schedule-icon"
            src="../public/Images/Notification-Schedule-icon.png"
            alt=""
          /> */}
          <MainContentTopSI title="Notifications" />
          <StudentNotificationCenter isNotificationStatusChanged={isNotificationStatusChanged} setIsNotificationStatusChanged={setIsNotificationStatusChanged} />
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
  viewPanelIphone: PropTypes.func.isRequired,
};
