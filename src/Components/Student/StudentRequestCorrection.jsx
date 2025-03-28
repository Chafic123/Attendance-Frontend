import { useState } from "react";
import "../../CSS/StudentRequestCorrection.css";

export default function StudentRequestCorrection({ requestCorrectionState }) {
    const [message, setMessage] = useState("");

    return (
        <div className="request-correction-container">
            <h2 className="request-correction-title">Request Correction</h2>

            {requestCorrectionState ? (
                <>
                    <input
                        type="text"
                        value={message}
                        className="requestCorrection-input"
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write a message"
                    />
                    <button className="requestCorrection-btn">Request Correction</button>
                </>
            ) : (
                <p className="request-correction-placeholder">📅 Please select a date </p>
            )}
        </div>
    );
}
