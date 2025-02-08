import StudentMainContent from "./StudentMainContent";
import StudentPanel from "./StudentPanel";
import PropTypes from 'prop-types';
import "../../CSS/SIWholeContent.css";

export default function StudentWholeContent({ selectedDashboardITem, selectedAddItem, onAdd }) {
  return (
    <div className="whole-content-container">
      <StudentMainContent onAdd={onAdd} selectedDashboardITem={selectedDashboardITem} />
      {selectedDashboardITem === "View Schedule" ? null : <StudentPanel title={selectedAddItem} />}
    </div>
  );
}

StudentWholeContent.propTypes = {
  selectedDashboardITem: PropTypes.string.isRequired,
  selectedAddItem: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
};
