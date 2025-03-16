import "../../CSS/Profile.css";
import "../../CSS/SIPanel.css";
import { useEffect, useState } from "react";
import { getStudentDetails } from "../../ApiService/ProfileService";

export default function StudentProfile() {
    const [student, setStudent] = useState(null);
    const [studentImage, setStudentImage] = useState("");

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const data = await getStudentDetails();
                if (data) {
                    setStudent(data);
                    setStudentImage(`http://localhost:8001/${data.student.image}`);
                }
            } catch (error) {
                console.error("Error fetching student details:", error);
            }
        };

        fetchStudentDetails();
    }, []);

    const handleStudentImage = (event) => {
        if (event.target.files.length > 0) {
            setStudentImage(URL.createObjectURL(event.target.files[0]));
        } else {
            setStudentImage(`http://localhost:8001/${student.student.image}`);
        }
    };

    useEffect(() => {
        const changeButtonText = () => {
            const button = document.querySelector('.save-btn');
            if (button) {
                if (window.matchMedia("(width: 1024px) and (height: 1366px) and (-webkit-device-pixel-ratio: 2)").matches) {
                    button.textContent = "Save"; // iPad Pro resolution
                } else if (window.matchMedia("(max-width: 431px) and (height: 932px)").matches) {
                    button.textContent = "Save"; // iPhone 14 Pro Max resolution
                } else {
                    button.textContent = "Save Changes"; // Default for all other devices
                }
            }
        };

        changeButtonText();
        window.addEventListener('resize', changeButtonText);

        return () => {
            window.removeEventListener('resize', changeButtonText);
        };
    }, []);

    if (!student) return <p>Loading...</p>;

    return (
        <div className="student-profile">
            <h2 className="profile-title">My Profile</h2>
            <div className="student-info">
                <p className="student-name" id="student-name">{student.user.first_name} {student.user.last_name}</p>
                <p className="student-id" id="student-id">{student.student.student_id}</p>
            </div>

            <form className="student-profile-form">
                <div className="form-student-group">
                    <label htmlFor="First-Name">First Name:</label>
                    <input
                        type="text"
                        id="First-Name"
                        name="First-Name"
                        value={student.user.first_name}
                        onChange={() => {}}
                    />
                </div>

                <div className="form-student-group">
                    <label htmlFor="Last-Name">Last Name:</label>
                    <input
                        type="text"
                        id="Last-Name"
                        name="Last-Name"
                        value={student.user.last_name}
                        onChange={() => {}}
                    />
                </div>

                <div className="form-student-group">
                    <label htmlFor="Major">Major:</label>
                    <input
                        type="text"
                        id="Major"
                        name="Major"
                        value={student.student.major}
                        disabled
                    />
                </div>

                <div className="form-student-group">
                    <label htmlFor="Email">Email:</label>
                    <input
                        type="text"
                        id="Email"
                        name="Email"
                        value={student.user.email}
                        disabled
                    />
                </div>

                <div className="form-student-row">
                    <div className="form-student-group">
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
                        <img src="/Images/Upload_img.png" alt="Upload" />
                        </label>

                        <span className="img-name">Upload New</span>
                    </div>
                </div>

                <div className="form-student-actions">
                    <button type="button" className="cancel-btn">Cancel</button>
                    <button type="submit" className="save-btn">Save Changes</button>
                </div>
            </form>
        </div>
    );
}
