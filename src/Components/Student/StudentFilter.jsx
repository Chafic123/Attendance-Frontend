import { useState } from "react";
import "../../CSS/SIFilter.css";
import PropTypes from "prop-types";

export default function StudentFilter({ onFilterChange }) {
  const [filterCode, setFilterCode] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // ✅ Handle filtering by course code
  const handleCodeChange = (event) => {
    const value = event.target.value;
    setFilterCode(value);
    onFilterChange({ code: value, sort: sortOrder , name:""}); // Pass updated filters
  };

  // ✅ Handle sorting (A-Z, Z-A)
  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOrder(value);
    onFilterChange({ code: filterCode, sort: value }); // Pass updated filters
  };

  return (
    <div className="filterContainer">
      <p className="filterTitle" style={styles.p}>Filter by:</p>

      {/* ✅ Input for filtering by course code */}
      <input
        type="text"
        value={filterCode}
        onChange={handleCodeChange}
        placeholder="Code"
        className="codeInput"
      />

      {/* ✅ Dropdown for sorting */}
      <select value={sortOrder} onChange={handleSortChange} className="selectInput">
        <option value="">Sort</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
    </div>
  );
}

StudentFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

const styles = {
  p: {
    marginRight: "10px",
    fontWeight: "bold",
    color: "#000",
    fontSize: "16.667px",
  },
};
