import Course from "./Course";
import MainContentTop from "./MainContentTop";
import StudentCard from "./StudentCard";

export default function AdminMainContent(props) {
  return (
    <>
      {props.selectedDashboardITem === "View Students" ? (
        <div
          style={{
            width: "57%",
            padding: "57px",
            paddingBottom: "0",
            borderRadius: "66px 0 0 66px",
            display: "flex",
            flexDirection: "column",
            gap: "17px",
          }}
        >
          <MainContentTop title="Students" />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "40px",
            }}
          >
            <StudentCard />
            <StudentCard />
            <StudentCard />
            <StudentCard />
            <StudentCard />
          </div>
        </div>
      ) : props.selectedDashboardITem === "View Courses" ? (
        <div
          style={{
            width: "57%",
            padding: "57px",
            paddingBottom: "0",
            borderRadius: "66px 0 0 66px",
            display: "flex",
            flexDirection: "column",
            gap: "17px",
          }}
        >
          <MainContentTop title="Courses" />
          <Course />
          <Course />
        </div>
      ) : props.selectedDashboardITem === "View Instructors" ? (
        <MainContentTop title="Instructors" />
      ) : (
        <MainContentTop title="Courses" />
      )}
    </>
  );
}
