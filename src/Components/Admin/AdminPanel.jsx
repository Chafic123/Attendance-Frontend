import AdminAddCourse from "./AdminAddCourse";
import AdminAddStudent from "./AdminAddStudent";
import AdminAddInstructor from "./AdminAddInstructor";
import AdminEditCourse from "./AdminEditCourse";
import AdminEditStudent from "./AdminEditStudent";
import AdminEditInstructor from "./AdminEditInstructor";
import PropTypes from "prop-types";
import "../../CSS/AdminPanel.css";
import Calendar from "../Generals/CalenderForm";
export default function AdminPanel(props) {
  const {
    title,
    isAdminPanel,
    editedCourse,
    setEditedCourse,
    editedStudent,
    setEditedStudent,
    editedInstructor,
    setEditedInstructor,
  } = props;

  return (
    <div className="AdminPanelParent" style={{ display: isAdminPanel ? "block" : "none" }}>
      {
        editedStudent ? (
          <AdminEditStudent
            editedStudent={editedStudent}
            setEditedStudent={setEditedStudent}
            onCancel={() => setEditedStudent(null)}
            setStudents={props.setStudents}
          />
        ) : editedCourse ? (
          <AdminEditCourse
            editedCourse={editedCourse}
            setEditedCourse={setEditedCourse}
            initialCourseData={editedCourse}
            onCancel={() => setEditedCourse(null)}
            setCourses={props.setCourses}
          />
        ) : editedInstructor ? (
          <AdminEditInstructor
            editedInstructor={editedInstructor}
            setEditedInstructor={setEditedInstructor}
            onCancel={() => setEditedInstructor(null)} 
            setInstructors={props.setInstructors}
          />
        ) : title === "View Courses" || !title ? (
          <AdminAddCourse  setCourses={props.setCourses} />
          
        ) : title === "View Students"  ? (
          <AdminAddStudent  setStudents={props.setStudents} />
        ) : title === "View Instructors" ? (
          <AdminAddInstructor setInstructors={props.setInstructors} />
        ) : title === "View Student Courses" ? (
          <Calendar />
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
