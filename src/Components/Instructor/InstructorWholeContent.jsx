import InstructorMainContent from "./InstructorMainContent";
import InstructorPanel from "./InstructorPanel";
import PropTypes from 'prop-types';
import "../../CSS/SIWholeContent.css";
import { useState } from "react";
export default function InstructorWholeContent({ isNotificationStatusChanged,setIsNotificationStatusChanged,viewPanelIphone, setSelectedText, selectedDashboardItem, selectedAddItem, onAdd, refreshProfile, viewPanel }) {
  const [student, setActiveStudent] = useState(null);
  const [selectedCourseID, setSelectedCourseID] = useState("");
  const [filterTop, setFilterTop] = useState("Courses");
  const [editedStudent, setEditedStudent] = useState(null);
  const [isRequestStatusChanged, setIsRequestStatusChanged] = useState(false);
  const handleStudentSelect = (student, index) => {
    setActiveStudent(student);

  };

  return (
    <div className="whole-content-container">
      <InstructorMainContent isNotificationStatusChanged={isNotificationStatusChanged} setIsNotificationStatusChanged={setIsNotificationStatusChanged} setIsRequestStatusChanged={setIsRequestStatusChanged} selectedText = {selectedAddItem} viewPanelIphone={viewPanelIphone} setSelectedText={setSelectedText} setEditedStudent={setEditedStudent} setFilterTop={setFilterTop} filterTop={filterTop} setActiveStudent={setActiveStudent} setSelectedCourseID={setSelectedCourseID} handleStudentSelect={handleStudentSelect} onAdd={onAdd} selectedDashboardItem={selectedDashboardItem} viewPanel={viewPanel} />
      {selectedDashboardItem === "View Schedule" ? null : <InstructorPanel setIsRequestStatusChanged={setIsRequestStatusChanged} isRequestStatusChanged={isRequestStatusChanged}  selectedDashboardItem={selectedDashboardItem} setActiveStudent={setActiveStudent} selectedCourseID={selectedCourseID} selectedStudent={student} viewPanel={viewPanel} refreshProfile={refreshProfile} title={selectedAddItem} />}
    </div>
  );
}

InstructorWholeContent.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
