import StudentMainContent from "./StudentMainContent";
import StudentPanel from "./StudentPanel";
import PropTypes from 'prop-types';
import "../../CSS/SIWholeContent.css";

export default function StudentWholeContent({ selectedDashboardITem, selectedAddItem, viewProfile, viewPanel, viewPanelIphone }) {
  return (
    <div className="whole-content-container">
      <StudentMainContent viewPanelIphone = {viewPanelIphone} viewProfile={viewProfile} selectedDashboardITem={selectedDashboardITem} />
      {selectedDashboardITem === "View Schedule" ? null : <StudentPanel viewPanel={viewPanel} title={selectedAddItem} />}
    </div>
  );
}

StudentWholeContent.propTypes = {
  selectedDashboardITem: PropTypes.string.isRequired,
  selectedAddItem: PropTypes.string.isRequired,
  viewProfile: PropTypes.func.isRequired,
};
