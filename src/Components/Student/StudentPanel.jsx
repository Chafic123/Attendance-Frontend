import Calender from "../Generals/CalenderForm";
import PropTypes from "prop-types";
import StudentSchedule from "./StudentSchedule"
import StudentProfile from "./StudentProfile"
import "../../CSS/StudentCalender.css";
import StudentNotifications from "./StudentNotifications";
export default function AdminPanel(props) {
  return (
    <div
      style={{
        width: "40%",
        backgroundColor: "rgba(245, 243, 253, 1)",
        borderRadius: "0 66px 66px 0",
        display: "flex", 
        flexDirection: "column", 
        gap: "20px", 
        padding: "20px", 
      }}
    >
      {
        props.title === "View Courses" ? (
            <StudentProfile />
        ) : props.title === "View Schedule" ? (
            <StudentSchedule />
        ) : props.title === "View Notifications" ? (
          <div>

            <div className="custom-calendar-wrapper">
            <Calender />
            </div>
            <StudentNotifications />

          </div>
          
        ) : (
          null
        )
      }
    </div>
  );
}

AdminPanel.propTypes = {
  title: PropTypes.string,
};
