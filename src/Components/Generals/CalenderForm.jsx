import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay'; // Import PickersDay
import React, { useState, useEffect, useCallback } from "react";
import { getStudentCourseCalendar } from "../../ApiService/StudentCalendarService"; // Import service
import { useCourse } from '../../Contexts/CourseContext';
import dayjs from 'dayjs'; // Import dayjs

export default function Calendar() {
    const [calendarData, setCalendarData] = useState([]);
    const { courseId } = useCourse();  // Get the course_id from context
    const userID = localStorage.getItem('userID') || sessionStorage.getItem('userID');

    // Log courseId and userID for debugging
    console.log("Course ID:", courseId); 
    console.log("User ID:", userID); 

    // Fetch the calendar data when courseId or userID changes
    useEffect(() => {
        if (courseId && userID) {
            const fetchCalendarData = async () => {
                try {
                    const data = await getStudentCourseCalendar(courseId, userID);
                    console.log("Fetched Calendar Data:", data); // Log the fetched data for verification

                    if (Array.isArray(data)) {
                        console.log("Calendar data is an array with length:", data.length);
                        setCalendarData(data); // Set the calendar data
                    } else {
                        console.error("Calendar data is not an array", data);
                    }
                } catch (error) {
                    console.error("Error fetching calendar data:", error);
                }
            };
            fetchCalendarData();
        }
    }, [courseId, userID]);

    // Create a map for quick access to statuses
    const dayStatusMap = useCallback(() => {
        return calendarData.reduce((map, day) => {
            map[day.date] = day.status; // Use the date as the key
            return map;
        }, {});
    }, [calendarData]);

    // Function to apply styles to each date based on its status
    const getDayStyle = useCallback((date) => {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        console.log("Checking for date:", formattedDate); // Log the date being checked

        // Look for the status of this date in the calendar data
        const status = dayStatusMap()[formattedDate];
        if (status) {
            console.log(`Found status for ${formattedDate}:`, status); // Log found status

            // Apply different styles based on the status
            if (status === "present") {
                console.log(`Applying purple background for ${formattedDate}`);
                return { background: "linear-gradient(180deg, #604099 0%, #4A5DA9 100%)", borderRadius: "50%" }; // Purple for present
            } else if (status === "absent") {
                console.log(`Applying red background for ${formattedDate}`);
                return { background: "red", borderRadius: "50%" }; // Red for absent
            } else if (status === "upcoming") {
                console.log(`Applying yellow background for ${formattedDate}`);
                return { background: "yellow", borderRadius: "50%" }; // Yellow for upcoming
            }
        }

        return {}; // Default styling if no matching status
    }, [dayStatusMap]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                slots={{
                    day: (props) => {
                        const { day, ...otherProps } = props;
                        const dayStyle = getDayStyle(day); // Get the style for the current day
                        console.log("Rendering day:", day.format("YYYY-MM-DD")); // Debugging
                        console.log("Day style:", dayStyle); // Debugging

                        return (
                            <PickersDay {...otherProps} day={day} style={dayStyle} />
                        );
                    },
                }}
            />
        </LocalizationProvider>
    );
}
