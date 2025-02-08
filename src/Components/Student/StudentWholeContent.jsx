import StudentMainContent from "./StudentMainContent";
import StudentPanel from "./StudentPanel";
import PropTypes from 'prop-types';
import "../../CSS/SIWholeContent.css";

export default function StudentWholeContent({ selectedDashboardITem, selectedAddItem, viewProfile }) {
  return (
    <div className="whole-content-container">
      <StudentMainContent viewProfile={viewProfile} selectedDashboardITem={selectedDashboardITem} />
      {selectedDashboardITem === "View Schedule" ? null : <StudentPanel title={selectedAddItem} />}
    </div>
  );
}

StudentWholeContent.propTypes = {
  selectedDashboardITem: PropTypes.string.isRequired,
  selectedAddItem: PropTypes.string.isRequired,
  viewProfile: PropTypes.func.isRequired,
};
