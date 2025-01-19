import "../../CSS/AdminAddStudent.css";
import PropTypes from 'prop-types';
const AdminAddStudent = () => {
    return (

        <div className="add-student-card">
            <h2 className="card-student-title">Add Student</h2>

            <form className="add-student-form" >
                <div className="form-student-group">
                    <label htmlFor="First-Name">First Name:</label>
                    <input
                        type="text"
                        id="First-Name"
                        name="First-Name"
                    />
                </div>

                <div className="form-student-group">
                    <label htmlFor="Last-Name">Last Name:</label>
                    <input
                        type="text"
                        id="Last-Name"
                        name="Last-Name"
                    />
                </div>

                <div className="form-student-group">
                    <label htmlFor="ID-Number">ID Number:</label>
                    <input
                        type="text"
                        id="ID-Number"
                        name="ID-Number"

                    />
                </div>

                <div className="form-student-group">
                    <label htmlFor="Department:">Department:</label>
                    <input
                        type="text"
                        id="Department:"
                        name="Department:"
                    />
                </div>

                <div className="form-student-group">
                    <label htmlFor="Image" id="image">Image</label>
                    <input type="file" />
                </div>

                <div className="form-student-actions">
                    <button type="button" className="cancel-btn">Cancel</button>
                    <button type="submit" className="save-btn">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

AdminAddStudent.propTypes = {
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

export default AdminAddStudent;
