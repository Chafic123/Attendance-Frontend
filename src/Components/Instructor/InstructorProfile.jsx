import "../../CSS/Profile.css";
import "../../CSS/SIPanel.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUserDetails } from "../../ApiService/ProfileService";

export default function InstructorProfile({ refreshProfile }) {
    const [instructor, setInstructor] = useState(null);
    const [instructorImage, setInstructorImage] = useState("");  // For handling image uploads
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageFilename, setImageFilename] = useState(""); // For image filename
    const [successMessage, setSuccessMessage] = useState(""); // Success message visibility
    const [noChangesMessage, setNoChangesMessage] = useState(""); // No changes message visibility

    useEffect(() => {
        const fetchInstructorDetails = async () => {
            try {
                const data = await getUserDetails();
                if (data) {
                    setInstructor(data);
                    setInstructorImage(data.Instructor.image || "default.png"); // Set the image
                    setFirstName(data.user.first_name || "");
                    setLastName(data.user.last_name || "");
                }
            } catch (error) {
                console.error("Error fetching instructor details:", error);
            }
        };

        fetchInstructorDetails();
    }, []);

    const handleInstructorImage = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setInstructorImage(file);
            setImageFilename(file.name);
        } else {
            console.error("Invalid image file selected");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate first name and last name
        if (!firstName.trim() || !lastName.trim()) {
            console.error("First name and last name are required.");
            return;
        }

        // Check if anything was changed
        const isChanged = firstName !== instructor.user.first_name || lastName !== instructor.user.last_name || imageFilename;

        if (!isChanged) {
            setNoChangesMessage("Nothing has been changed.");
            return; // Prevent submission if nothing has changed
        } else {
            setNoChangesMessage(""); // Clear the "nothing changed" message if there are changes
        }

        try {
            // Update instructor profile logic here
            setSuccessMessage("Profile updated successfully!"); // Show success message
            console.log("Profile Updated Successfully");
            refreshProfile(); // Call the function to refresh ProfileTop data
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    if (!instructor) return <p>Loading...</p>;

    return (
        <div className="user-profile">
            <h2 className="profile-title">My Profile</h2>
            <div className="instructor-info">
                <p className="instructor-name">{`${instructor.user.first_name} ${instructor.user.last_name}`}</p>
                <p className="instructor-id">{instructor.Instructor.user_id}</p>
            </div>

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

            <form className="instructor-profile-form" onSubmit={handleSubmit}>
                <div className="form-user-group">
                    <label htmlFor="First-Name">First Name:</label>
                    <input
                        type="text"
                        id="First-Name"
                        name="First-Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)} 
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
                    />
                </div>

                <div className="form-user-group">
                    <label htmlFor="Email">Email:</label>
                    <input
                        type="text"
                        id="Email"
                        name="Email"
                        value={instructor.user.email}
                        disabled
                    />
                </div>

                <div className="form-user-row">
                    <div className="form-user-group">
                        <input
                            type="file"
                            id="fileInput"
                            className="img-input"
                            onChange={handleInstructorImage}
                        />
                        <label htmlFor="fileInput" className="imageLabel">Image</label>
                        <label htmlFor="fileInput" className="upload-img-btn">
                            <img src="/Images/Upload_img.png" alt="Upload" />
                        </label>
                        <span className="img-name">{imageFilename ? "Uploaded Successfully" : "Upload New"}</span>
                    </div>
                </div>

                <div className="form-user-actions">
                    <button type="button" className="cancel-btn">Cancel</button>
                    <button type="submit" className="save-btn">Save Changes</button>
                </div>
            </form>
        </div>
    );
}
