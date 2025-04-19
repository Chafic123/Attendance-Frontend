import AdminMainContent from "./AdminMainContent";
import AdminPanel from "./AdminPanel";
import PropTypes from 'prop-types';
import "../../CSS/SIWholeContent.css"
import MachineLearning from "../Generals/MachineLearning";
import { useState } from "react";
import { useEffect } from "react";
export default function AdminWholeContent(props) {
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);

  const [isAdminPanel, setAdminPanel] = useState(true);
  const [editedCourse, setEditedCourse] = useState(null);
  const [editedStudent, setEditedStudent] = useState(null);
  const [filterTop, setFilterTop] = useState("Courses");
  const [editedInstructor, setEditedInstructor] = useState(null);
  const handleClose = () => {
    props.setProcessText("")  
  };  
  useEffect(()=>{
    setEditedStudent(null);
    setEditedInstructor(null);
    setEditedCourse(null);
    
  },[props.selectedDashboardITem])

  // useEffect(() => {
  //   console.log("editedInstructor: ", editedInstructor)
  // }, [editedInstructor]);

  const showAdminPanel = (state) => {
    setAdminPanel(state)
  }

  return (
    <div className="admin-whole-content-container">
      {props.ProcessAttendance === "Process Attendance" ? (
        <div  className="ml-bg" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,

        }}>
          <div className="ml-mobile-control" style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            position: 'relative',

          }}>
            <MachineLearning  />
            <button 
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#666'
              }}
              className="ml-x-icon"
              onClick={handleClose}
            >
              ×
            </button>
          </div>
        </div>
      ) : null }
      <AdminMainContent selectedText={props.selectedDashboardITem} setSelectedText={props.setSelectedText} courses={courses} setCourses={setCourses} instructors={instructors} setInstructors={setInstructors} students={students} setStudents={setStudents} filterTop={filterTop} setFilterTop={setFilterTop} setEditedInstructor={setEditedInstructor} setEditedStudent={setEditedStudent} setEditedCourse={setEditedCourse} selectedDashboardITem={props.selectedDashboardITem} showAdminPanel={showAdminPanel} />

      <AdminPanel setCourses={setCourses} setInstructors={setInstructors} setStudents={setStudents} setEditedStudent={setEditedStudent} editedStudent={editedStudent} setEditedInstructor={setEditedInstructor} editedInstructor={editedInstructor} editedCourse={editedCourse} setEditedCourse={setEditedCourse} title={props.selectedAddItem} isAdminPanel={isAdminPanel} />

    </div>
  );
}

AdminWholeContent.propTypes = {
  selectedDashboardITem: PropTypes.string,
  selectedAddItem: PropTypes.string,
};
