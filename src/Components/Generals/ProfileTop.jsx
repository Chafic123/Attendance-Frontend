
import "../../CSS/ProfileTop.css"
export default function ProfileTop({viewProfile}){
    return(
        <div className="profileTop-container">
             <div className="student-info">
                <p className="student-name">Majd Abou Ghoush</p>
                <p className="student-id">20220222</p>
             </div>
             <img onClick={viewProfile} src="../public/Images/Profile.png" className="profile-icon" alt="" />
        </div>
    )
}