import { useEffect, useState } from "react";
import "../../CSS/StudentRequestCorrection.css";
import { submitCorrectionRequest } from "../../ApiService/StudentRequestCorrection";

export default function StudentRequestCorrection({ requestCorrectionState, selectedAttendance }) {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); 
    const [noChangesMessage, setNoChangesMessage] = useState("");

    const handleSubmit = async () => {
        if (!selectedAttendance?.id || !message.trim()) {
            setNoChangesMessage("Please enter a message and select a valid date.");
            return;
        }
    
        setLoading(true);
        try {
            const response = await submitCorrectionRequest(selectedAttendance.id, message);
            setSuccessMessage(response.message);
            setMessage(""); // Clear after success
        } catch (error) {
            const errorMsg =
            error?.response?.data?.error || "Failed to submit request. Please try again.";
        setNoChangesMessage(errorMsg);
            }
        setLoading(false);
    };
    

    return (
        <div className="request-correction-container">
            <h2 className="request-correction-title">Request Correction</h2>

            {successMessage && (
                <div className="popup-container">
                    <div className="popup-message" style={{ backgroundColor: 'white', color: "#543381"}}>
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

            {requestCorrectionState ? (
                <>
                    <input
                        type="text"
                        value={message}
                        className="requestCorrection-input"
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write a message"
                    />
                    <button className="requestCorrection-btn" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Sending..." : "Request Correction"}
                    </button>
                    {responseMsg && <p className="response-msg">{responseMsg}</p>}
                </>
            ) : (
                <p className="request-correction-placeholder">📅 Please select a date</p>
            )}
        </div>
    );
}
