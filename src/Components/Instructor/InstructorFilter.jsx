import { useState } from "react";
import "../../CSS/SIFilter.css"
export default function InstructorFilter({ onFilterChange }) {
  const [filterCode, setFilterCode] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filterSection, setSection] = useState("");

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

  return (
    <div className="filterContainer">
      <p className="filterTitle">Filter by:</p>
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

    </div>
  );
}

const styles = {

  p: {
    marginRight: "10px",
    fontWeight: "bold",
    color: "#000",
    fontSize: "16.667px",
  },

  option: {
    color: "rgba(71, 73, 77, 1)",
    fontsize: "14px",
    fontweight: "400",
  },

};
