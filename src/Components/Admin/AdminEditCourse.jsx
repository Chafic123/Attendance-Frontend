import { useState, useEffect } from "react";
import "../../CSS/AdminEditCourse.css";
import { updateCourse } from "../../ApiService/EditCourseService";
import { getCourses } from "../../ApiService/CourseService";

export default function AdminEditCourse({ editedCourse, setEditedCourse,setCourses }) {
    const [successMessage, setSuccessMessage] = useState(""); 
    const [noChangesMessage, setNoChangesMessage] = useState("");

    const [courseData, setCourseData] = useState({
        Code: "",
        name: "",
        email:"",
        day_of_week: "",
        start_time: "",
        end_time: "",
        section: "",
        room: "",
        credits: "",
    });

    const onCancel = () => {
        setEditedCourse(null);
    }

    useEffect(() => {
        if (editedCourse) {
            setCourseData({
                Code: editedCourse.Code || "",
                name: editedCourse.name || "",
                email: editedCourse.instructors?.[0]?.user?.email || "",
                day_of_week: editedCourse.day_of_week || "",
                start_time: editedCourse.start_time || "",
                end_time: editedCourse.end_time || "",
                section: editedCourse.Section || "",
                room: editedCourse.Room || "",
                credits: editedCourse.credit || 3,
            });
        }
    }, [editedCourse]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const response = await updateCourse(editedCourse.id, courseData);
            console.log("Updated course:", response);
            setSuccessMessage("Course Updated Successfully")
            const courseData2 = await getCourses();
            setCourses(Array.isArray(courseData2) ? courseData2 : []);
        } catch (error) {
            alert("Failed to update course.");
            setNoChangesMessage("An Error Has Occurred!");
        }
    };

    return (
        <div className="add-course-card">
             {successMessage && (
                <div className="popup-container">
                    <div className="popup-message" style={{ backgroundColor: 'white', color: "#543381"}}>
                        <p>{successMessage}</p>
                        <button onClick={() => setSuccessMessage("")} className="popup-close-btn">Close</button>
                    </div>
                </div>
            )}

            {noChangesMessage && (
                <div className="popup-container">
                    <div className="popup-message" style={{ backgroundColor: 'white', color: 'red' }}>
                        <p>{noChangesMessage}</p>
                        <button onClick={() => setNoChangesMessage("")} className="popup-close-btn">Close</button>
                    </div>
                </div>
            )}
            <h2 className="card-course-title">Edit Course</h2>
            <form className="add-course-form" onSubmit={handleSave}>
                <div className="form-course-group">
                    <label htmlFor="Code">Code:</label>
                    <input
                        type="text"
                        name="Code"
                        value={courseData.Code}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-course-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={courseData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-course-group">
                    <label htmlFor="day_of_week">Days:</label>
                    <input
                        type="text"
                        name="day_of_week"
                        value={courseData.day_of_week}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-course-group">
                    <label>Time:</label>
                    <div className="course-time-inputs">
                        <input
                            type="time"
                            name="start_time"
                            value={courseData.start_time}
                            onChange={handleChange}
                            required
                        />
                        <span className="course-arrow">→</span>
                        <input
                            type="time"
                            name="end_time"
                            value={courseData.end_time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* <div className="form-course-group">
          <label>Instructor:</label>
          <div className="instructor-info-container">
            <input
              className="instructor-first-name"
              type="text"
              name="instructor_first_name"
              value={courseData.instructor_first_name}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
            <input
              className="instructor-last-name"
              type="text"
              name="instructor_last_name"
              value={courseData.instructor_last_name}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>
        </div> */}
                <div className="form-course-group">
                    <label htmlFor="Section">Email:</label>
                    <input
                        type="text"
                        name="section"
                        value={courseData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-course-group">
                    <label htmlFor="Section">Section:</label>
                    <input
                        type="text"
                        name="section"
                        value={courseData.section}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-course-row">
                    <div className="form-course-group">
                        <label htmlFor="Room">Room:</label>
                        <input
                            type="text"
                            name="room"
                            value={courseData.room}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-course-group">
                        <label htmlFor="credit">Credits:</label>
                        <input
                            type="number"
                            name="credits"
                            min={1}
                            value={courseData.credits}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-course-actions">
                    <button type="button" className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="save-btn">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
