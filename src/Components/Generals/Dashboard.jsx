import "../../CSS/Dashboard.css";
import { Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { logoutUser } from "../../ApiService/LogoutService";
import { useEffect } from "react";
export default function Dashboard({ DashboardItems, onItemClick, isAdmin, onProcessCLicked, selectedItem, setSelectedText }) {
  const navigate = useNavigate();



  
  
  const handleLogOutClick = async () => {
    try {
      const response = await logoutUser();
      console.log(response.message);

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
          className={`dashboard-item ${selectedItem === item.text ? 'active' : ''}`}
          onClick={(e) => onItemClick(item.text, e)}
        >
          <img src={item.imgSrc} alt={item.altText} />
          <p>{item.text}</p>
          <div className="white-line"></div>
        </div>
      ))}
  

      {isAdmin === "true" ? (
        <div
          className="dashboard-item"
          onClick={() => onProcessCLicked("Process Attendance")}
        >
          <p>Process Attendance</p>
        </div>
      ) : null}

      <div id="logout">
        <Icon className="logout-icon">logout</Icon>
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
