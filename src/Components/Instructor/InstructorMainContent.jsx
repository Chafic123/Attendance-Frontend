import InstructorFilter from "./InstructorFilter";
import Course from "../Generals/Course";
import MainContentTopSI from "../Student/MainContentTopSI";
import PropTypes from "prop-types";
import InstructorNotificationCenter from "./InstructorNotificationCenter";
import { useUser } from "../../Contexts/UserContext";
import { useState } from "react";
export default function InstructorMainContent({ selectedDashboardITem, onAdd, handleStudentSelect, setSelectedCourseID,setActiveStudent }) {
  const [filterOptions, setFilterOptions] = useState({ code: "", sort: "", name: "", section: "" });


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
          <MainContentTopSI onFilterChange={setFilterOptions} title="Courses" onAdd={onAdd} />
          <div>
            <InstructorFilter onFilterChange={setFilterOptions} title="InstructorFilter" />
          </div>
          <Course setActiveStudent={setActiveStudent} setSelectedCourseID={setSelectedCourseID} handleStudentSelect={handleStudentSelect} filters={filterOptions} />
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
          <MainContentTopSI title="Schedule" onAdd={onAdd} />
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
          <MainContentTopSI title="Notifications" onAdd={onAdd} />
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
          <MainContentTopSI onFilterChange={setFilterOptions} title="Courses" onAdd={onAdd} />
          <div>
            <InstructorFilter onFilterChange={setFilterOptions} title="InstructorFilter" />
          </div>
          <Course setActiveStudent={setActiveStudent} setSelectedCourseID={setSelectedCourseID} handleStudentSelect={handleStudentSelect} filters={filterOptions} />
        </div>
      )}
    </>
  );
}

InstructorMainContent.propTypes = {
  selectedDashboardITem: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
};
