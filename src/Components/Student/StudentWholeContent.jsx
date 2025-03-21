import StudentMainContent from "./StudentMainContent";
import StudentPanel from "./StudentPanel";
import PropTypes from 'prop-types';
import "../../CSS/SIWholeContent.css";

export default function StudentWholeContent({ selectedDashboardITem, viewProfile, viewPanel, viewPanelIphone,refreshProfile }) {
  return (
    <div className="whole-content-container">
      <StudentMainContent  viewPanelIphone = {viewPanelIphone} viewProfile={viewProfile} selectedDashboardITem={selectedDashboardITem} />
      <StudentPanel refreshProfile={refreshProfile} viewPanel={viewPanel} title= {selectedDashboardITem} />
    </div>
  );
}

StudentWholeContent.propTypes = {
  selectedDashboardITem: PropTypes.string.isRequired,
  viewProfile: PropTypes.func.isRequired,
  viewPanel: PropTypes.func.isRequired,
  viewPanelIphone: PropTypes.func.isRequired,
  refreshProfile: PropTypes.func.isRequired,
};
