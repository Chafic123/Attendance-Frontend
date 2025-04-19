import { useState, useEffect } from "react";
import "../../CSS/AdminEditCourse.css";
import { updateCourse } from "../../ApiService/EditCourseService";
import { getCourses } from "../../ApiService/CourseService";
import { getInstructors } from "../../ApiService/InstructorService";

export default function AdminEditCourse({ editedCourse, setEditedCourse, setCourses }) {
    const [successMessage, setSuccessMessage] = useState("");
    const [noChangesMessage, setNoChangesMessage] = useState("");
    const [instructors, setInstructors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [courseData, setCourseData] = useState({
        Code: "",
        name: "",
        instructor_id: "",
        day_of_week: "",
        start_time: "",
        end_time: "",
        Section: "",
        Room: "",
        credit: "",
    });

    // Fetch instructors and initialize course data
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const instructorsData = await getInstructors();
                setInstructors(instructorsData);
                
                if (editedCourse) {
                    setCourseData({
                        Code: editedCourse.Code || "",
                        name: editedCourse.name || "",
                        instructor_id: editedCourse.instructors?.[0]?.id || "",
                        day_of_week: editedCourse.day_of_week || "",
                        start_time: editedCourse.start_time || "",
                        end_time: editedCourse.end_time || "",
                        Section: editedCourse.Section || "",
                        Room: editedCourse.Room || "",
                        credit: editedCourse.credit || 3,
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchData();
    }, [editedCourse]);

    const onCancel = () => {
        setEditedCourse(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await updateCourse(editedCourse.id, courseData);
            setSuccessMessage("Course Updated Successfully");
            const updatedCourses = await getCourses();
            setCourses(Array.isArray(updatedCourses) ? updatedCourses : []);
        } catch (error) {
            console.error("Update error:", error);
            setNoChangesMessage(error.response?.data?.message || "Failed to update course");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div className="loading-container">Loading...</div>;
    }

    return (
        <div className="add-course-card">
            {successMessage && (
                <div className="popup-container">
                    <div className="popup-message" style={{ backgroundColor: 'white', color: "#543381" }}>
                        <p>{successMessage}</p>
                        <button 
                            onClick={() => {
                                setSuccessMessage("");
                                setEditedCourse(null);
                            }} 
                            className="popup-close-btn"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {noChangesMessage && (
                <div className="popup-container">
                    <div className="popup-message" style={{ backgroundColor: 'white', color: 'red' }}>
                        <p>{noChangesMessage}</p>
                        <button 
                            onClick={() => setNoChangesMessage("")} 
                            className="popup-close-btn"
                        >
                            Close
                        </button>
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
                    <select
                        name="day_of_week"
                        value={courseData.day_of_week}
                        onChange={handleChange}
                        required
                        className="dayOfWeak"
                    >
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

                <div className="form-course-group">
                    <label htmlFor="instructor_id">Instructor:</label>
                    <select
                        name="instructor_id"
                        value={courseData.instructor_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select Instructor --</option>
                        {instructors.map(instructor => (
                            <option 
                                key={instructor.instructor.id} 
                                value={instructor.instructor.id}
                            >
                                {instructor.first_name} {instructor.last_name}
                                {instructor.id === courseData.instructor_id && " (Current)"}
                            </option>
                        ))}
                    </select>
                </div>



                <div className="form-course-row">
                    
                <div className="form-course-group">
                    <label htmlFor="Section">Section:</label>
                    <input
                        type="number"
                        name="Section"
                        value={courseData.Section}
                        onChange={handleChange}
                        required
                        className="courseSection"
                    />
                </div>

                    <div className="form-course-group">
                        <label htmlFor="Room">Room:</label>
                        <input
                            type="text"
                            className="courseRoom"
                            name="Room"
                            value={courseData.Room}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-course-group">
                        <label htmlFor="credit">Credits:</label>
                        <input
                            type="number"
                            className="courseCredits"
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
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="save-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}