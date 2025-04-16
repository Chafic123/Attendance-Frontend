import { useState, useEffect } from "react";
import "../../CSS/SIFilter.css";

export default function InstructorFilter({ onCourseFilterChange, onStudentFilterChange, filterTop }) {
  const [filterCode, setFilterCode] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filterSection, setSection] = useState("");
  const [courseName, setCourseName] = useState("")

  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [major, setMajor] = useState("");
  const [isIphone14ProMax, setIsIphone14ProMax] = useState(false);
  const [isS20Ultra, setIsS20Ultra] = useState(false);

  useEffect(() => {
    const iphone14ProMaxQuery = window.matchMedia(
      "(max-width: 431px) and (max-height: 932px)"
    );

    const s20UltraQuery = window.matchMedia(
      "(max-width: 413px) and (max-height: 916px)"
    );

    const handleIphoneChange = (e) => {
      setIsIphone14ProMax(e.matches);
    };

    const handleS20UltraChange = (e) => {
      setIsS20Ultra(e.matches);
    };

    setIsIphone14ProMax(iphone14ProMaxQuery.matches);
    setIsS20Ultra(s20UltraQuery.matches);

    // Add event listeners
    iphone14ProMaxQuery.addEventListener("change", handleIphoneChange);
    s20UltraQuery.addEventListener("change", handleS20UltraChange);

    return () => {
      iphone14ProMaxQuery.removeEventListener("change", handleIphoneChange);
      s20UltraQuery.removeEventListener("change", handleS20UltraChange);
    };
  }, []);



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
    onCourseFilterChange({ code: value, sort: sortOrder, name: courseName, section: filterSection });
  };

  const handleCourseNameChange = (event) => {
    const value = event.target.value;
    setCourseName(value);
    onCourseFilterChange({ code: filterCode, sort: sortOrder, name: value, section: filterSection });
  };


  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOrder(value);
    onCourseFilterChange({ code: filterCode, sort: value, name: courseName, section: filterSection });
  };


  const handleSectionChange = (event) => {
    const value = event.target.value;
    setSection(value);
    onCourseFilterChange({ code: filterCode, sort: sortOrder, name: courseName, section: value });
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
    <div className="filterContainer"
      style={
        isIphone14ProMax
          ? {
            marginLeft: "-30px",
            width: "181%",
            gap: "6px",
          }
          : {}
      }
    >
      <p style={isIphone14ProMax ? { fontSize: "12px" } : {}}
        className="filterTitle"
      >
        Filter by:</p>

      {filterTop === "Courses" && (
        <>
          <input
            style={
              isIphone14ProMax
                ? { width: "35.5%", height: "22px", fontSize: "10px" }
                : {}
            }
            type="text"
            value={filterCode}
            onChange={handleCodeChange}
            placeholder="Code"
            className="codeInput"
          />
          <input
            style={
              isIphone14ProMax
                ? { width: "35.5%", height: "22px", fontSize: "10px" }
                : {}
            }
            type="text"
            value={courseName}
            onChange={handleCourseNameChange}
            placeholder="Course Name"
            className="codeInput"
          />
          <input
            style={
              isIphone14ProMax
                ? { width: "35.5%", height: "22px", fontSize: "10px" }
                : {}
            }
            type="text"
            value={filterSection}
            onChange={handleSectionChange}
            placeholder="Section"
            className="codeInput"
          />
          <select
            style={
              isIphone14ProMax && !isS20Ultra
                ? { width: "31.5%", height: "22px", fontSize: "10px" }
                : isS20Ultra
                  ? { width: "33.5%", height: "22px", fontSize: "10px" }
                  : {}
            }
            value={sortOrder}
            onChange={handleSortChange}
            className="selectInput"
          >
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
