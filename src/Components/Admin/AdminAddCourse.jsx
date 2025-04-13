import "../../CSS/AdminAddCourse.css";
import { useState } from "react";
import { addCourse } from "../../ApiService/CourseService";
import { getCourses } from "../../ApiService/CourseService";
const AdminAddCourse = ({ setCourses }) => {
    const [successMessage, setSuccessMessage] = useState("");
    const [noSuccessMessage, setNoSuccessMessage] = useState("");

    const [courseData, setCourseData] = useState({
        Code: "",
        name: "",
        Room: "",
        credit: "",
        Section: "",
        day_of_week: "",
        start_time: "",
        end_time: "",
        instructor_first_name: "",
        instructor_last_name: "",
        instructor_email: "",
    });

    const handleChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {

            const result = await addCourse(
                courseData.Code,
                courseData.name,
                courseData.Room,
                courseData.credit,
                courseData.Section,
                courseData.day_of_week,
                courseData.start_time,
                courseData.end_time,
                courseData.instructor_first_name,
                courseData.instructor_last_name,
                courseData.instructor_email
            );

            const courseData2 = await getCourses();
            setCourses(Array.isArray(courseData2) ? courseData2 : []);
            setSuccessMessage("Course Added Successfully!")

            setCourseData({
                Code: "",
                name: "",
                Room: "",
                credit: "",
                Section: "",
                day_of_week: "",
                start_time: "",
                end_time: "",
                instructor_first_name: "",
                instructor_last_name: "",
                instructor_email: "",
            });
        } catch (error) {
            setNoSuccessMessage(error.response.data.message)
            console.log()
        }
    };

    return (
        <div className="add-course-card">
            <h2 className="card-course-title">Add Course</h2>
            {successMessage && (
                <div className="popup-container">
                    <div className="popup-message" style={{ backgroundColor: 'white', color: "#543381" }}>
                        <p>{successMessage}</p>
                        <button onClick={() => setSuccessMessage("")} className="popup-close-btn">Close</button>
                    </div>
                </div>
            )}

            {noSuccessMessage && (
                <div className="popup-container">
                    <div className="popup-message" style={{ backgroundColor: 'white', color: 'red' }}>
                        <p>{noSuccessMessage}</p>
                        <button onClick={() => setNoSuccessMessage("")} className="popup-close-btn">Close</button>
                    </div>
                </div>
            )}
            <form className="add-course-form" onSubmit={handleAddCourse}>
                <div className="form-course-group">
                    <label htmlFor="Code">Code:</label>
                    <input type="text" id="Code" name="Code" value={courseData.Code} onChange={handleChange} required />
                </div>

                <div className="form-course-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={courseData.name} onChange={handleChange} required />
                </div>

                <div className="form-course-group">
                    <label>Days:</label>
                    <select name="day_of_week" value={courseData.day_of_week} onChange={handleChange} required>
                        <option value="">-- Select Days --</option>
                        <option value="M">Monday</option>
                        <option value="T">Tuesday</option>
                        <option value="W">Wednesday</option>
                        <option value="R">Thursday</option>
                        <option value="F">Friday</option>
                        <option value="MW">Monday - Wednesday</option>
                        <option value="TR">Tuesday - Thursday</option>
                    </select>
                </div>


                <div className="form-course-group">
                    <label>Time:</label>
                    <div className="course-time-inputs">
                        <input className="courseTime" type="time" name="start_time" value={courseData.start_time} onChange={handleChange} required />
                        <span className="course-arrow">→</span>
                        <input className="courseTime" type="time" name="end_time" value={courseData.end_time} onChange={handleChange} required />
                    </div>
                </div>

                {/* <div className="form-course-group">
                    <label htmlFor="instructor">Instructor:</label>
                    <div className="instructor-info-container">
                        <input
                            className="instructor-first-name"
                            type="text"
                            placeholder="First Name"
                            name="instructor_first_name"
                            value={courseData.instructor_first_name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="instructor-last-name"
                            type="text"
                            placeholder="Last Name"
                            name="instructor_last_name"
                            value={courseData.instructor_last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div> */}

                <div className="form-course-group">
                    <label htmlFor="instructor_email">Email:</label>
                    <input
                        type="email"
                        name="instructor_email"
                        id="instructor_email"
                        value={courseData.instructor_email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-course-group">
                    <label htmlFor="Section">Section:</label>
                    <input type="text" name="Section" id="Section" value={courseData.Section} onChange={handleChange} required />
                </div>

                <div className="form-course-row">
                    <div className="form-course-group">
                        <label htmlFor="Room">Room:</label>
                        <input className="courseRoom" type="text" id="Room" name="Room" value={courseData.Room} onChange={handleChange} required />
                    </div>

                    <div className="form-course-group">
                        <label htmlFor="credit">Credits:</label>
                        <input
                            type="number"
                            className="courseCredits"
                            id="credit"
                            name="credit"
                            min={1}
                            value={courseData.credit}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-course-actions">
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() =>
                            setCourseData({
                                Code: "",
                                name: "",
                                Room: "",
                                credit: "",
                                Section: "",
                                day_of_week: "",
                                start_time: "",
                                end_time: "",
                                instructor_first_name: "",
                                instructor_last_name: "",
                                instructor_email: "",
                            })
                        }
                    >
                        Clear
                    </button>
                    <button type="submit" className="save-btn">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default AdminAddCourse;
