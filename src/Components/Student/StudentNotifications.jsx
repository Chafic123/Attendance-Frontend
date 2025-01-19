
import "../../CSS/StudentNotifications.css"
export default function StudentNotifications(props){
    return(
        <div id="container">
            <h2 className="title">Notification</h2>
            <div className="gray-line"></div>
            <div className="notifications">

                <div className="notification-title-container">
                    <img className="purple-circle" src="../public/Images/Purple-circle.png" alt="" />
                    <p className="notification-title">Absence Warning</p>
                </div>

                <div className="temp">
                    <div className="notification-content-container">
                        <p className="notification-content">You missed your Introduction to</p>
                        <p className="course-name">Management Course</p>
                    </div>  
                <button className="mark-as-read">Mark As Read</button>

                </div>
    
            </div>
            <div className="gray-line"></div>

        </div>
    )   
}