import { useState, useEffect } from "react";
import { getInstructorRequests } from "../../ApiService/InstructorRequestCorrections";
import "../../CSS/InstructorRequests.css";
import LoadingSpinner from "../Generals/LoadingSpinner";
export default function InstructorRequests({ isRequestStatusChanged, setIsRequestStatusChanged }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getInstructorRequests();
        const pendingRequests = (data.requests || []).filter(
          (request) => request.status === "pending"
        );
        if (isRequestStatusChanged) {
          setIsRequestStatusChanged(false);
        }
        setRequests(pendingRequests || []);
      } catch (error) {
        console.error("Error fetching instructor requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [isRequestStatusChanged]);

  return (
    <div>

      <div id="request-container" >
        <h2 className="title">Requests</h2>

        <div
          className="allRequests"
          style={loading ? {
            position: 'relative',  // Required for absolute positioning of spinner
            minHeight: '150px'    // Ensures minimum space for spinner
          } : {}}
        >          {loading ? (
          <LoadingSpinner />
        ) : !requests.length ? (
          <p>No Requests available.</p>
        ) : (
          <>
            {requests.map((request, index) => (
              <div key={index}>
                <div className="gray-line"></div>
                <div className="requests">
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <div className="request-title-container">
                      <img
                        className="purple-circle"
                        src="../public/Images/Purple-circle.png"
                        alt="request Icon"
                      />
                      <p className="request-title-small">Attendance Correction Request</p>
                    </div>

                    <div className="temp">
                      <div className="request-content-container">
                        <p className="request-content">
                          {request.reason || "No specific reason provided."}
                        </p>
                        <p className="request-course-name">
                          {request.course_name}
                        </p>
                        <p className="request-student-name">
                          {request.student_name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="gray-line"></div>
          </>
        )}

          <style>
            {`
          @media only screen and (max-width: 431px) and (max-height: 932px) {
            .gray-line {
              width: 90% !important;
              margin-left: 0px !important;
            }
          }
        `}
          </style>
        </div>
      </div>
    </div>
  );
}
