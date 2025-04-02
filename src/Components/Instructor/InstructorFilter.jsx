import { useState, useEffect } from "react";
import "../../CSS/SIFilter.css";

export default function InstructorFilter({ onCourseFilterChange, onStudentFilterChange, filterTop }) {
  const [filterCode, setFilterCode] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filterSection, setSection] = useState("");

  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [major, setMajor] = useState("");

  useEffect(() => {
    // Clear all filters when switching between modes
    setFilterCode("");
    setSortOrder("");
    setSection("");
    setStudentName("");
    setStudentId("");
    setMajor("");
    onCourseFilterChange({ code: "", sort: "", name: "", section: "", student_id: "", major: "" });
  }, [filterTop]);

  const handleCodeChange = (event) => {
    const value = event.target.value;
    setFilterCode(value);
    onCourseFilterChange({ code: value, sort: sortOrder, name: "", section: filterSection });
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOrder(value);
    onCourseFilterChange({ code: filterCode, sort: value, name: "", section: filterSection });
  };

  const handleSectionChange = (event) => {
    const value = event.target.value;
    setSection(value);
    onCourseFilterChange({ code: filterCode, sort: sortOrder, name: "", section: value });
  };

  const handleCourseStudentNameChange = (event) => {
    const value = event.target.value;
    setStudentName(value);
    onStudentFilterChange({ studentID: studentId, name: value, major: major })
  };

  const handleCourseStudentIdChange = (event) => {
    const value = event.target.value;
    setStudentId(value);
    onStudentFilterChange({ studentID: value, name: studentName, major: major })
  };

  const handleCourseMajorChange = (event) => {
    const value = event.target.value;
    setMajor(value);
    onStudentFilterChange({ studentID: studentId, name: studentName, major: value })

  };

  return (
    <div className="filterContainer">
      <p className="filterTitle">Filter by:</p>

      {filterTop === "Courses" && (
        <>
          <input
            type="text"
            value={filterCode}
            onChange={handleCodeChange}
            placeholder="Code"
            className="codeInput"
          />
          <input
            type="text"
            value={filterSection}
            onChange={handleSectionChange}
            placeholder="Section"
            className="codeInput"
          />
          <select value={sortOrder} onChange={handleSortChange} className="selectInput">
            <option value="">Sort</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </>
      )}

      {filterTop === "Course Students" && (
        <>
           <input
            type="text"
            value={studentId}
            onChange={handleCourseStudentIdChange}
            placeholder="Student ID"
            className="codeInput"
          />
          <input
            type="text"
            value={studentName}
            onChange={handleCourseStudentNameChange}
            placeholder="Student Name"
            className="codeInput"
          />
          <input
            type="text"
            value={major}
            onChange={handleCourseMajorChange}
            placeholder="Major"
            className="codeInput"
          />
        </>
      )}
    </div>
  );
}
