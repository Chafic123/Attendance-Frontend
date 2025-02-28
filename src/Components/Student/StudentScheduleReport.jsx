import "../../CSS/StudentScheduleReport.css";


export default function StudentScheduleReport() {
    return (
        <div>
            <div className="schedule-top">
                <div className="schedule-top-element">
                    <div className="schedule-top-info">
                        <label htmlFor="">Student ID:</label>
                        <span>20220004</span>
                    </div>
                    <div className="schedule-top-info">
                        <label htmlFor="">Name: </label>
                        <span>Osama Awad</span>
                    </div>
                    <div className="schedule-top-info">
                        <label htmlFor="">Major: </label>
                        <span>Computer Science</span>
                    </div>

                </div>
                <div className="schedule-top-element">
                    <div className="schedule-top-info">
                        <label htmlFor="">Year: </label>
                        <span>Junior</span>
                    </div>
                    <div className="schedule-top-info">
                        <label htmlFor="">Semester: </label>
                        <span>Fall 2025</span>
                    </div>
                    <div className="schedule-top-info">
                        <label htmlFor="">Advisor: </label>
                        <span>Dr. Roaa Soloh</span>
                    </div>
                </div>
            </div>
            <table className="schedule-table">
                <thead>
                    <tr>
                        <th className="schedule-th">Course Code</th>
                        <th className="schedule-th">Course Name</th>
                        <th className="schedule-th">Type</th>
                        <th className="schedule-th">Room</th>
                        <th className="schedule-th">Day</th>
                        <th className="schedule-th">Time</th>
                        <th className="schedule-th">Instructor</th>
                        <th className="schedule-th">Credits</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>COSC343</td>
                        <td className="courseName-td">Introduction to Web Programming</td>
                        <td className="course-type-library"><span>Laboratary</span></td>
                        <td>H102</td>
                        <td>MW</td>
                        <td>9:00AM - 10:15PM</td>
                        <td>Roaa Soloh</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>COSC343</td>
                        <td className="courseName-td">Introduction to Web Programming</td>
                        <td className="course-type"><span>Lecture</span></td>
                        <td>H102</td>
                        <td>MW</td>
                        <td>9:00AM - 10:15PM</td>
                        <td>Roaa Soloh</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>COSC343</td>
                        <td className="courseName-td">Introduction to Web Programming</td>
                        <td className="course-type"><span>Lecture</span></td>
                        <td>H102</td>
                        <td>MW</td>
                        <td>9:00AM - 10:15PM</td>
                        <td>Roaa Soloh</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>COSC343</td>
                        <td className="courseName-td">Introduction to Web Programming</td>
                        <td className="course-type"><span>Lecture</span></td>
                        <td>H102</td>
                        <td>MW</td>
                        <td>9:00AM - 10:15PM</td>
                        <td>Roaa Soloh</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>COSC343</td>
                        <td className="courseName-td">Introduction to Web Programming</td>
                        <td className="course-type"><span>Lecture</span></td>
                        <td>H102</td>
                        <td>MW</td>
                        <td>9:00AM - 10:15PM</td>
                        <td>Roaa Soloh</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>COSC343</td>
                        <td className="courseName-td">Introduction to Web Programming</td>
                        <td className="course-type-library"><span>Laboratary</span></td>
                        <td>H102</td>
                        <td>MW</td>
                        <td>9:00AM - 10:15PM</td>
                        <td>Roaa Soloh</td>
                        <td>3</td>
                    </tr>
                </tbody>
            </table>
            <span className="credits">Credits:    13</span>
        </div>
    )
}