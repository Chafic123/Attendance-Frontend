import AdminAddCourse from "./AdminAddCourse";
import AdminAddStudent from "./AdminAddStudent";
import AdminAddInstructor from "./AdminAddInstructor";
import PropTypes from "prop-types";
export default function AdminPanel(props) {
  return (
    <div
      style={{
        width: "43%",
        backgroundColor: "rgba(245, 243, 253, 1)",
        borderRadius: "0 66px 66px 0",
      }}
    >
      {/* <AdminEditCourse /> */}


      {
        props.title == "View Courses" ? (
          <AdminAddCourse />
        ) : props.title == "View Students" ? (
          <AdminAddStudent />
        ) : props.title == "View Instructors" ? (
          <AdminAddInstructor />
        ) : (
          null
        )
      }


    </div >
  );
}
  AdminPanel.propTypes = {
    title: PropTypes.string,
  };

