import { useState, useEffect } from "react";
import "../../CSS/SIFilter.css";

export default function InstructorFilter({ onFilterChange, filterTop }) {
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
    onFilterChange({ code: "", sort: "", name: "", section: "", student_id: "", major: "" });
  }, [filterTop]);

  const handleCodeChange = (event) => {
    const value = event.target.value;
    setFilterCode(value);
    onFilterChange({ code: value, sort: sortOrder, name: "", section: filterSection });
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOrder(value);
    onFilterChange({ code: filterCode, sort: value, name: "", section: filterSection });
  };

  const handleSectionChange = (event) => {
    const value = event.target.value;
    setSection(value);
    onFilterChange({ code: filterCode, sort: sortOrder, name: "", section: value });
  };

  const handleStudentNameChange = (event) => {
    const value = event.target.value;
    setStudentName(value);
    onFilterChange({ name: value, student_id: studentId, major: major });
  };

  const handleStudentIdChange = (event) => {
    const value = event.target.value;
    setStudentId(value);
    onFilterChange({ name: studentName, student_id: value, major: major });
  };

  const handleMajorChange = (event) => {
    const value = event.target.value;
    setMajor(value);
    onFilterChange({ name: studentName, student_id: studentId, major: value });
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
            value={studentName}
            onChange={handleStudentNameChange}
            placeholder="Student Name"
            className="codeInput"
          />
          <input
            type="text"
            value={studentId}
            onChange={handleStudentIdChange}
            placeholder="Student ID"
            className="codeInput"
          />
          <input
            type="text"
            value={major}
            onChange={handleMajorChange}
            placeholder="Major"
            className="codeInput"
          />
        </>
      )}
    </div>
  );
}
