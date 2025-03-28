import AdminAddCourse from "./AdminAddCourse";
import AdminAddStudent from "./AdminAddStudent";
import AdminAddInstructor from "./AdminAddInstructor";
import AdminEditCourse from "./AdminEditCourse";
import PropTypes from "prop-types";
import "../../CSS/AdminPanel.css";

export default function AdminPanel(props) {
  const { title, isAdminPanel, editedCourse, setEditedCourse, handleEditSave } = props;

  return (
    <div className="AdminPanelParent" style={{ display: isAdminPanel ? "block" : "none" }}>
      {title === "View Courses" ? (
        editedCourse ? (
          <AdminEditCourse
            editedCourse={editedCourse}
            setEditedCourse={setEditedCourse}
            initialCourseData={editedCourse}
            onSave={handleEditSave}
            onCancel={() => setEditedCourse(null)}
          />
        ) : (
          <AdminAddCourse />
        )
      ) : title === "View Students" ? (
        <AdminAddStudent />
      ) : title === "View Instructors" ? (
        <div className="AdminAddInstructorParent">
          <AdminAddInstructor />
        </div>
      ) : null}
    </div>
  );
}

AdminPanel.propTypes = {
  title: PropTypes.string.isRequired,
  isAdminPanel: PropTypes.bool.isRequired,
  editedCourse: PropTypes.object, // optional
  setEditedCourse: PropTypes.func, // optional
  handleEditSave: PropTypes.func, // optional
};
