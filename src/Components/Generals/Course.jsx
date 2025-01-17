import { Icon } from "@mui/material";

export default function Course() {
  const styles = {
    course: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "rgba(236, 236, 239, 1)",
      height: "91px",
      borderRadius: "16px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.25)",
      paddingRight: "10px",
    },
    courseDetails: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    },
    courseBorder: {
      height: "91px",
      width: "24px",
      backgroundColor: "rgba(84, 51, 129, 1)",
      borderRadius: "16px",
    },
    courseText: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "3px",
    },
    courseCode: {
      fontSize: "15px",
      fontWeight: "bold",
      color: "rgba(84, 51, 129, 1)",
      margin: 0,
    },
    courseName: {
      fontSize: "15px",
      fontWeight: 400,
      color: "rgba(71, 73, 77, 1)",
      margin: 0,
    },
    courseInstructor: {
      fontSize: "11px",
      fontWeight: 500,
      color: "rgba(146, 147, 150, 1)",
      margin: 0,
    },
  };

  return (
    <div style={styles.course}>
      <div style={styles.courseDetails}>
        <div style={styles.courseBorder}></div>
        <div style={styles.courseText}>
          <p style={styles.courseCode}>GRDS424</p>
          <p style={styles.courseName}>Web and Interactive Design</p>
          <p style={styles.courseInstructor}>Myriam Chamoon</p>
        </div>
      </div>
      <Icon>more_vert</Icon>
    </div>
  );
}
