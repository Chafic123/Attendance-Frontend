import { useState } from 'react';
import { addStudent } from '../../ApiService/AdminStudentService';
import { getStudents } from '../../ApiService/StudentService';
const AdminAddStudent = ({setStudents}) => {
    const [successMessage, setSuccessMessage] = useState("");
    const [noSuccessMessage, setNoSuccessMessage] = useState("");

    const [studentData, setStudentData] = useState({
        first_name: '',
        last_name: '',
        address: '',
        personal_email: '',
        major: '',
    });


    const handleChange = (e) => {
        setStudentData({ ...studentData, [e.target.name]: e.target.value });
    };

 


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addStudent(studentData);
            setSuccessMessage("Student Added Successfully!")
            getStudents()
            .then((data) => {
              setStudents(data);
              setFilteredStudents(data); 
            })
                setStudentData({
                first_name: '',
                last_name: '',
                address: '',
                personal_email: '',
                major: '',
            });
        } catch (error) {
            console.error(error.message);
            setNoSuccessMessage(error.message)
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
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="personal_email" name="personal_email" value={studentData.personal_email} onChange={handleChange} required />
                </div>

                <div className="form-student-group">
                    <label htmlFor="major">Major:</label>
                    <input type="text" id="major" name="major" value={studentData.major} onChange={handleChange} required />
                </div>

              

                <div className="form-student-actions">
                    <button type="button" className="cancel-btn">Cancel</button>
                    <button type="submit" className="save-btn">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default AdminAddStudent;
