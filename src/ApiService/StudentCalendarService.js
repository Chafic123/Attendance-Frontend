// Calendar.jsx
import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { getStudentCourseCalendar } from "../../ApiService/StudentCalendarService"; // Import service

export default function Calendar({ selectedCourseId, studentId }) {
  const [calendarData, setCalendarData] = useState([]);
  
  // Fetch the calendar data based on selected course and student
  useEffect(() => {
    if (selectedCourseId && studentId) {
      const fetchCalendarData = async () => {
        try {
          const data = await getStudentCourseCalendar(selectedCourseId, studentId);
          setCalendarData(data); // Set calendar data
        } catch (error) {
          console.error("Error fetching calendar data:", error);
        }
      };
      fetchCalendarData();
    }
  }, [selectedCourseId, studentId]); // Run when courseId or studentId changes

  // Function to apply the styles to the dates
  const getDayStyle = (date) => {
    const dayData = calendarData.find(item => item.date === date.format("YYYY-MM-DD"));
    if (dayData) {
      if (dayData.status === "present") {
        return { background: "linear-gradient(180deg, #604099 0%, #4A5DA9 100%)" }; // Present
      } else if (dayData.status === "absent") {
        return { background: "red" }; // Absent
      } else if (dayData.status === "upcoming") {
        return { background: "yellow" }; // Upcoming
      }
    }
    return {}; // Default style if no status found
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        renderDay={(date, _value, DayComponent) => {
          return (
            <DayComponent {..._value} style={getDayStyle(date)} />
          );
        }}
      />
    </LocalizationProvider>
  );
}
