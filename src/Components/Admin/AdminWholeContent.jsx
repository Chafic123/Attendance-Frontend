import AdminMainContent from "./AdminMainContent";
import AdminPanel from "./AdminPanel";
import PropTypes from 'prop-types';
import "../../CSS/SIWholeContent.css"
import { useState } from "react";
export default function AdminWholeContent(props) {
  
const [isAdminPanel, setAdminPanel] = useState(true);
const [editedCourse,setEditedCourse] = useState(null);
const [editedStudent, setEditedStudent] = useState(null);
const showAdminPanel = (state) => {
  setAdminPanel(state)
}

  return (
    <div className="whole-content-container">

      <AdminMainContent setEditedStudent={setEditedStudent} setEditedCourse={setEditedCourse} selectedDashboardITem={props.selectedDashboardITem} showAdminPanel={showAdminPanel}/>
      
      <AdminPanel setEditedStudent={setEditedStudent} editedStudent={editedStudent} editedCourse={editedCourse} setEditedCourse={setEditedCourse} title={props.selectedAddItem} isAdminPanel={isAdminPanel}/>
        
    </div>
  );
}

AdminWholeContent.propTypes = {
  selectedDashboardITem: PropTypes.string,
  selectedAddItem: PropTypes.string,
};
