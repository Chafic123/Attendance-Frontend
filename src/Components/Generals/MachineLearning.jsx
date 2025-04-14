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
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to process video');
      console.error('Error processing attendance:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="ml-container">
      <div className="ml-card">
        <div className="ml-card-body">
          <h2 className="ml-title">
            Process Attendance
          </h2>

          {error && (
            <div className="ml-alert ml-alert-error">{error}</div>
          )}

          {result && (
            <div className="ml-alert ml-alert-success">
              <h5>Attendance Results:</h5>
              <p><strong>Recognized:</strong> {result.recognized_count}/{result.total_students} students</p>
              <p><strong>Session ID:</strong> {result.session_id}</p>
              {result.recognized_students?.length > 0 && (
                <>
                  <p><strong>Recognized IDs:</strong></p>
                  <ul className="ml-student-list">
                    {result.recognized_students.map((student, index) => (
                      <li key={index}>{student}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
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
                {selectedCourse && getSectionsForCourse().map(({ section, date }, index) => (
                  <option key={index} value={section}>
                    {section} ({date})
                  </option>
                ))}
              </select>
            </div>

            <div className="ml-form-group">
              <label className="ml-label">Upload Video:</label>
              <input
                type="file"
                className="ml-file-input"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
                required
              />
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