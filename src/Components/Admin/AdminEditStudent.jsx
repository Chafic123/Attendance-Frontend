import { useEffect, useState } from "react";
import "../../CSS/AdminEditStudent.css";
import { editStudent } from "../../ApiService/AdminStudentService";

export default function AdminEditStudent({ editedStudent, onCancel, onStudentUpdated }) {
    const [successMessage, setSuccessMessage] = useState("");
    const [noSuccessMessage, setNoSuccessMessage] = useState("");

    const [studentData, setStudentData] = useState({
        id: null,
        first_name: "",
        last_name: "",
        email: "",
        major: "",
        student_id: "",
        department: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (editedStudent) {
            setStudentData({
                id: editedStudent.id,
                first_name: editedStudent.first_name || editedStudent.user?.first_name || "",
                last_name: editedStudent.last_name || editedStudent.user?.last_name || "",
                email: editedStudent.email || editedStudent.user?.email || "",
                major: editedStudent.major || "",
                student_id: editedStudent.student_id || editedStudent.Uni_id || "",
                department: editedStudent.department.name || editedStudent.department || "",
            });
        }
    }, [editedStudent]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const updatedStudent = await editStudent(
                studentData.id,
                {
                    student_id: studentData.student_id,
                    first_name: studentData.first_name,
                    last_name: studentData.last_name,
                    email: studentData.email,
                    major: studentData.major,
                    department: studentData.department
                }
            );

            setSuccessMessage("Student Updated Successfully!");

            if (onStudentUpdated) {
                onStudentUpdated(updatedStudent);
            }

            // Delay closing the form to allow the message to show
            setTimeout(() => {
                if (onCancel) {
                    onCancel();
                }
            }, 2000); // Show success message for 2 seconds

        } catch (err) {
            setNoSuccessMessage("An Error Has Occurred!");
            setError(err.response?.data?.message || "Failed to update student. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="add-student-card">
            <h2 className="card-student-title">Edit Student</h2>

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

            <form className="add-student-form" onSubmit={handleSubmit}>

                <div className="form-student-group">
                    <label htmlFor="first_name">First Name:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={studentData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-student-group">
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={studentData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-student-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={studentData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-student-group">
                    <label htmlFor="major">Major:</label>
                    <input
                        type="text"
                        name="major"
                        value={studentData.major}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-student-group">
                    <label htmlFor="department">Department:</label>
                    <input
                        type="text"
                        name="department"
                        value={studentData.department}
                        onChange={handleChange}
                        disabled
                    />
                </div>

                <div className="form-student-group">
                    <label htmlFor="student_id">Student ID:</label>
                    <input
                        type="text"
                        name="student_id"
                        value={studentData.student_id}
                        onChange={handleChange}
                        required
                        disabled
                    />
                </div>

                <div className="form-student-actions">
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