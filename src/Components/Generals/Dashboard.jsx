import { Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";  

export default function Dashboard({ DashboardItems, onItemClick }) {
  const navigate = useNavigate();

  const styles = {
    dashboard: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      gap: "44px",
      marginBottom: "100px",
    },  
    dashboardItem: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "15px",
      color: "white",
      fontSize: "20px",
      cursor: "pointer",
    },
    img: {
      width: "20px",
    },
    logout: {
      display: "flex",
      position: "absolute",
      alignItems: "center",
      color: "white",
      bottom: "40px",
      left: "30px",
      gap: "10px",
      cursor: "pointer",
    },
    icon: {
      fontSize: "24px",
    },
    text: {
      fontSize: "20px",
      margin: "0",
    },
  };

  const handleLogOutClick = () => {
    navigate('/logout');
  };

  return (
    <div id="dashboard" style={styles.dashboard}>
      {DashboardItems.map((item, index) => (
        <div
          className="dashboard-item"
          key={index}
          style={styles.dashboardItem}
          onClick={() => onItemClick(item.text)}
        >
          <img src={item.imgSrc} alt={item.altText} style={styles.img} />
          <p>{item.text}</p>
        </div>
      ))}
      <div id="logout" style={styles.logout}>
        <Icon>logout</Icon>
        <p style={styles.text} onClick={handleLogOutClick}>Log Out</p>
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
