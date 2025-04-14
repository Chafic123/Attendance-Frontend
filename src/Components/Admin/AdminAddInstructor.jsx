import "../../CSS/AdminAddInstructor.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { addInstructor } from "../../ApiService/AdminInstrucotrService";
import { getInstructors } from "../../ApiService/InstructorService";

const AdminAddInstructor = ({ onInstructorAdded, setInstructors }) => {
    const [successMessage, setSuccessMessage] = useState("");
    const [noSuccessMessage, setNoSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const [instructorData, setInstructorData] = useState({
        first_name: "",
        last_name: "",
        personal_email: "",
        phone_number: "1234567890",
        department_id: "", // Updated to store department_id instead of department name
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInstructorData({ ...instructorData, [name]: value });
    };

    const handleClear = () => {
        setInstructorData({
            first_name: "",
            last_name: "",
            personal_email: "",
            phone_number: "1234567890",
            department_id: "", // Clear department_id as well
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const addedInstructor = await addInstructor(instructorData);
            setSuccessMessage("Instructor added successfully!");
            getInstructors()
                .then(setInstructors)
                .catch((err) => console.error("Failed to fetch instructors:", err));

            setInstructorData({
                first_name: "",
                last_name: "",
                personal_email: "",
                phone_number: "",
                department_id: "", // Reset department_id after submission
            });

            if (onInstructorAdded) {
                onInstructorAdded(addedInstructor);
            }
        } catch (err) {
            setNoSuccessMessage("Failed to add instructor");
            console.log(err.message);
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

                {/* Department drop-down */}
                <div className="form-instructor-group">
                    <label htmlFor="department_id">Department:</label>
                    <select
                        id="department_id"
                        name="department_id"
                        value={instructorData.department_id}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select a Department</option>
                        <option value="1">Science</option>
                        <option value="2">Engineering</option>
                        <option value="3">Business</option>
                    </select>
                </div>

                <div className="form-instructor-actions">
                    <button type="button" className="cancel-btn" onClick={handleClear}>Clear</button>
                    <button type="submit" className="save-btn" disabled={isSubmitting}>
                        {isSubmitting ? "Adding Instructor..." : "Add Instructor"}
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
