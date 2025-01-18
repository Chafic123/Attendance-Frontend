import { Icon } from "@mui/material";
import PropTypes from 'prop-types';

export default function StudentCard( props ) {
  const styles = {
    student: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "rgba(236, 236, 239, 1)",
      height: "91px",
      borderRadius: "16px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.25)",
      paddingRight: "10px",
      paddingLeft: "10px",
      width: "42%",
      marginBottom: "-55px",
    },
    studentDetails: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    },
    studentText: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "3px",
    },
    studentName: {
      fontSize: "15px",
      fontWeight: "bold",
      color: "rgba(84, 51, 129, 1)",
      margin: 0,
    },
    studentMajor: {
      fontSize: "15px",
      fontWeight: 400,
      color: "rgba(71, 73, 77, 1)",
      margin: 0,
    },
    studentId: {
      fontSize: "11px",
      fontWeight: 500,
      color: "rgba(146, 147, 150, 1)",
      margin: 0,
    },
  };

  return (
    <div style={styles.student}>
      <div style={styles.studentDetails}>
        <img src="student.png" alt="Student" />
        <div style={styles.studentText}>
          <p style={styles.studentName}>Ahmad Hijazi</p>
          <p style={styles.studentMajor}>Civil Engineering</p>
          <p style={styles.studentId}>20210908</p>
        </div>
      </div>
      {props.user === "Admin" ? (<Icon>more_vert</Icon>) : null}
      
    </div>
  );
}

StudentCard.propTypes = {
  user: PropTypes.string.isRequired,
};
