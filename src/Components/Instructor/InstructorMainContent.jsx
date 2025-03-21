import InstructorFilter from "./InstructorFilter";
import Course from "../Generals/Course";
import MainContentTopSI from "./MainContentTopSI";
import PropTypes from "prop-types";
import InstructorNotificationCenter from "./InstructorNotificationCenter";

export default function InstructorMainContent({ selectedDashboardITem, onAdd }) {
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
          <MainContentTopSI title="Courses" onAdd={onAdd} />
          <div>
            <InstructorFilter title="InstructorFilter" />
          </div>
          <Course instructorEmail="instructor1@example.com" />
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
        <MainContentTopSI title="Courses" onAdd={onAdd} />
        <div>
          <InstructorFilter title="InstructorFilter" />
        </div>
        <Course instructorEmail="instructor1@example.com" />
      </div>
          )}
    </>
  );
}

InstructorMainContent.propTypes = {
  selectedDashboardITem: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired, 
};
