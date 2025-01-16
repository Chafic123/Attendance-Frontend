import AdminMainContent from "./AdminMainContent";
import AdminPanel from "./AdminPanel";
import PropTypes from 'prop-types';
export default function AdminWholeContent(props) {

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

      <AdminMainContent selectedDashboardITem={props.selectedDashboardITem} />
      
      <AdminPanel title={props.selectedAddItem} />
        
    </div>
  );
}

AdminWholeContent.propTypes = {
  selectedDashboardITem: PropTypes.string,
};
