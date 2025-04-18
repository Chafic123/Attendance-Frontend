import { useEffect, useState } from "react";
import "../../CSS/InstrcutortScheduleReport.css"; 
import { getInstructorSchedule } from "../../ApiService/InstructorScheduleReport";
import { downloadInstructorScheduleReport } from "../../ApiService/InstructorScheduleReport";
import LoadingSpinner from "../Generals/LoadingSpinner";
export default function InstructorSchedule() {
    const [instructorData, setInstructorData] = useState(null);
    const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
    const [loading, setLoading] = useState(true);

    const handleGenerateInstructorReport = async () => {
        try {
            await downloadInstructorScheduleReport();
        } catch (error) {
            console.error("Failed to generate instructor schedule report:", error.message);
        }
    };
    useEffect(() => {
        const fetchSchedule = async () => {
            const data = await getInstructorSchedule();
            if (data) {
                setInstructorData(data);
                setLoading(false);
            }
        };

        fetchSchedule();
    }, []);

    if (!instructorData) {
        return (
            <div className="loading-container">
                <LoadingSpinner />
            </div>
        );
    }

    const { instructor, courses } = instructorData;

    return (
        <div className="schedule-report-container"  style={loading ? { 
            position: 'relative',  // Required for absolute positioning of spinner
            minHeight: '300px'    // Ensures minimum space for spinner
          } : {}}>
            
            <div className="schedule-top">
                <div className="schedule-top-element">

                    <div className="schedule-top-info">
                        <label>Name:</label>
                        <span>{instructor.first_name} {instructor.last_name}</span>
                    </div>
                    <div className="schedule-top-info">
                        <label>Email:</label>
                        <span>{instructor.email}</span>
                    </div>
      
                </div>
                <div className="schedule-top-element">
                <div className="schedule-top-info">
                        <label>Department:</label>
                        <span>{instructor.department}</span>
                    </div>
                    <div className="schedule-top-info">
                        <label>Phone:</label>
                        <span>{instructor.phone}</span>
                    </div>
                </div>
            </div>

            <div className="instructor-schedule-table-container">
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
                                <td>Spring</td>
                                <td>2025</td> {/*Static Currently*/}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {userRole === "instructor" && (
                <button
                    onClick={handleGenerateInstructorReport}
                    className="generate-instructor-report-btn"
                
                >
                    Generate Report
                </button>

            )}
        </div>
    );
}
