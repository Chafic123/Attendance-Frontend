import InstructorMainContent from "./InstructorMainContent";
import InstructorPanel from "./InstructorPanel";
import PropTypes from 'prop-types';
import "../../CSS/SIWholeContent.css";
import { useState } from "react";
export default function InstructorWholeContent({ viewPanelIphone, setSelectedText, selectedDashboardItem, selectedAddItem, onAdd, refreshProfile, viewPanel }) {
  const [student, setActiveStudent] = useState(null);
  const [selectedCourseID, setSelectedCourseID] = useState("");
  const [filterTop, setFilterTop] = useState("Courses");
  const [editedStudent, setEditedStudent] = useState(null);
  const handleStudentSelect = (student, index) => {
    setActiveStudent(student);
    console.log("Selected Student: ", student)
    console.log(filterTop)
  };

  return (
    <div className="whole-content-container">
      <InstructorMainContent viewPanelIphone={viewPanelIphone} setSelectedText={setSelectedText} setEditedStudent={setEditedStudent} setFilterTop={setFilterTop} filterTop={filterTop} setActiveStudent={setActiveStudent} setSelectedCourseID={setSelectedCourseID} handleStudentSelect={handleStudentSelect} onAdd={onAdd} selectedDashboardItem={selectedDashboardItem} />
      {selectedDashboardItem === "View Schedule" ? null : <InstructorPanel selectedDashboardItem={selectedDashboardItem} setActiveStudent={setActiveStudent} selectedCourseID={selectedCourseID} selectedStudent={student} viewPanel={viewPanel} refreshProfile={refreshProfile} title={selectedAddItem} />}
    </div>
  );
}

InstructorWholeContent.propTypes = {
  selectedDashboardItem: PropTypes.string.isRequired,
  selectedAddItem: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
};
