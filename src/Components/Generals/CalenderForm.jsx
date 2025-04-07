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
import { getAdminStudentCourseCalendar } from "../../ApiService/AdminCalendarService";
import { getAdminCourseCalendar } from "../../ApiService/AdminCalendarService";
export default function Calendar({ setRequestCorrectionState, setSelectedAttendance }) {
    const [calendarData, setCalendarData] = useState([]);
    const [instructorCalendarData, setInstructorCalendarData] = useState([]);
    const [adminCalendarData, setAdminCalendarData] = useState([]);

    const { courseId } = useCourse();
    const [tooltip, setTooltip] = useState({ message: "", visible: false, x: 0, y: 0 });

    const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
    const { studentId } = useStudent();

    useEffect(() => {
        const fetchCalendarData = async () => {
            try {
                if (userRole === "student") {
                    const userID = localStorage.getItem("userID") || sessionStorage.getItem("userID");
                    if (userID) {
                        const data = await getStudentCourseCalendar(courseId, userID);
                        setCalendarData(Array.isArray(data) ? data : []);
                    }
                } else if (userRole === "instructor") {
                    if (!studentId) {
                        const data = await courseCalendar(courseId);
                        setInstructorCalendarData(data?.sessions || []);
                        setCalendarData([]);
                    } else {
                        const studentData = await getInstructorStudentCourseCalendar(courseId, studentId);
                        setCalendarData(Array.isArray(studentData) ? studentData : []);
                        setInstructorCalendarData([]);
                    }
                } else if (userRole === "admin") {
                    if (studentId && courseId) {
                        const data = await getAdminStudentCourseCalendar(courseId, studentId);
                        setAdminCalendarData(Array.isArray(data) ? data : []);
                        setCalendarData([]);
                    } else if(courseId && !studentId){
                        const data = await getAdminCourseCalendar(courseId, studentId);
                        setAdminCalendarData(Array.isArray(data) ? data : []);
                        setCalendarData([]);
                    } else {
                        setAdminCalendarData([]);
                    }
                }
            } catch (error) {
                console.error("Error fetching calendar data:", error);
                setCalendarData([]);
                setInstructorCalendarData([]);
                setAdminCalendarData([]);
            }
        };
    
        fetchCalendarData();
    }, [courseId, userRole, studentId]);

    const { dayStatusMap, instructorDayMap, adminDayMap } = useMemo(() => {
        const dayMap = calendarData.reduce((map, day) => {
            map[dayjs(day.date).format("YYYY-MM-DD")] = day.status;
            return map;
        }, {});
        
        const instructorMap = instructorCalendarData.reduce((map, session) => {
            map[dayjs(session.date).format("YYYY-MM-DD")] =
                session.date < dayjs().format("YYYY-MM-DD") ? "past" : "future";
            return map;
        }, {});
   
        const adminMap = adminCalendarData.reduce((map, day) => {
            map[dayjs(day.date).format("YYYY-MM-DD")] = day.status;
            return map;
        }, {});
   
        return { dayStatusMap: dayMap, instructorDayMap: instructorMap, adminDayMap: adminMap };
    }, [calendarData, instructorCalendarData, adminCalendarData]);

    const getDayStyle = useCallback((date) => {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        const status = dayStatusMap[formattedDate];
        const instructorStatus = instructorDayMap[formattedDate];
        const adminStatus = adminDayMap[formattedDate];

        if (adminStatus) {
            if (adminStatus === "present") return {
                background: "linear-gradient(180deg, #604099 0%, #4A5DA9 100%)",
                borderRadius: "50%",
                color: "white"
            };
            if (adminStatus === "absent") return { 
                background: "red", 
                borderRadius: "50%", 
                color: "white" 
            };
            if (adminStatus === "upcoming") return { 
                background: "gray", 
                borderRadius: "50%", 
                color: "white" 
            };
        }

        // Fall back to other statuses if no admin status
        if (status === "present") return {
            background: "linear-gradient(180deg, #604099 0%, #4A5DA9 100%)",
            borderRadius: "50%",
            color: "white"
        };
        if (status === "absent") return { 
            background: "red", 
            borderRadius: "50%", 
            color: "white" 
        };
        if (status === "upcoming") return { 
            background: "gray", 
            borderRadius: "50%", 
            color: "white" 
        };
        if (instructorStatus === "past") return {
            background: "linear-gradient(180deg, #604099 0%, #4A5DA9 100%)",
            borderRadius: "50%",
            color: "white"
        };
        if (instructorStatus === "future") return { 
            background: "gray", 
            borderRadius: "50%", 
            color: "white" 
        };

        return {};
    }, [dayStatusMap, instructorDayMap, adminDayMap]);

    const hasStatus = useCallback((date) => {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        return Boolean(
            dayStatusMap[formattedDate] || 
            instructorDayMap[formattedDate] || 
            adminDayMap[formattedDate]
        );
    }, [dayStatusMap, instructorDayMap, adminDayMap]);

    const handleMouseEnter = useCallback((date, event) => {
        if (!hasStatus(date)) return;

        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        const status = dayStatusMap[formattedDate];
        const instructorStatus = instructorDayMap[formattedDate];
        const adminStatus = adminDayMap[formattedDate];

        let message = "";
        if (userRole === "admin") {
            if (adminStatus === "present") message = "Present";
            else if (adminStatus === "absent") message = "Absent";
            else if (adminStatus === "upcoming") message = "Upcoming";
        } else if (userRole === "student") {
            if (status === "present") message = "Present";
            else if (status === "absent") message = "Absent";
            else if (status === "upcoming") message = "Upcoming";
        } else if (userRole === "instructor") {
            if (!studentId) {
                if (instructorStatus === "past") message = "Already Passed";
                else if (instructorStatus === "future") message = "Upcoming";
            } else {
                if (status === "present") message = "Present";
                else if (status === "absent") message = "Absent";
                else if (status === "upcoming") message = "Upcoming";
            }
        }

        setTooltip({
            message,
            visible: true,
            x: event.clientX,
            y: event.clientY - 40
        });
    }, [dayStatusMap, instructorDayMap, adminDayMap, userRole, studentId, hasStatus]);

    const handleMouseLeave = useCallback(() => {
        setTooltip(prev => ({ ...prev, visible: false }));
    }, []);

    const CustomDay = useCallback((props) => {
        const { day, ...otherProps } = props;
        const formattedDate = dayjs(day).format("YYYY-MM-DD");
        const dayStyle = getDayStyle(day);

        const handleDayClick = () => {
            let selectedAttendance;
            if (userRole === "admin") {
                selectedAttendance = adminCalendarData.find(
                    item => dayjs(item.date).format("YYYY-MM-DD") === formattedDate
                );
            } else {
                selectedAttendance = calendarData.find(
                    item => dayjs(item.date).format("YYYY-MM-DD") === formattedDate
                );
            }

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
    }, [calendarData, adminCalendarData, getDayStyle, handleMouseEnter, handleMouseLeave, setRequestCorrectionState, setSelectedAttendance, hasStatus, userRole]);

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