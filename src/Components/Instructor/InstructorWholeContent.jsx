import InstructorMainContent from "./InstructorMainContent";
import InstructorPanel from "./InstructorPanel";
import PropTypes from 'prop-types';
import "../../CSS/SIWholeContent.css";

export default function InstructorWholeContent({ selectedDashboardITem, selectedAddItem, onAdd }) {
  return (
    <div className="whole-content-container">
      <InstructorMainContent onAdd={onAdd} selectedDashboardITem={selectedDashboardITem} />
      {selectedDashboardITem === "View Schedule" ? null : <InstructorPanel title={selectedAddItem} />}
    </div>
  );
}

InstructorWholeContent.propTypes = {
  selectedDashboardITem: PropTypes.string.isRequired,
  selectedAddItem: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
};
