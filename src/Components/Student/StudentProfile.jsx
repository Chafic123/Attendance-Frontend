import "../../CSS/Profile.css";
import "../../CSS/SIPanel.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUserDetails } from "../../ApiService/ProfileService";
import { updateStudentProfile } from "../../ApiService/UpdateStudentProfile"; // Import the API call
import LoadingSpinner from "../Generals/LoadingSpinner";
export default function StudentProfile({ viewPanel, refreshProfile }) {
    const [student, setStudent] = useState(null);
    const [studentImage, setStudentImage] = useState("");
    const [studentVideo, setStudentVideo] = useState(null); // State for video file
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageFilename, setImageFilename] = useState("");
    const [videoFilename, setVideoFilename] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [noChangesMessage, setNoChangesMessage] = useState("");
    const [imageUploaded, setImageUploaded] = useState(false);
    const [videoUploaded, setVideoUploaded] = useState(false);

    const [isSaving, setIsSaving] = useState(false);


    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const data = await getUserDetails();
                if (data) {
                    setStudent(data);
                    setStudentImage(`${data.student.image}`);
                    setFirstName(data.user.first_name || "");
                    setLastName(data.user.last_name || "");
                }
            } catch (error) {
                console.error("Error fetching student details:", error);
            }
        };

        fetchStudentDetails();
    }, []);

    const handleStudentImage = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setStudentImage(file);
            setImageFilename(file.name);
            setImageUploaded(true);

        } else {
            console.error("Invalid image file selected");
        }
    };

    const handleStudentVideo = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('video/')) {
            setStudentVideo(file);
            setVideoFilename(file.name);
            setVideoUploaded(true);

        } else {
            console.error("Invalid video file selected");
        }
    };


    const handleCancel = () => {
        setFirstName(student.user.first_name);
        setLastName(student.user.last_name);
        setStudentImage("");
        setStudentVideo(null);
        setImageFilename("");
        setVideoFilename("");
        setImageUploaded(false);
        setVideoUploaded(false);
        setNoChangesMessage("");
        setSuccessMessage("");
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!firstName.trim() || !lastName.trim()) {
            console.error("First name and last name are required.");
            return;
        }

        const isChanged = firstName !== student.user.first_name || lastName !== student.user.last_name || imageFilename || videoFilename;

        if (!isChanged) {
            setNoChangesMessage("Nothing has been changed.");
            return; 
        } else {
            setNoChangesMessage(""); 
        }

        try {
            setIsSaving(true);

            const updatedData = await updateStudentProfile(
                firstName,
                lastName,
                studentImage instanceof File ? studentImage : null,
                studentVideo instanceof File ? studentVideo : null
            );
            setSuccessMessage("Profile updated successfully!"); // Show success message
            refreshProfile();

            setStudentImage("");
            setStudentVideo(null);
            setImageFilename("");
            setVideoFilename("");
            setImageUploaded(false);
            setVideoUploaded(false);

        } catch (error) {
            console.error("Failed to update profile:", error);
        } finally {
            setIsSaving(false);
        }
    };
    const handleCancelAll = () => {
        handleCancel();
        viewPanel();
    };

    useEffect(() => {
        const changeButtonText = () => {
            const button = document.querySelector('.save-btn');
            if (button) {
                if (window.matchMedia("(width: 1024px) and (height: 1366px) and (-webkit-device-pixel-ratio: 2)").matches) {
                    button.textContent = "Save";
                } else if (window.matchMedia("(max-width: 431px) and (height: 932px)").matches) {
                    button.textContent = "Save";
                } else {
                    button.textContent = "Save Changes";
                }
            }
        };

        changeButtonText();
        window.addEventListener('resize', changeButtonText);

        return () => {
            window.removeEventListener('resize', changeButtonText);
        };
    }, []);


    return (
        <div className="user-profile" style={!student ? {
            position: 'relative',
            minHeight: '500px'
        } : {}}>
            {!student ? (
                <LoadingSpinner />
            ) : (
                <>
            <h2 className="profile-title">My Profile</h2>

            {successMessage && (
                <div className="popup-container">
                    <div className="popup-message">
                        <p>{successMessage}</p>
                        <button onClick={() => setSuccessMessage("")} className="popup-close-btn">Close</button>
                    </div>
                </div>
            )}

            {noChangesMessage && (
                <div className="popup-container">
                    <div className="popup-message" style={{ backgroundColor: 'white', color: 'red' }}>
                        <p>{noChangesMessage}</p>
                        <button onClick={() => setNoChangesMessage("")} className="popup-close-btn">Close</button>
                    </div>
                </div>
            )}

            <form className="user-profile-form" onSubmit={handleSubmit}>
                <div className="form-user-group">
                    <label htmlFor="First-Name">First Name:</label>
                    <input
                        type="text"
                        id="First-Name"
                        name="First-Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled
                    />
                </div>

                <div className="form-user-group">
                    <label htmlFor="Last-Name">Last Name:</label>
                    <input
                        type="text"
                        id="Last-Name"
                        name="Last-Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled
                    />
                </div>

                <div className="form-user-group">
                    <label htmlFor="Major">Major:</label>
                    <input
                        type="text"
                        id="Major"
                        name="Major"
                        value={student.student.major}
                        disabled
                    />
                </div>
                <div className="form-user-group">
                    <label htmlFor="Email">Email:</label>
                    <input
                        type="text"
                        id="Email"
                        name="Email"
                        value={student.user.email}
                        disabled
                    />
                </div>
                <div className="uploadContainer">

                    <div className="">
                        <div className="form-user-group">
                            <input
                                type="file"
                                id="fileInput"
                                className="img-input"
                                onChange={handleStudentImage}
                            />
                            <label htmlFor="fileInput"
                                className={`imageLabel ${imageUploaded ? 'uploaded' : ''}`}
                            >Image</label>
                            <label htmlFor="fileInput" className="upload-img-btn">
                                <img src="/Images/Upload_img.png" alt="Upload" />
                            </label>
                            <label htmlFor="fileInput">
                                <span style={{ cursor: "pointer" }} className="img-name">{imageFilename ? "Uploaded" : "Upload"}</span> {/* Display filename or default text */}

                            </label>
                        </div>
                    </div>

                    <div className="">
                        <div className="form-user-group">
                            <input
                                type="file"
                                id="videoInput"
                                className="img-input"
                                onChange={handleStudentVideo}
                            />
                            <label htmlFor="videoInput"
                                className={`imageLabel ${videoUploaded ? 'uploaded' : ''}`}
                            >Video</label>
                            <label htmlFor="videoInput" className="upload-img-btn">
                                <img src="/Images/Upload_img.png" alt="Upload" />
                            </label>
                            <span style={{ cursor: "pointer" }} className="img-name">{videoFilename ? "Uploaded" : "Upload"}</span>
                        </div>
                    </div>
                </div>


                <div className="form-user-actions">
                    <button onClick={handleCancelAll} type="button" className="cancel-btn">Cancel</button>
                    <button type="submit" className="save-btn" disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
            </>
            )}
        </div>

    );
}

StudentProfile.propTypes = {
    refreshProfile: PropTypes.func.isRequired,
};
