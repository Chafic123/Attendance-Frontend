import "../../CSS/AdminAddInstructor.css";
import PropTypes from 'prop-types';
import { useState } from "react";

const AdminAddInstructor = () => {

        const [instructorImage, setInstructorImage] = useState("Upload New")
    

    const handleInstructorImage = (event) => {
        if (event.target.files.length > 0) {
            setInstructorImage(event.target.files[0].name);
        } else {
            setInstructorImage("Upload New");
        }
    };
    return (

        <div className="add-instructor-card">
            <h2 className="card-instructor-title">Add instructor</h2>

            <form className="add-instructor-form" >
                <div className="form-instructor-group">
                    <label htmlFor="First-Name">First Name:</label>
                    <input
                        type="text"
                        id="First-Name"
                        name="First-Name"
                    />
                </div>

                <div className="form-instructor-group">
                    <label htmlFor="Last-Name">Last Name:</label>
                    <input
                        type="text"
                        id="Last-Name"
                        name="Last-Name"
                    />
                </div>

                <div className="form-instructor-group">
                    <label htmlFor="ID-Number">ID Number:</label>
                    <input
                        type="text"
                        id="ID-Number"
                        name="ID-Number"

                    />
                </div>

                <div className="form-instructor-group">
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
                        onChange={handleInstructorImage}
                    />

                    <label htmlFor="fileInput" className="imageLabel">
                        Image
                    </label>

                    <label htmlFor="fileInput" className="upload-img-btn">
                        <img src="../Images/Upload_img.png" alt="Upload" />
                    </label>

                    <span className="img-name">{instructorImage}</span>
                </div>

                <div className="form-instructor-actions">
                    <button type="button" className="cancel-btn">Cancel</button>
                    <button type="submit" className="save-btn">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

AdminAddInstructor.propTypes = {
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

export default AdminAddInstructor;
