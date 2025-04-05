import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MachineLearning (){
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
        console.log(response)
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
    <div>
      <h2>Process Attendance</h2>
      
      {error && (
        <div>
          {error}
        </div>
      )}
      
      {result && (
        <div>
          <h3>Attendance Results:</h3>
          <p>Recognized: {result.recognized_count}/{result.total_students} students</p>
          <p>Session ID: {result.session_id}</p>
          {result.recognized_students && result.recognized_students.length > 0 && (
            <>
              <p>Recognized IDs:</p>
              <ul>
                {result.recognized_students.map((student, index) => (
                  <li key={index}>{student}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
  
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label>
              Course:
            </label>
            <select
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
  
          <div className="flex-1">
            <label>
              Section:
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              required
              disabled={!selectedCourse}
            >
              <option value="">{selectedCourse ? "Select a Section" : "Select a Course first"}</option>
              {selectedCourse && getSectionsForCourse().map(({section, date}, index) => (
                <option key={index} value={section}>
                  {section} ({date})
                </option>
              ))}
            </select>
          </div>
        </div>
  
        <div>
          <label>
            Upload Video:
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            required
          />
        </div>
  
        {isProcessing && (
          <div>
            <div>
              <div
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p>
              {progress < 100 ? "Processing..." : "Finalizing..."}
            </p>
          </div>
        )}
  
        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-2 px-4 rounded text-white font-medium ${
            isProcessing
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isProcessing ? "Processing..." : "Process Attendance"}
        </button>
      </form>
    </div>
  );
};