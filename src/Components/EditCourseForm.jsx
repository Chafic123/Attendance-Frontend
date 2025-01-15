// import React from 'react';
import PropTypes from 'prop-types';

const EditCourseForm = ({ courseData, onChange, onSave, onCancel }) => {
    return (

        <form className="edit-course-form" onSubmit={onSave}>
            <h2>Start Editing</h2>
            <p>
                <strong>{courseData.code}</strong>
            </p>
            <p>{courseData.name}</p>

            <div>
                <label>
                    Code :
                    <input
                        type="text"
                        name="code"
                        value={courseData.code}
                        readOnly
                    />
                </label>
            </div>

            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={courseData.name}
                        onChange={onChange}
                        placeholder="Course Name"
                    />
                </label>
            </div>

            <div>
                <label>
                    Date:
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
                    <span> {'-->'} </span>
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
                </label>
            </div>

            <div>
                <label>
                    Time:
                    <input
                        type="time"
                        name="startTime"
                        value={courseData.startTime}
                        onChange={onChange}
                    />
                    <span> {'-->'} </span>
                    <input
                        type="time"
                        name="endTime"
                        value={courseData.endTime}
                        onChange={onChange}
                    />
                </label>
            </div>

            <div>
                <label>
                    Instructor:
                    <input
                        type="text"
                        name="instructor"
                        value={courseData.instructor}
                        onChange={onChange}
                        placeholder="Instructor Name"
                    />
                </label>
                <label>
                    ID:
                    <input
                        type="text"
                        name="instructorId"
                        value={courseData.instructorId}
                        onChange={onChange}
                        placeholder="Instructor ID"
                    />
                </label>
            </div>

            <div>
                <label>
                    Room:
                    <input
                        type="text"
                        name="room"
                        value={courseData.room}
                        onChange={onChange}
                        placeholder="Room"
                    />
                </label>
            </div>

            <div>
                <label>
                    Credits:
                    <input
                        type="number"
                        name="credits"
                        value={courseData.credits}
                        onChange={onChange}
                        placeholder="Credits"
                    />
                </label>
            </div>

            <div className="form-actions">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
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
