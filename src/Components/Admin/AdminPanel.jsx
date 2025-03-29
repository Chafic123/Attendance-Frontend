import AdminAddCourse from "./AdminAddCourse";
import AdminAddStudent from "./AdminAddStudent";
import AdminAddInstructor from "./AdminAddInstructor";
import AdminEditCourse from "./AdminEditCourse";
import AdminEditStudent from "./AdminEditStudent";
import PropTypes from "prop-types";
import "../../CSS/AdminPanel.css";

export default function AdminPanel(props) {
  const {
    title,
    isAdminPanel,
    editedCourse,
    setEditedCourse,
    handleEditSave,
    editedStudent,
    setEditedStudent,
  } = props;

  return (
    <div className="AdminPanelParent" style={{ display: isAdminPanel ? "block" : "none" }}>
      {
        editedStudent ? (
          <AdminEditStudent
            editedStudent={editedStudent}
            setEditedStudent={setEditedStudent}
            onCancel={() => setEditedStudent(null)}
          />
        ) : editedCourse ? (
          <AdminEditCourse
            editedCourse={editedCourse}
            setEditedCourse={setEditedCourse}
            initialCourseData={editedCourse}
            onCancel={() => setEditedCourse(null)}
          />
        ) : title === "View Courses" ? (
          <AdminAddCourse />
        ) : title === "View Students" ? (
          <AdminAddStudent />
        ) : title === "View Instructors" ? (
          <div className="AdminAddInstructorParent">
            <AdminAddInstructor />
          </div>
        ) : null
      }
    </div>
  );
}

AdminPanel.propTypes = {
  title: PropTypes.string.isRequired,
  isAdminPanel: PropTypes.bool.isRequired,
  editedCourse: PropTypes.object,
  setEditedCourse: PropTypes.func,
  handleEditSave: PropTypes.func,
  editedStudent: PropTypes.object,
  setEditedStudent: PropTypes.func,
  handleStudentEditSave: PropTypes.func,
};
