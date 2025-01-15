// import React from 'react';
import PropTypes from 'prop-types';
import "../CSS/AdminEditCourse.css";

const EditCourseForm = ({ courseData, onChange, onSave, onCancel }) => {
    return (

        <div className="edit-course-card">
            <h2 className="card-title">Start Editing</h2>
            {/* {courseData.code} */}
            <p className="course-code">GRDS421</p>
            {/* {courseData.name} */}
            <p className="course-name">Web and Interactive Design</p>
            <p className='instructor-name'>Myriam Chamoon</p>
            
            <form className="edit-course-form" onSubmit={onSave}>
                <div className="form-group">
                    <label htmlFor="code">Code:</label>
                    <input
                        type="text"
                        id="code"
                        name="code"
                        value={courseData.code}
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={courseData.name}
                        onChange={onChange}
                    />
                </div>

                <div className="form-group" id='form-group-date'>
                    <label>Date:</label>
                    <div className="date-inputs">
                        <select
                            name="startDate"
                            value={courseData.startDate}
                            onChange={onChange}
                        >
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                        </select>
                        <span className="arrow">→</span>
                        <select
                            name="endDate"
                            value={courseData.endDate}
                            onChange={onChange}
                        >
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label>Time:</label>
                    <div className="time-inputs">
                        <input
                            type="time"
                            name="startTime"
                            value={courseData.startTime}
                            onChange={onChange}
                        />
                        <span className="arrow">→</span>
                        <input
                            type="time"
                            name="endTime"
                            value={courseData.endTime}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="instructor">Instructor:</label>
                    <input
                        type="text"
                        id="instructor"
                        name="instructor"
                        value={courseData.instructor}
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="instructorId">ID:</label>
                    <input
                        type="text"
                        id="instructorId"
                        name="instructorId"
                        value={courseData.instructorId}
                        onChange={onChange}
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="room">Room:</label>
                        <input
                            type="text"
                            id="room"
                            name="room"
                            value={courseData.room}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="credits">Credits:</label>
                        <input
                            type="number"
                            id="credits"
                            name="credits"
                            value={courseData.credits}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
                    <button type="submit" className="save-btn">Save Changes</button>
                    </div>
            </form>
        </div>
    );
};

EditCourseForm.propTypes = {
    courseData: PropTypes.shape({
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
        instructor: PropTypes.string.isRequired,
        instructorId: PropTypes.string.isRequired,
        room: PropTypes.string.isRequired,
        credits: PropTypes.number.isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default EditCourseForm;
