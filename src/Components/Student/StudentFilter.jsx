import { useState } from "react";

export default function StudentFilter() {
  const [filter, setFilter] = useState("");
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div style={styles.filterContainer}>
      <p style={styles.p}>Filter by:</p>
      <input
        type="text"
        onChange={handleFilterChange}
        style={styles.input}
        placeholder="Code"
      />
      <select
        value={filter}
        onChange={handleFilterChange}
        style={styles.select}
      >
        <option value="" disabled>
          A-Z
        </option>
      </select>
    </div>
  );
}

const styles = {
  filterContainer: {
    width: "100%",
    display: "flex",
    margin: "7px 0",
    justifyContent: "center",
    alignItems: "center",
    gap: "13px",
  },
  p: {
    marginRight: "10px",
    fontWeight: "bold",
    color: "#000",
    fontSize: "16.667px",
  },
  select: {
    width: "18.5%",
    height: "26px",
    outline: "none",
    border: "0",
    background: "#D6D2E4",
    borderRadius: "10px",
    padding: "0 5px",
    flexGrow: "1",
  },
  option: {
    color: "rgba(71, 73, 77, 1)",
    fontsize: "14px",
    fontweight: "400",
  },
  input: {
    width: "18.5%",
    height: "28px",
    outline: "none",
    border: "0",
    background: "#D6D2E4",
    borderRadius: "10px",
    padding: "0 5px",
    color: "rgba(71, 73, 77, 1)",
    flexGrow: "1",
  },
};
