import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay'; 
import { useState, useEffect, useCallback } from "react";
import { getStudentCourseCalendar } from "../../ApiService/StudentCalendarService"; 
import { useCourse } from '../../Contexts/CourseContext';
import dayjs from 'dayjs'; 
import PropTypes from 'prop-types'; 

export default function Calendar({ setRequestCorrectionState }) {
    const [calendarData, setCalendarData] = useState([]);
    const { courseId } = useCourse();  
    const userID = localStorage.getItem('userID') || sessionStorage.getItem('userID');
    const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

    useEffect(() => {
        if (courseId && userID && userRole === "student") {
            const fetchCalendarData = async () => {
                try {
                    const data = await getStudentCourseCalendar(courseId, userID);
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

    const dayStatusMap = useCallback(() => {
        return calendarData.reduce((map, day) => {
            const formatted = dayjs(day.date).format("YYYY-MM-DD");
            map[formatted] = day.status;
            return map;
        }, {});
    }, [calendarData]);

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
        return {};
    }, [dayStatusMap]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                slots={{
                    day: (props) => {
                        const { day, ...otherProps } = props;
                        const formattedDate = dayjs(day).format("YYYY-MM-DD");
                        const status = dayStatusMap()[formattedDate];
                        const dayStyle = getDayStyle(day);

                        const handleDayClick = () => {
                            if (status === "absent") {
                                setRequestCorrectionState(true);
                            }
                            else{
                                setRequestCorrectionState(false);

                            }
                                
                        };

                        return (
                            <PickersDay
                                {...otherProps}
                                day={day}
                                style={dayStyle}
                                onClick={handleDayClick}
                            />
                        );
                    },
                }}
            />
        </LocalizationProvider>
    );
}

Calendar.propTypes = {
    setRequestCorrectionState: PropTypes.func.isRequired,
};
