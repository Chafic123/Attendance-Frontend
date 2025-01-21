import AdminAddCourse from "./AdminAddCourse";
import AdminAddStudent from "./AdminAddStudent";
import AdminAddInstructor from "./AdminAddInstructor";
import PropTypes from "prop-types";
import "../../CSS/AdminPanel.css"

export default function AdminPanel(props) {
  return (
    <div className="AdminPanelParent"
     
    >
      {
        props.title === "View Courses" ? (
          <AdminAddCourse />
        ) : props.title === "View Students" ? (
          <AdminAddStudent />
        ) : props.title === "View Instructors" ? (
          <div className="AdminAddInstructorParent">
            <AdminAddInstructor />
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
