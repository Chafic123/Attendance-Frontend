import "../../CSS/AdminAdd.css";
import PropTypes from 'prop-types';
const AdminAddCourse = () => {
    return (

        <div className="add-card">
            <h2 className="card-title">Add Course</h2>
            
            <form className="add-form" >
                <div className="form-group">
                    <label htmlFor="code">Code:</label>
                    <input
                        type="text"
                        id="code"
                        name="code"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                    />
                </div>

                <div className="form-group" id='form-group-date'>
                    <label>Date:</label>
                    <div className="date-inputs">
                        <select
                            name="startDate"
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

                        />
                        <span className="arrow">→</span>
                        <input
                            type="time"
                            name="endTime"
                            
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="instructor">Instructor:</label>
                    <input
                        type="text"
                        id="instructor"
                        name="instructor"
                        
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="instructorId">ID:</label>
                    <input
                        type="text"
                        id="instructorId"
                        name="instructorId"
                       
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="room">Room:</label>
                        <input
                            type="text"
                            id="room"
                            name="room"
                            
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="credits">Credits:</label>
                        <input
                            type="number"
                            id="credits"
                            name="credits"
                            
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" className="cancel-btn">Cancel</button>
                    <button type="submit" className="save-btn">Save Changes</button>
                    </div>
            </form>
        </div>
    );
};

AdminAddCourse.propTypes = {
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

export default AdminAddCourse;
