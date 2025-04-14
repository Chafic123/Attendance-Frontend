import "../../CSS/ProfileTop.css";
import PropTypes from "prop-types";

export default function ProfileTop({ selectedAddItem, viewProfile, user }) {
    if (!user) return <p className="profileTopLoading">Loading...</p>;

    const { user: userInfo, Instructor: instructorInfo } = user;
    const isScheduleView = selectedAddItem === "View Schedule";

    return (
        <div className={`profileTop-container ${isScheduleView ? "profileTop-Schedule" : ""}`} onClick={viewProfile}>
            <div className="user-info">
                <p className="user-name">{`${userInfo.first_name} ${userInfo.last_name}`}</p>
                <p className="user-id">
                {user.student ? user.student.student_id : instructorInfo ? "Instructor" : "N/A"}      
                
                          </p>
            </div>

            <img
                src={user?.student?.image || user?.Instructor?.image || "../../Images/Profile Icon BG.png"}
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
        }),
        Instructor: PropTypes.shape({
            image: PropTypes.string,
        }),
        student: PropTypes.shape({
            student_id: PropTypes.string,
            image: PropTypes.string,
        }),
    }), 
};
