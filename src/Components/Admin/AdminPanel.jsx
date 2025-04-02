import AdminAddCourse from "./AdminAddCourse";
import AdminAddStudent from "./AdminAddStudent";
import AdminAddInstructor from "./AdminAddInstructor";
import AdminEditCourse from "./AdminEditCourse";
import AdminEditStudent from "./AdminEditStudent";
import AdminEditInstructor from "./AdminEditInstructor"; // Import AdminEditInstructor
import PropTypes from "prop-types";
import "../../CSS/AdminPanel.css";

export default function AdminPanel(props) {
  const {
    title,
    isAdminPanel,
    editedCourse,
    setEditedCourse,
    editedStudent,
    setEditedStudent,
    editedInstructor, // Added for instructor edit
    setEditedInstructor, // Added setter for instructor edit
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
        ) : editedInstructor ? ( // Check for editedInstructor
          <AdminEditInstructor
            editedInstructor={editedInstructor}
            setEditedInstructor={setEditedInstructor}
            onCancel={() => setEditedInstructor(null)}
          />
        ) : title === "View Courses" ? (
          <AdminAddCourse />
        ) : title === "View Students" ? (
          <AdminAddStudent />
        ) : title === "View Instructors" ? (
          <AdminAddInstructor />
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
  editedStudent: PropTypes.object,
  setEditedStudent: PropTypes.func,
  editedInstructor: PropTypes.object,
  setEditedInstructor: PropTypes.func,
};
