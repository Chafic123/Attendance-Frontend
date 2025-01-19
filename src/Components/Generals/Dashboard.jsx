import "../../CSS/Dashboard.css";
import { Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function Dashboard({ DashboardItems, onItemClick }) {
  const navigate = useNavigate();

  const handleLogOutClick = () => {
    navigate('/logout');
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
