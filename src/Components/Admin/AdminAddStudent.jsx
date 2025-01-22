import "../../CSS/AdminAddStudent.css";
import PropTypes from 'prop-types';
import { useState } from "react";
const AdminAddStudent = () => {

    const [studentImage, setStudentImage] = useState("Upload New")

    const handleStudentImage = (event) => {
        if (event.target.files.length > 0) {
            setStudentImage(event.target.files[0].name);
        } else {
            setStudentImage("Upload New");
        }
    };

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

                <div className="imgParent">
                    <input
                        type="file"
                        id="fileInput"
                        className="img-input"
                        onChange={handleStudentImage}
                    />

                    <label htmlFor="fileInput" className="imageLabel">
                        Image
                    </label>

                    <label htmlFor="fileInput" className="upload-img-btn">
                        <img src="../Images/Upload_img.png" alt="Upload" />
                    </label>

                    <span className="img-name">{studentImage}</span>
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
