import { useState } from "react";
import "../../CSS/SIFilter.css"
export default function InstructorFilter() {
  const [filter, setFilter] = useState("");
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="filterContainer">
      <p className="filterTitle">Filter by:</p>
      <input
        type="text"
        onChange={handleFilterChange}
        placeholder="Code"
        className="codeInput"
      />
      <select
        value={filter}
        onChange={handleFilterChange}
        className="selectInput"
      >
        <option value="" disabled>
          A-Z
        </option>
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
