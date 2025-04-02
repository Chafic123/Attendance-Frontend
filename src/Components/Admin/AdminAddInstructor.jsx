import "../../CSS/AdminAddInstructor.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { addInstructor } from "../../ApiService/AdminInstrucotrService";

const AdminAddInstructor = ({ onInstructorAdded }) => {
    const [successMessage, setSuccessMessage] = useState("");
    const [noSuccessMessage, setNoSuccessMessage] = useState("");

    const [instructorData, setInstructorData] = useState({
        first_name: "",
        last_name: "",
        personal_email: "",
        phone_number: "1234567890", 
        department: "",
    });

    const [instructorImage, setInstructorImage] = useState("Upload New");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInstructorData({ ...instructorData, [name]: value });
    };

    const handleInstructorImage = (event) => {
        if (event.target.files.length > 0) {
            setInstructorImage(event.target.files[0].name);
        } else {
            setInstructorImage("Upload New");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const addedInstructor = await addInstructor(instructorData);
            setSuccessMessage("Instructor added successfully!")
            if (onInstructorAdded) {
                onInstructorAdded(addedInstructor);
            }
        } catch (err) {
            setNoSuccessMessage("Failed to add instructor")
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-instructor-card">
            <h2 className="card-instructor-title">Add Instructor</h2>
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
            {error && <p className="error-message">{error}</p>}

            <form className="add-instructor-form" onSubmit={handleSubmit}>
                <div className="form-instructor-group">
                    <label htmlFor="first_name">First Name:</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={instructorData.first_name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-instructor-group">
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={instructorData.last_name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-instructor-group">
                    <label htmlFor="personal_email">Email:</label>
                    <input
                        type="email"
                        id="personal_email"
                        name="personal_email"
                        value={instructorData.personal_email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-instructor-group">
                    <label htmlFor="department">Department:</label>
                    <input
                        type="text"
                        id="department"
                        name="department"
                        value={instructorData.department}
                        onChange={handleInputChange}
                        required
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
                    <button type="submit" className="save-btn" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

AdminAddInstructor.propTypes = {
    onInstructorAdded: PropTypes.func, 
};

export default AdminAddInstructor;
