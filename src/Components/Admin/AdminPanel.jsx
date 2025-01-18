import AdminAddCourse from "./AdminAddCourse";
import AdminAddStudent from "./AdminAddStudent";
import AdminAddInstructor from "./AdminAddInstructor";
import Calender from "../Generals/CalenderForm";
import PropTypes from "prop-types";

export default function AdminPanel(props) {
  return (
    <div
      style={{
        width: "43%",
        backgroundColor: "rgba(245, 243, 253, 1)",
        borderRadius: "0 66px 66px 0",
        display: "flex", 
        flexDirection: "column", 
        gap: "20px", 
        padding: "20px", 
      }}
    >
      {
        props.title === "View Courses" ? (
          <AdminAddCourse />
        ) : props.title === "View Students" ? (
          <AdminAddStudent />
        ) : props.title === "View Instructors" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0px", width: "100%" }}>
            <AdminAddInstructor />
            <Calender />
          </div>
        ) : (
          null
        )
      }
    </div>
  );
}

AdminPanel.propTypes = {
  title: PropTypes.string,
};
