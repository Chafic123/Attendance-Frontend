import "../../CSS/Dashboard.css";
import { Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { logoutUser } from "../../ApiService/LogoutService";

export default function Dashboard({ DashboardItems, onItemClick }) {
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
          className="dashboard-item"
          key={index}
          onClick={() => onItemClick(item.text)}
        >
          <img src={item.imgSrc} alt={item.altText} />
          <p>{item.text}</p>
        </div>
      ))}
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
