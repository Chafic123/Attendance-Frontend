import { useState } from "react";
import "../../CSS/SIFilter.css";
import PropTypes from "prop-types";

export default function StudentFilter({ onCourseFilterChange }) {
  const [filterCode, setFilterCode] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [courseName, setCourseName] = useState(""); 

  const handleCodeChange = (event) => {
    const value = event.target.value;
    setFilterCode(value);
    onCourseFilterChange({ code: value, sort: sortOrder, name: courseName });
  };

  const handleCourseNameChange = (event) => {
    const value = event.target.value;
    setCourseName(value);
    onCourseFilterChange({ code: filterCode, sort: sortOrder, name: value });
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOrder(value);
    onCourseFilterChange({ code: filterCode, sort: value, name: courseName });
  };

  return (
    <div className="filterContainer">
      <p className="filterTitle" style={styles.p}>Filter by:</p>


      <input
        type="text"
        value={filterCode}
        onChange={handleCodeChange}
        placeholder="Code"
        className="codeInput"
      />

      <input
        type="text"
        value={courseName}
        onChange={handleCourseNameChange}
        placeholder="Name"
        className="codeInput"
      />

      <select value={sortOrder} onChange={handleSortChange} className="selectInput">
        <option value="">Sort</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
    </div>
  );
}

StudentFilter.propTypes = {
  onCourseFilterChange: PropTypes.func.isRequired,
};

const styles = {
  p: {
    marginRight: "10px",
    fontWeight: "bold",
    color: "#000",
    fontSize: "16.667px",
  },
};
