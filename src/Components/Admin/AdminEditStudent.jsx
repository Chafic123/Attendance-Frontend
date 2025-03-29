import { useEffect, useState } from "react";
import "../../CSS/AdminEditStudent.css";

export default function AdminEditStudent({ editedStudent, onCancel, setEditedStudent }) {
    const [studentData, setStudentData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        major: "",
        student_id: "",
        department: ""
    });

    useEffect(() => {
        if (editedStudent) {
            setStudentData({
                first_name: editedStudent.first_name || editedStudent.user?.first_name || "",
                last_name: editedStudent.last_name || editedStudent.user?.last_name || "",
                email: editedStudent.email || editedStudent.user?.email || "",
                major: editedStudent.major || "",
                student_id: editedStudent.student_id || "",
                department: editedStudent.department || "", 
            });
        }
    }, [editedStudent]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="add-student-card">
            <h2 className="card-student-title">Edit Student</h2>
            <form className="add-student-form">
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
                        required
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
                    />
                </div>

                <div className="form-student-actions">
                    <button type="button" className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="save-btn">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
