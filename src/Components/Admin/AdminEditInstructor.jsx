import { useEffect, useState } from "react";
import "../../CSS/AdminEditStudent.css";
import { editInstructor } from "../../ApiService/AdminInstrucotrService";

export default function AdminEditInstructor({ editedInstructor, onCancel, onInstructorUpdated }) {
    const [successMessage, setSuccessMessage] = useState("");
    const [noSuccessMessage, setNoSuccessMessage] = useState("");

    const [instructorData, setInstructorData] = useState({
        id: null,
        first_name: "",
        last_name: "",
        email: "",
        phone: "+123-456-7890", 
        department: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (editedInstructor) {
            setInstructorData({
                id: editedInstructor.instructor.id,
                first_name: editedInstructor.first_name || "",
                last_name: editedInstructor.last_name || "",
                email: editedInstructor.email || "",
                department: editedInstructor.instructor.department?.name || "", 
        }
    )}
    }, [editedInstructor]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInstructorData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const updatedInstructor = await editInstructor(
                instructorData.id,
                {
                    first_name: instructorData.first_name,
                    last_name: instructorData.last_name,
                    email: instructorData.email,
                    department: instructorData.department
                }
            );

            setSuccessMessage("Instructor Updated Successfully!");

            if (onInstructorUpdated) {
                onInstructorUpdated(updatedInstructor);
            }

            setTimeout(() => {
                if (onCancel) {
                    onCancel();
                }
            }, 2000);

        } catch (err) {
            setNoSuccessMessage("An Error Has Occurred!");
            setError(err.response?.data?.message || "Failed to update instructor. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-instructor-card">
            <h2 className="card-instructor-title">Edit Instructor</h2>

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

            <form className="add-instructor-form" onSubmit={handleSubmit}>
                <div className="form-instructor-group">
                    <label htmlFor="first_name">First Name:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={instructorData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-instructor-group">
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={instructorData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-instructor-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={instructorData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

             

                <div className="form-instructor-group">
                    <label htmlFor="department">Department:</label>
                    <input
                        type="text"
                        name="department"
                        value={instructorData.department}
                        onChange={handleChange}
                        disabled
                    />
                </div>

                <div className="form-instructor-actions">
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="save-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}
