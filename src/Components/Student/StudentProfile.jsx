import "../../CSS/Profile.css";
import "../../CSS/SIPanel.css";

import { useEffect,useState } from "react";
export default function StudentProfile(){
    const [studentImage, setStudentImage] = useState("Upload New")
        
    const handleStudentImage = (event) => {
        if (event.target.files.length > 0) {
            setStudentImage(event.target.files[0].name);
        } else {
            setStudentImage("Upload New");
        }
        };
    useEffect(() => {
      
        const changeButtonText = () => {
            const button = document.querySelector('.save-btn');
            if (button) {
                if (window.matchMedia("(width: 1024px) and (height: 1366px) and (-webkit-device-pixel-ratio: 2)").matches) {
                    button.textContent = "Save";  // Set to "Save" on match
                } else {
                    button.textContent = "Save Changes";  // Reset to "Save Changes" if the condition no longer matches
                }
            }
        };
    
        // Call the function on component mount
        changeButtonText();
    
        // Optional: Add event listener to handle changes in screen size dynamically
        window.addEventListener('resize', changeButtonText);
    
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', changeButtonText);
        };
    }, []);
    
    return (
        <div className="student-profile">
        <h2 className="profile-title">My Profile</h2>
        <div className="student-info">
             <p className="student-name" id="student-name">Majd Abou Ghoush</p>
            <p className="student-id" id="student-id">20220222</p>
        </div>
       
        <form className="student-profile-form" >
            <div className="form-student-group">
                <label htmlFor="First-Name">First Name:</label>
                <input
                    type="text"
                    id="First-Name"
                    name="First-Name"
                />
            </div>

            <div className="form-student-group">
                <label htmlFor="Last-Name">Last Name:</label>
                <input
                    type="text"
                    id="Last-Name"
                    name="Last-Name"
                />
            </div>

            <div className="form-student-group">
                <label htmlFor="ID-Number">ID Number:</label>
                <input
                    type="text"
                    id="ID-Number"
                    name="ID-Number"

                />
            </div>

            <div className="form-student-group">
                <label htmlFor="Email">Email:</label>
                <input
                    type="text"
                    id="Email"
                    name="Email"
                />
            </div>

            <div className="form-student-group">
                <label htmlFor="Password">Password:</label>
                <input
                    type="text"
                    id="Password"
                    name="Password"
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
                        <img src="../Images/Upload_img.png" alt="Upload" />
                    </label>

                    <span className="img-name">{studentImage}</span>
                </div>
            </div>

            <div className="form-student-actions">
                <button type="button" className="cancel-btn">Cancel</button>
                <button type="submit" className="save-btn">Save Changes</button>
            </div>
        </form>
    </div>
    )
}