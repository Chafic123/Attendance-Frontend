import StudentMainContent from "./StudentMainContent";
import StudentPanel from "./StudentPanel";
import PropTypes from 'prop-types';
import "../../CSS/StudentWholeContent.css"
export default function StudentWholeContent(props) {

  return (
    <div className="whole-content-container" >

      <StudentMainContent selectedDashboardITem={props.selectedDashboardITem} />
      {props.selectedDashboardITem === "View Schedule" ? (
                  null) : <StudentPanel title={props.selectedAddItem} />}
      
        
    </div>
  );
}

StudentWholeContent.propTypes = {
  selectedDashboardITem: PropTypes.string,
  selectedAddItem: PropTypes.string,
};
