import "../../CSS/InstructorSendNotification.css";
import { useState, useEffect } from "react";
import { sendInstructorNotification } from "../../ApiService/NotificationService";

export default function InstructorNotifications({ selectedStudent, selectedCourseID }) {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [shouldResetStudent, setShouldResetStudent] = useState(false);

    const displayStudent = shouldResetStudent ? null : selectedStudent;
    
    const clearStatusAfterDelay = () => {
        setTimeout(() => {
            setStatus("");
        }, 3000);
    };
    const handleSendNotification = async () => {
        if (!selectedStudent) {
            setStatus("❌ No student selected.");
            clearStatusAfterDelay();
            return;
        }

        if (!message.trim()) {
            setStatus("❌ Message is required.");
            clearStatusAfterDelay();
            return;
        }

        try {
            const response = await sendInstructorNotification(
                selectedStudent.student_id,
                selectedCourseID,
                message
            );

            if (response) {
                setStatus("✅ Notification sent successfully!");
                clearStatusAfterDelay();
                setMessage("");
            } else {
                setStatus("❌ Failed to send notification.");
                clearStatusAfterDelay();
            }
        } catch (error) {
            setStatus("❌ Error sending notification.");
            clearStatusAfterDelay();
            console.log(error);
        }
    };


    return (
        <div id="notification-container">
            <h2 className="title">Send Notification:</h2>
            <span>
                To: {displayStudent ? `${displayStudent.first_name} ${displayStudent.last_name}` : "No student selected"}
            </span>
            <input
                type="text"
                value={message}
                className="sendNotification-input"
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message"
            />
            <div className="purple-line"></div>
            <button className="sendNotification-btn" onClick={handleSendNotification}>
                Send
            </button>
            {status && <p className="status-message">{status}</p>}
        </div>
    );
}