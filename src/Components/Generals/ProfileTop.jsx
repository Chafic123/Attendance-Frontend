import "../../CSS/ProfileTop.css";
import PropTypes from "prop-types";

export default function ProfileTop({ viewProfile, user }) {
    console.log("Profile Top Testing:", user)

    if (!user) return <p>Loading...</p>; 

    const { user: userInfo, Instructor: instructorInfo } = user; // Destructure the nested objects

    return (
        <div className="profileTop-container">
            <div className="user-info">
                {/* Adjusting the display based on the user type */}
                <p className="user-name">{`${userInfo.first_name} ${userInfo.last_name}`}</p>
                <p className="user-id">
                    {/* Display student ID for students and user_id for instructors */}
                    {user.student ? user.student.student_id : instructorInfo ? instructorInfo.user_id : "N/A"}
                </p>
            </div>

            <img 
                onClick={viewProfile} 
                src={`data:image/jpeg;base64,${user.student ? user.student.image : instructorInfo ? instructorInfo.image : "default_image_base64_string"}`}
                className="profile-icon" 
                alt="User Profile" 
            />
        </div>
    );
};

ProfileTop.propTypes = {
    viewProfile: PropTypes.func.isRequired,
    user: PropTypes.shape({
        user: PropTypes.shape({
            first_name: PropTypes.string.isRequired,
            last_name: PropTypes.string.isRequired,
        }).isRequired,
        Instructor: PropTypes.shape({
            user_id: PropTypes.string,
            image: PropTypes.string,
        }),
        student: PropTypes.shape({
            student_id: PropTypes.string,
            image: PropTypes.string,
        }),
    }).isRequired,
};
