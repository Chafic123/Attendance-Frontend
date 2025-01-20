import StudentMainContent from "./StudentMainContent";
import StudentPanel from "./StudentPanel";
import PropTypes from 'prop-types';
export default function StudentWholeContent(props) {

  return (
    <div
      style={{
        display: "flex",
        width: "82%",
        height: "95%",
        backgroundColor: "white",
        borderRadius: "66px",
      }}
    >

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
