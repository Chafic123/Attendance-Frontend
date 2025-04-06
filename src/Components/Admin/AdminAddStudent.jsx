import { useState } from 'react';
import { addStudent } from '../../ApiService/AdminStudentService';
import { getStudents } from '../../ApiService/StudentService';

const AdminAddStudent = ({ setStudents }) => {
    const [successMessage, setSuccessMessage] = useState("");
    const [noSuccessMessage, setNoSuccessMessage] = useState("");

    const [studentData, setStudentData] = useState({
        first_name: '',
        last_name: '',
        address: '',
        personal_email: '',
        major: '',
        department_id: '',  // Added department_id to store the selected department
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData({ ...studentData, [name]: value });
    };

    const handleClear = () => {
        setStudentData({
            first_name: '',
            last_name: '',
            address: '',
            personal_email: '',
            major: '',
            department_id: '',  // Resetting department_id as well
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addStudent(studentData);
            setSuccessMessage("Student Added Successfully!");
            getStudents()
                .then((data) => {
                    setStudents(data);
                })
                .catch((err) => {
                    console.error("Failed to fetch students:", err);
                });
            setStudentData({
                first_name: '',
                last_name: '',
                address: '',
                personal_email: '',
                major: '',
                department_id: '',  // Resetting department_id after submission
            });
        } catch (error) {
            console.error(error.message);
            setNoSuccessMessage(error.message);
        }
    };

    return (
        <div className="add-student-card">
            <h2 className="card-student-title">Add Student</h2>
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
                    <input type="text" id="first_name" name="first_name" value={studentData.first_name} onChange={handleChange} required />
                </div>

                <div className="form-student-group">
                    <label htmlFor="last_name">Last Name:</label>
                    <input type="text" id="last_name" name="last_name" value={studentData.last_name} onChange={handleChange} required />
                </div>

                <div className="form-student-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" value={studentData.address} onChange={handleChange} required />
                </div>

                <div className="form-student-group">
                    <label htmlFor="personal_email">Email:</label>
                    <input type="email" id="personal_email" name="personal_email" value={studentData.personal_email} onChange={handleChange} required />
                </div>

                <div className="form-student-group">
                    <label htmlFor="major">Major:</label>
                    <input type="text" id="major" name="major" value={studentData.major} onChange={handleChange} required />
                </div>

                {/* Department drop-down */}
                <div className="form-student-group">
                    <label htmlFor="department_id">Department:</label>
                    <select
                        id="department_id"
                        name="department_id"
                        value={studentData.department_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a Department</option>
                        <option value="1">Science</option>
                        <option value="2">Engineering</option>
                        <option value="3">Business</option>
                    </select>
                </div>

                <div className="form-student-actions">
                    <button type="button" className="cancel-btn" onClick={handleClear}>Clear</button>
                    <button type="submit" className="save-btn">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default AdminAddStudent;
