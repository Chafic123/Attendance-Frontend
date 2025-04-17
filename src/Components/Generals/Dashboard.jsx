import "../../CSS/Dashboard.css";
import { Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { logoutUser } from "../../ApiService/LogoutService";
import { useEffect } from "react";
export default function Dashboard({ DashboardItems, onItemClick, isStudent, isAdmin, onProcessCLicked, selectedItem, setSelectedText }) {
  const navigate = useNavigate();

  const handleLogOutClick = async () => {
    try {
      const response = await logoutUser();

      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");

      navigate("/", { replace: true });
    } catch (error) {
      alert(error.message || "Logout failed.");
    }
  };

  return (
    <div id="dashboard">
      {DashboardItems.map((item, index) => (
        <div 
        key={index} 
        className="dashboard-item" 
        onClick={(e) => onItemClick(item.text, e)}
        id={item.id}
      >
        <img src={item.imgSrc} alt={item.altText} />
        {item.badgeCount > 0 && (
          <span className={`notification-badge ${isStudent === "true" ? "studentNot" : ""}`}>
            {item.badgeCount > 9 ? '9+' : item.badgeCount}
          </span>
        )}
        <span>{item.text}</span>
      </div>
      ))}


      {isAdmin === "true" ? (
        <div
          className="dashboard-item"
          onClick={() => onProcessCLicked("Process Attendance")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-check" viewBox="0 0 16 16">
            <path d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0L10.5 7.207l.708-.708L12.5 8.293l2.646-2.647a.5.5 0 0 1 .708 0z" />
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm6-4c-3.5 0-5 2.5-5 3h10c0-.5-1.5-3-5-3z" />
            <path d="M8 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
          <p>Process Attendance</p>
        </div>
      ) : null}

      <div id="logout">
        <Icon onClick={handleLogOutClick} className="logout-icon">logout</Icon>
        <p className="logout-text" onClick={handleLogOutClick}>
          Log Out
        </p>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  DashboardItems: PropTypes.arrayOf(
    PropTypes.shape({
      imgSrc: PropTypes.string.isRequired,
      altText: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  onItemClick: PropTypes.func.isRequired,
};
