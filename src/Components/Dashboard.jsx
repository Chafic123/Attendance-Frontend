import { Icon } from "@mui/material";

export default function Dashboard({ DashboardItems, onItemClick }) {
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
        <p style={styles.text}>Log Out</p>
      </div>
    </div>
  );
}
