import { getInstructorRequests } from "../../ApiService/InstructorRequestCorrections";
import { useEffect, useState } from "react";
import "../../CSS/InstrcutorRequestsCenter.css";
import { approveRequest } from "../../ApiService/InstructorRequestCorrections";
export default function StudentNotificationCenter() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const data = await getInstructorRequests();
                setRequests(data.requests || []);
            } catch (error) {
                console.error("Error fetching instructor requests:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);


    const handleApproveRequest = async (requestId) => {
        try {
            const result = await approveRequest(requestId);
            if (result) {
                setRequests((prevRequests) =>
                    prevRequests.filter((request) => request.id !== requestId)
                );
            }
        } catch (error) {
            console.error("Error approving request:", error);
        }
    };

    return (
        <div className="requests-center-container">

            {loading ? (
                <p>Loading Requests...</p>
            ) : !requests.length ? (
                <p>No Requests available.</p>
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
                                            <button onClick={() => handleApproveRequest(request.id)} className="approveRequest">Approve</button>
                                            <button className="rejectRequest">Reject</button>
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