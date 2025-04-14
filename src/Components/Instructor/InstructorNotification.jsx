import "../../CSS/InstructorSendNotification.css";
import { useState, useEffect } from "react";
import { sendInstructorNotification } from "../../ApiService/NotificationService";

export default function InstructorNotifications({ selectedStudent, selectedCourseID }) {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [shouldResetStudent, setShouldResetStudent] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");
    const [noChangesMessage, setNoChangesMessage] = useState("");

    const [isSending, setIsSending] = useState(false);

    const displayStudent = shouldResetStudent ? null : selectedStudent;


    const handleSendNotification = async () => {
        if (!selectedStudent) {
            setNoChangesMessage("No student selected.");
            return;
        }

        if (!message.trim()) {
            setNoChangesMessage("Message is required.");
            return;
        }

        try {
            setIsSending(true);

            const response = await sendInstructorNotification(
                selectedStudent.student_id,
                selectedCourseID,
                message
            );

            if (response) {
                setSuccessMessage("Notification sent successfully!");
                setMessage("");
            } else if (noChangesMessage !== "") {
                setNoChangesMessage("Failed to send notification.");
            }
        } catch (error) {
            setNoChangesMessage("Error sending notification.");
            console.log(error);
        } finally {
            setIsSending(false);
        }
    };


    return (
        <div id="notification-container">
            {successMessage && (
                <div className="popup-container">
                    <div className="popup-message">
                        <p>{successMessage}</p>
                        <button onClick={() => setSuccessMessage("")} className="popup-close-btn">Close</button>
                    </div>
                </div>
            )}

            {noChangesMessage && (
                <div className="popup-container">
                    <div className="popup-message" style={{ backgroundColor: 'white', color: 'red' }}>
                        <p>{noChangesMessage}</p>
                        <button onClick={() => setNoChangesMessage("")} className="popup-close-btn">Close</button>
                    </div>
                </div>
            )}
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
            <button className="sendNotification-btn" onClick={handleSendNotification} disabled={isSending}>
                {isSending ? "Sending..." : "Send"}
            </button>
            {status && <p className="status-message">{status}</p>}
        </div>
    );
}