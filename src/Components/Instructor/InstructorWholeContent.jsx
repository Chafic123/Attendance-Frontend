import InstructorMainContent from "./InstructorMainContent";
import InstructorPanel from "./InstructorPanel";
import PropTypes from 'prop-types';
import "../../CSS/SIWholeContent.css";
import { useState } from "react";
export default function InstructorWholeContent({ selectedDashboardITem, selectedAddItem, onAdd, refreshProfile, viewPanel }) {
  const [student, setActiveStudent] = useState(null);
  const [selectedCourseID, setSelectedCourseID] = useState("");

  const handleStudentSelect = (student, index) => {
    setActiveStudent(student);
    console.log("Selected Student: ", student)
  };
  return (
    <div className="whole-content-container">
      <InstructorMainContent setActiveStudent={setActiveStudent} setSelectedCourseID={setSelectedCourseID} handleStudentSelect={handleStudentSelect} onAdd={onAdd} selectedDashboardITem={selectedDashboardITem} />
      {selectedDashboardITem === "View Schedule" ? null : <InstructorPanel setActiveStudent={setActiveStudent}  selectedCourseID={selectedCourseID} selectedStudent={student} viewPanel={viewPanel} refreshProfile={refreshProfile} title={selectedAddItem} />}
    </div>
  );
}

InstructorWholeContent.propTypes = {
  selectedDashboardITem: PropTypes.string.isRequired,
  selectedAddItem: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
};
