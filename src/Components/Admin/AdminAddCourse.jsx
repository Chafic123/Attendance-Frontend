import "../../CSS/AdminAddCourse.css";
import { useState } from "react";
import { addCourse } from "../../ApiService/CourseService";
const AdminAddCourse = () => {
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

            alert("Course added successfully!");
        } catch (error) {
            alert("Failed to add course. Please check your input.");
        }
    };

    return (
        <div className="add-course-card">
            <h2 className="card-course-title">Add Course</h2>
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
                    <input type="text" name="day_of_week" value={courseData.day_of_week} onChange={handleChange} required />
                </div>

                <div className="form-course-group">
                    <label>Time:</label>
                    <div className="course-time-inputs">
                        <input type="time" name="start_time" value={courseData.start_time} onChange={handleChange} required />
                        <span className="course-arrow">→</span>
                        <input type="time" name="end_time" value={courseData.end_time} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-course-group">
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
                </div>

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
                        <input type="text" id="Room" name="Room" value={courseData.Room} onChange={handleChange} required />
                    </div>

                    <div className="form-course-group">
                        <label htmlFor="credit">Credits:</label>
                        <input
                            type="number"
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
                    <button type="button" className="cancel-btn">Cancel</button>
                    <button type="submit" className="save-btn">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default AdminAddCourse;
