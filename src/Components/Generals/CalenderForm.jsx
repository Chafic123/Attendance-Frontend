import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useCourse } from "../../Contexts/CourseContext";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { courseCalendar } from "../../ApiService/InstructorCalendarService";
import { useStudent } from "../../Contexts/getClickedStudentID";
import { getStudentCourseCalendar } from "../../ApiService/StudentCalendarService"
import { getInstructorStudentCourseCalendar } from "../../ApiService/InstructorCalendarService";
export default function Calendar({ setRequestCorrectionState, setSelectedAttendance }) {
    const [calendarData, setCalendarData] = useState([]);
    const [instructorCalendarData, setInstructorCalendarData] = useState([]);
    const { courseId } = useCourse();
    const [tooltip, setTooltip] = useState({ message: "", visible: false, x: 0, y: 0 });

    const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

    const { studentId } = useStudent();

    console.log(studentId)

    useEffect(() => {
        const fetchCalendarData = async () => {
            try {
                if (userRole === "student") {
                    const userID = localStorage.getItem("userID") || sessionStorage.getItem("userID");
                    if (userID) {
                        const data = await getStudentCourseCalendar(courseId, userID);
                        if (Array.isArray(data)) setCalendarData(data);
                        else setCalendarData([]);
                    }
                } else if (userRole === "instructor") {
                    if (!studentId) {
                        const data = await courseCalendar(courseId);
                        if (data?.sessions) {
                            setInstructorCalendarData(data.sessions);
                            setCalendarData([]);
                        } else {
                            setInstructorCalendarData([]);
                        }
                    } else {

                        setCalendarData([]);
                        const studentData = await getInstructorStudentCourseCalendar(courseId, studentId);
                        if (Array.isArray(studentData) && studentData.length > 0) {
                            setCalendarData(studentData);
                        } else {
                            setInstructorCalendarData([]); // Optionally reset instructor data here
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching calendar data:", error);
                setCalendarData([]);
            }
        };
    
        fetchCalendarData();
    }, [courseId, userRole, studentId]);
    
    const { dayStatusMap, instructorDayMap } = useMemo(() => {
        const dayMap = calendarData.reduce((map, day) => {
            map[dayjs(day.date).format("YYYY-MM-DD")] = day.status;
            return map;
        }, {});

        const instructorMap = instructorCalendarData.reduce((map, session) => {
            map[dayjs(session.date).format("YYYY-MM-DD")] =
                session.date < dayjs().format("YYYY-MM-DD") ? "past" : "future";
            return map;
        }, {});

        return { dayStatusMap: dayMap, instructorDayMap: instructorMap };
    }, [calendarData, instructorCalendarData]);

    const getDayStyle = useCallback((date) => {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        const status = dayStatusMap[formattedDate];
        const instructorStatus = instructorDayMap[formattedDate];

        if (status === "present") return {
            background: "linear-gradient(180deg, #604099 0%, #4A5DA9 100%)",
            borderRadius: "50%",
            color: "white"
        };
        if (status === "absent") return { background: "red", borderRadius: "50%", color: "white" };
        if (status === "upcoming") return { background: "gray", borderRadius: "50%", color: "white" };
        if (instructorStatus === "past") return {
            background: "linear-gradient(180deg, #604099 0%, #4A5DA9 100%)",
            borderRadius: "50%",
            color: "white"
        };

        if (instructorStatus === "future") return { background: "gray", borderRadius: "50%", color: "white" };

        return {};
    }, [dayStatusMap, instructorDayMap]);

    const hasStatus = useCallback((date) => {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        return Boolean(dayStatusMap[formattedDate] || instructorDayMap[formattedDate]);
    }, [dayStatusMap, instructorDayMap]);

    const handleMouseEnter = useCallback((date, event) => {
        if (!hasStatus(date)) return;

        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        const status = dayStatusMap[formattedDate];
        const instructorStatus = instructorDayMap[formattedDate];

        let message = "";
        if (userRole === "student") {
            if (status === "present") message = "Present";
            else if (status === "absent") message = "Absent";
            else if (status === "upcoming") message = "Upcoming";
        } else if (userRole === "instructor" && !studentId) {
            if (instructorStatus === "past") message = "Already Passed";
            else if (instructorStatus === "future") message = "Upcoming";
        } else if (userRole === "instructor" && studentId) {
            if (status === "present") message = "Present";
            else if (status === "absent") message = "Absent";
            else if (status === "upcoming") message = "Upcoming";
        }

        setTooltip({
            message,
            visible: true,
            x: event.clientX,
            y: event.clientY - 40
        });
    }, [dayStatusMap, instructorDayMap, userRole, hasStatus]);

    const handleMouseLeave = useCallback(() => {
        setTooltip(prev => ({ ...prev, visible: false }));
    }, []);

    const CustomDay = useCallback((props) => {
        const { day, ...otherProps } = props;
        const formattedDate = dayjs(day).format("YYYY-MM-DD");
        const dayStyle = getDayStyle(day);

        const handleDayClick = () => {
            const selectedAttendance = calendarData.find(
                item => dayjs(item.date).format("YYYY-MM-DD") === formattedDate
            );

            if (selectedAttendance) {
                setSelectedAttendance(selectedAttendance);
                setRequestCorrectionState(selectedAttendance.status === "absent");
            } else {
                setSelectedAttendance(null);
                setRequestCorrectionState(false);
            }
        };

        return (
            <PickersDay
                {...otherProps}
                day={day}
                style={dayStyle}
                onClick={handleDayClick}
                onMouseEnter={hasStatus(day) ? (e) => handleMouseEnter(day, e) : undefined}
                onMouseLeave={hasStatus(day) ? handleMouseLeave : undefined}
            />
        );
    }, [calendarData, getDayStyle, handleMouseEnter, handleMouseLeave, setRequestCorrectionState, setSelectedAttendance, hasStatus]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{ position: "relative" }}>
                <DateCalendar slots={{ day: CustomDay }} />

                {tooltip.visible && (
                    <div
                        style={{
                            position: "fixed",
                            top: tooltip.y,
                            left: tooltip.x,
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            pointerEvents: "none",
                            zIndex: 9999,
                            transform: "translateX(-50%)",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {tooltip.message}
                    </div>
                )}
            </div>
        </LocalizationProvider>
    );
}

Calendar.propTypes = {
    setRequestCorrectionState: PropTypes.func.isRequired,
    setSelectedAttendance: PropTypes.func.isRequired,
};