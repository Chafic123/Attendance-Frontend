import "../../CSS/Profile.css";
import "../../CSS/SIPanel.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUserDetails } from "../../ApiService/ProfileService";
import { UpdateInstructorProfile } from "../../ApiService/UpdateInstructorProfile";
export default function InstructorProfile({ refreshProfile }) {
    const [instructor, setInstructor] = useState(null);
    const [instructorImage, setInstructorImage] = useState("");  // For handling image uploads
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [imageFilename, setImageFilename] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); 
    const [noChangesMessage, setNoChangesMessage] = useState(""); 

    const fetchInstructorDetails = async () => {
        try {
          const data = await getUserDetails();
          if (data) {
            setInstructor(data);
            setInstructorImage(data.Instructor.image || "default.png");
            setFirstName(data.user.first_name || "");
            setLastName(data.user.last_name || "");
            setIdNumber(data.Instructor.user_id);
          }
        } catch (error) {
          console.error("Error fetching instructor details:", error);
        }
      };
      useEffect(() => {
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

        if (!firstName.trim() || !lastName.trim()) {
            console.error("First name and last name are required.");
            return;
        }

        const isChanged = firstName !== instructor.user.first_name || lastName !== instructor.user.last_name || imageFilename;

        if (!isChanged) {
            setNoChangesMessage("Nothing has been changed.");
            return;
        } else {
            setNoChangesMessage("");
        }

        try {
            const updatedData = await UpdateInstructorProfile(
                firstName,
                lastName,
                instructorImage instanceof File ? instructorImage : null,
            );
            setSuccessMessage("Profile updated successfully!");
            await fetchInstructorDetails();
            refreshProfile(); 
        } catch (error) {
            console.log("Error: ", error)
        };
    }

    if (!instructor) return <p>Loading...</p>;

    return (
        <div className="user-profile">
            <h2 className="profile-title">My Profile</h2>
            <div className="user-info">
                <p className="user-name">{`${instructor.user.first_name} ${instructor.user.last_name}`}</p>
                <p className="user-id">Instructor</p>{/*{instructor.user.email}*/}
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

            <form className="user-profile-form" onSubmit={handleSubmit}>
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
                    <label htmlFor="idNumber">ID Number:</label>
                    <input
                        type="text"
                        id="idNumber"
                        name="idNumber"
                        value={instructor.Instructor.user_id}
                        disabled
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
                        <label
                            htmlFor="fileInput"
                            className={`imageLabel upload-img-btn ${imageFilename ? 'uploaded-label' : 'not-uploaded-label'}`}
                        >
                            Image
                        </label>

                        <label htmlFor="fileInput" className="upload-img-btn">
                            <img src="/Images/Upload_img.png" alt="Upload" />
                        </label>
                        <span className="img-name">{imageFilename ? "Uploaded✔️" : "Upload New"}</span>
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
