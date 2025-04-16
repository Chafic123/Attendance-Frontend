import { getInstructorRequests } from "../../ApiService/InstructorRequestCorrections";
import { useEffect, useState } from "react";
import "../../CSS/InstrcutorRequestsCenter.css";
import { updateRequestStatus } from "../../ApiService/InstructorRequestCorrections";
import LoadingSpinner from "../Generals/LoadingSpinner";
export default function InstructorNotificationCenter({ setIsRequestStatusChanged }) {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const data = await getInstructorRequests();
                const pendingRequests = (data.requests || []).filter(
                    (request) => request.status === "pending"
                );
                setRequests(pendingRequests);
            } catch (error) {
                console.error("Error fetching instructor requests:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);



    const handleRequestStatus = async (requestId, status) => {
        try {
            const result = await updateRequestStatus(requestId, status);
            setIsRequestStatusChanged(true)
            if (result) {
                setRequests((prevRequests) =>
                    prevRequests.filter((request) => request.id !== requestId)
                );
            }
        } catch (error) {
            console.error(`Error updating request status to ${status}:`, error);
        }
    };


    return (
        <div className="requests-center-container"  style={loading ? { 
            position: 'relative', 
            minHeight: '500px'    
          } : {}}>

            {loading ? (
                <LoadingSpinner/>
            ) : !requests.length ? (
                <div style={{ textAlign: "center", marginTop: "100px" }}>
                    <img
                          src="../public/Images/NoNotification-icon.png"
                          alt="No Requests"
                        style={{ width: "100px", height: "100px", opacity: 0.6, marginTop:"70px" }}
                    />
                    <p style={{ marginTop: "0px", fontSize: "24px", color: "#777" }}>
                        No Requests Available
                    </p>
                </div>
                ) : (
                <>
                    {requests.map((request, index) => (
                        <div key={index}>
                            <div className="gray-line"></div>
                            <div className="requests">
                                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                    <div className="request-center-title-container">
                                        <img
                                            className="purple-circle"
                                            src="../public/Images/Purple-circle.png"
                                            alt="request Icon"
                                        />
                                        <p className="request-title">Attendance Correction Request</p>
                                    </div>

                                    <div className="temp">
                                        <div className="request-center-content-container">
                                            <p className="request-center-content">
                                                {request.reason || "No specific reason provided."}
                                            </p>
                                            <p className="request-center-course-name">
                                                {request.course_name}
                                            </p>
                                            <p className="request-center-student-name">
                                                {request.student_name}
                                            </p>

                                        </div>
                                        <div
                                            className="requests-btn-container">
                                            <button onClick={() => handleRequestStatus(request.id, "approved")} className="approveRequest">
                                                Approve
                                            </button>
                                            <button onClick={() => handleRequestStatus(request.id, "rejected")} className="rejectRequest">
                                                Reject
                                            </button>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                    <div className="gray-line"></div>
                </>
            )}
        </div>
    );
}