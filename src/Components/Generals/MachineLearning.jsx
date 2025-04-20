import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../CSS/MachineLearning.css";

export default function MachineLearning() {
  const [courseSessions, setCourseSessions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showResultPopup, setShowResultPopup] = useState(false);

  useEffect(() => {
    const fetchCourseSessions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/auth/course-sessions');
        setCourseSessions(response.data.course_sessions);
      } catch (err) {
        setError('Failed to load course sessions');
        console.error('Error fetching course sessions:', err);
      }
    };
    fetchCourseSessions();
  }, []);

  const getUniqueCourseNames = () => {
    return [...new Set(courseSessions.map(session => session.course_name))];
  };

  const getSectionsForCourse = () => {
    if (!selectedCourse) return [];
    return courseSessions
      .filter(session => session.course_name === selectedCourse)
      .map(session => ({
        section: session.course_section,
        date: session.date,
        sessionId: session.session_id
      }));
  };

  const resetForm = () => {
    setSelectedCourse('');
    setSelectedSection('');
    setVideoFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!selectedCourse || !selectedSection || !videoFile) {
      setError('Please select course, section, and upload a video');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('course_name', selectedCourse);
      formData.append('course_section', selectedSection);
      formData.append('video', videoFile);

      const selectedSession = courseSessions.find(
        session => session.course_name === selectedCourse &&
          session.course_section === selectedSection
      );

      if (selectedSession) {
        formData.append('session_id', selectedSession.session_id);
      }

      const response = await axios.post(
        'http://localhost:5000/api/process-attendance',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      setResult(response.data);
      setShowResultPopup(true);
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to process video');
      console.error('Error processing attendance:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="ml-container">
      {/* Result Popup */}
      {showResultPopup && result && (
        <div className="ml-popup-overlay">
          <div className="ml-popup">
            <div className="ml-popup-header">
              <h3>Attendance Processing Complete</h3>
              <button 
                className="ml-popup-close"
                onClick={() => setShowResultPopup(false)}
              >
                &times;
              </button>
            </div>
            <div className="ml-popup-content">
              <p><strong>Course:</strong> {result.course_name}</p>
              <p><strong>Section:</strong> {result.section}</p>
              <p><strong>Present Students:</strong> {result.recognized_count}/{result.total_students}</p>
            </div>
            <div className="ml-popup-footer">
              <button 
                className="ml-button"
                onClick={() => setShowResultPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="ml-card">
        <div className="ml-card-body">
          <h2 className="ml-title">
            Process Attendance
          </h2>

          {error && (
            <div className="ml-alert ml-alert-error">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="ml-form">
            <div className="ml-form-group">
              <label className="ml-label">Course:</label>
              <select
                className="ml-select"
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                  setSelectedSection('');
                }}
                required
              >
                <option value="">Select a Course</option>
                {getUniqueCourseNames().map((courseName, index) => (
                  <option key={index} value={courseName}>
                    {courseName}
                  </option>
                ))}
              </select>
            </div>

            <div className="ml-form-group ml-section-group">
              <label className="ml-label">Section:</label>
              <select
                className="ml-select"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                required
                disabled={!selectedCourse}
              >
                <option value="">
                  {selectedCourse ? "Select a Section" : "Select a Course first"}
                </option>
                {selectedCourse && getSectionsForCourse().map(({ section }, index) => (
                  <option key={index} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>

            <div className="ml-form-group">
              <div className="ml-file-input-container">
                <label className={`ml-file-input-label ${videoFile ? 'active' : ''}`}>
                  <div className="ml-file-input-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#604099"/>
                      <path d="M14 2V8H20" fill="#4A5DA9"/>
                      <path d="M10 11V17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M7 14H13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="ml-file-input-text">
                    {videoFile ? (
                      <>
                        File Uploaded
                        <br />
                        Size: {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                      </>
                    ) : (
                      <>
                        Drag & drop your video or <span>browse</span>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    className="ml-file-input"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                    required
                  />
                </label>
              </div>
            </div>

            {isProcessing && (
              <div className="ml-progress-container">
                <div className="ml-progress">
                  <div
                    className="ml-progress-bar"
                    style={{ width: `${progress}%` }}
                  >
                    {progress}%
                  </div>
                </div>
                <p className="ml-progress-text">
                  {progress < 100 ? "Processing..." : "Finalizing..."}
                </p>
              </div>
            )}

            <div className="ml-button-container">
              <button
                type="submit"
                className="ml-button"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Process Attendance"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};