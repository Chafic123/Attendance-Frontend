import AdminMainContent from "./AdminMainContent";
import AdminPanel from "./AdminPanel";
import PropTypes from 'prop-types';
import "../../CSS/AdminWholeContent.css"
import { useState } from "react";
export default function AdminWholeContent(props) {
  
const [isAdminPanel, setAdminPanel] = useState(true)

const showAdminPanel = (state) => {
  setAdminPanel(state)
}

  return (
    <div className="AdminWholeContent">

      <AdminMainContent selectedDashboardITem={props.selectedDashboardITem} showAdminPanel={showAdminPanel}/>
      
      <AdminPanel title={props.selectedAddItem} isAdminPanel={isAdminPanel}/>
        
    </div>
  );
}

AdminWholeContent.propTypes = {
  selectedDashboardITem: PropTypes.string,
  selectedAddItem: PropTypes.string,
};
