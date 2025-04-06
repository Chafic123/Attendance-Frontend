import React, { createContext, useContext, useState } from "react";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courseId, setCourseId] = useState(null);

  return (
    <CourseContext.Provider value={{ courseId, setCourseId }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => useContext(CourseContext);
