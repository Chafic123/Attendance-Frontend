import "../../CSS/StudentProfile.css";

export default function StudentProfile(){
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
                    <label htmlFor="Image" id="image">Image</label>
                    <img src="Images/Upload_img.png" alt="" />
                    <span htmlFor="" >Upload New</span>
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