import React, { createContext, useContext, useState } from "react";

// Create a context with default value
const CourseContext = createContext();

// Create a provider component
export const CourseProvider = ({ children }) => {
  const [courseId, setCourseId] = useState(null);

  return (
    <CourseContext.Provider value={{ courseId, setCourseId }}>
      {children}
    </CourseContext.Provider>
  );
};

// Custom hook to use the course context
export const useCourse = () => useContext(CourseContext);
