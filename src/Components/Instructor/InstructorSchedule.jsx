import { useEffect, useState } from "react";
import "../../CSS/StudentScheduleReport.css"; // Reuse same styles
import { getInstructorSchedule } from "../../ApiService/InstructorScheduleReport";
export default function InstructorSchedule() {
    const [instructorData, setInstructorData] = useState(null);

    useEffect(() => {
        const fetchSchedule = async () => {
            const data = await getInstructorSchedule();
            console.log("Instructor Schedule Report: ",data)
            if (data) {
                setInstructorData(data);
            }
        };

        fetchSchedule();
    }, []);

    if (!instructorData) {
        return <div>Loading...</div>;
    }

    const { instructor, courses } = instructorData;

    return (
        <div>
            <div className="schedule-top">
                <div className="schedule-top-element">
                    <div className="schedule-top-info">
                        <label>Instructor ID:</label>
                        <span>{instructor.instructor_id}</span>
                    </div>
                    <div className="schedule-top-info">
                        <label>Name:</label>
                        <span>{instructor.first_name} {instructor.last_name}</span>
                    </div>
                    <div className="schedule-top-info">
                        <label>Department:</label>
                        <span>{instructor.department}</span>
                    </div>
                </div>
                <div className="schedule-top-element">
                    <div className="schedule-top-info">
                        <label>Email:</label>
                        <span>{instructor.email}</span>
                    </div>
                    <div className="schedule-top-info">
                        <label>Phone:</label>
                        <span>{instructor.phone}</span>
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
                            <th className="schedule-th">Term</th>
                            <th className="schedule-th">Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={index}>
                                <td>{course.course_code}</td>
                                <td>{course.course_name}</td>
                                <td>{course.room_name}</td>
                                <td>{course.day_of_week.join(", ")}</td>
                                <td>{course.time_start} - {course.time_end}</td>
                                <td>{course.term}</td>
                                <td>{course.year}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
