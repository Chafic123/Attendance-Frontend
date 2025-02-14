
import "../../CSS/SINotifications.css"
export default function InstructorNotifications(){
    return(
        <div id="notification-container">
            <h2 className="title">Notification</h2>
            <div className="gray-line"></div>
            <div className="notifications">
                <div style={{
                    display:"flex",
                    flexDirection:"column",
                    gap:"5px"
                }}>
                <div className="notification-title-container">
                    <img className="purple-circle" src="../public/Images/Purple-circle.png" alt="" />
                    <p className="notification-title">Absence Warning</p>
                </div>

                <div className="temp">
                    <div className="notification-content-container">
                        <p className="notification-content">You missed your Introduction to</p>
                        <p className="course-name">Management Course</p>
                    </div>  

                </div>
                </div>
                <button className="mark-as-read">Mark As Read</button>
    
            </div>
            <div className="gray-line"></div>

        </div>
    )   
}