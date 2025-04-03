import InstructorFilter from "./InstructorFilter";
import Course from "../Generals/Course";
import MainContentTopSI from "../Student/MainContentTopSI";
import PropTypes from "prop-types";
import InstructorNotificationCenter from "./InstructorNotificationCenter";
import { useUser } from "../../Contexts/UserContext";
import { useState } from "react";
import InstructorSchedule from "./InstructorSchedule";
export default function InstructorMainContent({ selectedDashboardITem, onAdd, handleStudentSelect, setSelectedCourseID, setActiveStudent, setFilterTop, filterTop, setEditedStudent }) {
  const [courseFilterOptions, setCourseFilterOptions] = useState({ code: "", sort: "", name: "", section: "" });
  const [studentFilterOptions, setStudentFilterOptions] = useState({ studentID: "", name: "", major: "" });
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
          <MainContentTopSI onCourseFilterChange={setCourseFilterOptions} title="Courses" onAdd={onAdd} />
          <div>
            <InstructorFilter filterTop={filterTop} onCourseFilterChange={setCourseFilterOptions} onStudentFilterChange={setStudentFilterOptions} title="InstructorFilter" />
          </div>
          <Course setActiveStudent={setActiveStudent} setSelectedCourseID={setSelectedCourseID} handleStudentSelect={handleStudentSelect} courseFilters={courseFilterOptions} studentFilters={studentFilterOptions} setFilterTop={setFilterTop} setEditedStudent={setEditedStudent} />
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
          <MainContentTopSI  onCourseFilterChange={setCourseFilterOptions} title="Schedule" onAdd={onAdd} />
          <InstructorSchedule />

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
          <MainContentTopSI onCourseFilterChange={setCourseFilterOptions} title="Correction Requests" onAdd={onAdd} />
          <InstructorNotificationCenter />
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
          <MainContentTopSI  onCourseFilterChange={setCourseFilterOptions} title="Courses" onAdd={onAdd} />
          <div>
            <InstructorFilter filterTop={filterTop} onCourseFilterChange={setCourseFilterOptions} onStudentFilterChange={setStudentFilterOptions} title="InstructorFilter" />
          </div>
          <Course setActiveStudent={setActiveStudent} setSelectedCourseID={setSelectedCourseID} handleStudentSelect={handleStudentSelect} courseFilters={courseFilterOptions} studentFilters={studentFilterOptions} setFilterTop={setFilterTop} setEditedStudent={setEditedStudent} />
        </div>
      )}
    </>
  );
}

InstructorMainContent.propTypes = {
  selectedDashboardITem: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
};
