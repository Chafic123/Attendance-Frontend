
import "../../CSS/ProfileTop.css"
export default function ProfileTop({onAdd}){
    return(
        <div className="profileTop-container">
             <div className="student-info">
                <p className="student-name">Majd Abou Ghoush</p>
                <p className="student-id">20220222</p>
             </div>
             <img onClick={onAdd} src="../public/Images/Profile.png" className="profile-icon" alt="" />
        </div>
    )
}