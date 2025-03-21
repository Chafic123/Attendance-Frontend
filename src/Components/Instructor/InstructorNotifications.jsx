import "../../CSS/InstructorSendNotification.css";
import { useState } from "react";

export default function InstructorNotifications() {
    const [notification, setNotification] = useState("");

    return (
        <div id="notification-container">
            <h2 className="title">Send Notification:</h2>
            <span>To: Ahmad Hijazi</span>
            <input 
                type="text" 
                value={notification} 
                className="sendNotification-input"
                onChange={(e) => setNotification(e.target.value)} 
                placeholder="Write a message" 
            />
            <div className="purple-line"></div>
            <button className="sendNotification-btn">Send</button>
        </div>
    );
}
