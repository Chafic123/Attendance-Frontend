import "../../CSS/AdminAddCourse.css";
import { useState, useEffect } from "react";
import { addCourse } from "../../ApiService/CourseService";
import { getCourses } from "../../ApiService/CourseService";
import { getInstructors } from "../../ApiService/InstructorService";
const AdminAddCourse = ({ setCourses }) => {
    const [successMessage, setSuccessMessage] = useState("");
    const [noSuccessMessage, setNoSuccessMessage] = useState("");
    const [instructors, setInstructors] = useState([]);

    const [courseData, setCourseData] = useState({
        Code: "",
        name: "",
        Room: "",
        credit: "",
        Section: "",
        day_of_week: "",
        start_time: "",
        end_time: "",
        instructor_id: "",
    });

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const instructorsData = await getInstructors();
                setInstructors(instructorsData);
            } catch (error) {
                console.error("Error fetching instructors:", error);
            }
        };
        fetchInstructors();
    }, []);

    const handleChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    };
    const [isAddingCourse, setIsAddingCourse] = useState(false);

    const handleAddCourse = async (e) => {
        e.preventDefault();
        setIsAddingCourse(true);
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
                courseData.instructor_id
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
                instructor_id: "",
            });
        } catch (error) {
            setNoSuccessMessage(error.response.data.message)
        } finally {
            setIsAddingCourse(false);
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

                <div className="form-course-group">
                    <label htmlFor="instructor_id">Instructor:</label>
                    <select
                        name="instructor_id"
                        id="instructor_id"
                        value={courseData.instructor_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select Instructor --</option>
                        {instructors.map(instructor => (
                            <option key={instructor.instructor.id} value={instructor.instructor.id}>
                                {instructor.first_name} {instructor.last_name}
                            </option>
                        ))}
                    </select>
                </div>



                <div className="form-course-row">
                    <div className="form-course-group">
                        <label htmlFor="Room">Section:</label>
                        <input className="courseSection" type="text" id="Section" name="Section" value={courseData.Section} onChange={handleChange} required />
                    </div>
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
                                instructor_id: "",
                            })
                        }
                    >
                        Clear
                    </button>
                    <button type="submit" className="save-btn" disabled={isAddingCourse}>
                        {isAddingCourse ? "Adding Course..." : "Add Course"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminAddCourse;