import { useEffect, useState } from "react";
import { getStudentSchedule } from "../../ApiService/StudentScheduleReportService";
import "../../CSS/StudentScheduleReport.css";

export default function StudentScheduleReport() {
    const [studentData, setStudentData] = useState(null);

    useEffect(() => {
        const fetchSchedule = async () => {
            const data = await getStudentSchedule();
            if (data) {
                setStudentData(data);
            }
        };

        fetchSchedule();
    }, []);

    if (!studentData) {
        return <div>Loading...</div>;
    }
    const { student, courses } = studentData;

    return (
        <div className="schedule-report-container">
            <div className="schedule-top">
                <div className="schedule-top-element">
                    <div className="schedule-top-info">
                        <label htmlFor="">Student ID:</label>
                        <span>{student.student_id}</span>
                    </div>
                    <div className="schedule-top-info">
                        <label htmlFor="">Name: </label>
                        <span>{student.first_name} {student.last_name}</span>
                    </div>
                    <div className="schedule-top-info">
                        <label htmlFor="">Major: </label>
                        <span>{student.major}</span>
                    </div>
                </div>
                <div className="schedule-top-element">
                    <div className="schedule-top-info">
                        <label htmlFor="">Year: </label>
                        <span>{courses[0].year || "N/A"}</span>
                    </div>
                    {console.log(courses)}
                    <div className="schedule-top-info">
                        <label htmlFor="">Semester: </label>
                        <span>{courses.length > 0 ? courses[0].term : "N/A"} {courses.length > 0 ? courses[0].year : "N/A"}</span>
                    </div>

                </div>
            </div>

            <div className="schedule-table-container">
                <table className="schedule-table">
                    <thead>
                        <tr>
                            <th className="schedule-th">Course Code</th>
                            <th className="schedule-th">Course Name</th>
                            <th className="schedule-th">Room</th>
                            <th className="schedule-th">Day</th>
                            <th className="schedule-th">Time</th>
                            <th className="schedule-th">Instructor</th>
                            <th className="schedule-th">Credits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={index}>
                                <td>{course.course_code}</td>
                                <td className="courseName-td">{course.course_name}</td>
                                <td>{course.room_name}</td>
                                <td>{course.day_of_week.join(", ")}</td>
                                <td>{course.time_start} - {course.time_end}</td>
                                <td>{course.instructors.map(inst => `${inst.first_name} ${inst.last_name}`).join(", ")}</td>
                                <td>3</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <span className="credits">
                Credits: {courses.reduce((total, course) => total + course.credits, 0)}
            </span>
        </div>
    )
}