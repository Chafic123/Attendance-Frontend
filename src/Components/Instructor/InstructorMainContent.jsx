import InstructorFilter from "./InstructorFilter";
import Course from "../Generals/Course";
import MainContentTopSI from "../Student/MainContentTopSI";
import PropTypes from "prop-types";
import InstructorNotificationCenter from "./InstructorNotificationCenter";
import { useUser } from "../../Contexts/UserContext";
import { useEffect, useState } from "react";
import InstructorSchedule from "./InstructorSchedule";
export default function InstructorMainContent({ setRequestDate, isNotificationStatusChanged, setIsNotificationStatusChanged, setIsRequestStatusChanged, viewPanel, viewPanelIphone, selectedText, setSelectedText, selectedDashboardItem, onAdd, handleStudentSelect, setSelectedCourseID, setActiveStudent, setFilterTop, filterTop, setEditedStudent }) {
  const [courseFilterOptions, setCourseFilterOptions] = useState({ code: "", sort: "", name: "", section: "" });
  const [studentFilterOptions, setStudentFilterOptions] = useState({ studentID: "", name: "", major: "" });
  const [courses, setCourses] = useState([]);
  const [courseTitle, setCourseTitle] = useState("Courses");

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

  useEffect(() => {
    if (selectedText === "View Courses") {
      setCourseTitle("Courses");
      setFilterTop("Courses")

    }
    viewPanel();
    if (selectedText !== "View Student Courses") {
      null
    }
  }, [selectedText]);


  const [successMessage, setSuccessMessage] = useState("");
  const [noSuccessMessage, setNoSuccessMessage] = useState("");



  return (
    <>
      {selectedDashboardItem === "View Courses" || !selectedDashboardItem ? (
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
          <MainContentTopSI onCourseFilterChange={setCourseFilterOptions} title={courseTitle} onAdd={onAdd} />
          <div>
            <InstructorFilter filterTop={filterTop} onCourseFilterChange={setCourseFilterOptions} onStudentFilterChange={setStudentFilterOptions} title="InstructorFilter" />
          </div>
          <Course setSelectedText={setSelectedText} setCourseTitle={setCourseTitle} courses={courses} setCourses={setCourses} setActiveStudent={setActiveStudent} setSelectedCourseID={setSelectedCourseID} handleStudentSelect={handleStudentSelect} courseFilters={courseFilterOptions} studentFilters={studentFilterOptions} setFilterTop={setFilterTop} setEditedStudent={setEditedStudent} />
        </div>
      ) : selectedDashboardItem === "View Schedule" ? (
        <div
          style={{
            width: "87%",
            padding: "57px",
            paddingBottom: "0",
            borderRadius: "66px 0 0 66px",
            display: "flex",
            flexDirection: "column",
            gap: "17px",
          }}
        >
          <MainContentTopSI onCourseFilterChange={setCourseFilterOptions} title="Schedule" onAdd={onAdd} />
          <InstructorSchedule />

        </div>
      ) : selectedDashboardItem === "View Requests" ? (
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
          <img
            onClick={viewPanelIphone}
            className="notification-schedule-icon"
            src="../public/Images/Notification-Schedule-icon.png"
            alt=""
          />
          <MainContentTopSI onCourseFilterChange={setCourseFilterOptions} title="Correction Requests" onAdd={onAdd} />
          <InstructorNotificationCenter setRequestDate={setRequestDate} isNotificationStatusChanged={isNotificationStatusChanged} setIsNotificationStatusChanged={setIsNotificationStatusChanged} setIsRequestStatusChanged={setIsRequestStatusChanged} />
        </div>
      ) : (
        null
      )}
    </>
  );
}

InstructorMainContent.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
