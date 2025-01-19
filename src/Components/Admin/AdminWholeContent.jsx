import AdminMainContent from "./AdminMainContent";
import AdminPanel from "./AdminPanel";
import PropTypes from 'prop-types';
// import "../../CSS/AdminWholeContent.css"
export default function AdminWholeContent(props) {

  return (
    <div className="AdminWholeContent"
      style={{
        display: "flex",
        width: "82%",
        height: "95%",
        backgroundColor: "white",
        borderRadius: "66px",
      }}
    >

      <AdminMainContent selectedDashboardITem={props.selectedDashboardITem} />
      
      <AdminPanel title={props.selectedAddItem} />
        
    </div>
  );
}

AdminWholeContent.propTypes = {
  selectedDashboardITem: PropTypes.string,
  selectedAddItem: PropTypes.string,
};
