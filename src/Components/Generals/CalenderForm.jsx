import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay'; 
import { useState, useEffect, useCallback } from "react";
import { getStudentCourseCalendar } from "../../ApiService/StudentCalendarService"; 
import { useCourse } from '../../Contexts/CourseContext';
import dayjs from 'dayjs'; 
import PropTypes from 'prop-types'; 

export default function Calendar() {
    const [calendarData, setCalendarData] = useState([]);
    const { courseId } = useCourse();  
    const userID = localStorage.getItem('userID') || sessionStorage.getItem('userID');
    const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

    console.log("Course ID:", courseId); 
    console.log("User ID:", userID); 

    useEffect(() => {
        if (courseId && userID && userRole=="student") {
            const fetchCalendarData = async () => {
                try {
                    
                    const data = await getStudentCourseCalendar(courseId, userID);
                    console.log("Fetched Calendar Data:", data); 

                    if (Array.isArray(data)) {
                        setCalendarData(data); 
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
            map[day.date] = day.status; 
            return map;
        }, {});
    }, [calendarData]);

    // Function to apply styles to each date based on its status
    const getDayStyle = useCallback((date) => {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        const status = dayStatusMap()[formattedDate];
        if (status) {

            if (status === "present") {
                return { background: "linear-gradient(180deg, #604099 0%, #4A5DA9 100%)", borderRadius: "50%" };
            } else if (status === "absent") {
                return { background: "red", borderRadius: "50%" }; 
            } else if (status === "upcoming") {
                return { background: "yellow", borderRadius: "50%" }; 
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


                        return (
                            <PickersDay {...otherProps} day={day} style={dayStyle} />
                        );
                    },
                }}
            />
        </LocalizationProvider>
    );
}
Calendar.propTypes = {
    day: PropTypes.string.isRequired,
};