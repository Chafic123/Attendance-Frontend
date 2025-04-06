import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import "../../CSS/ActionIcons.css";

export default function ActionIcons({ onSearch, user, DashboardSelected, showAdminPanel, onCourseFilterChange }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [showInput, setShowInput] = useState(false);
  const [filterName, setFilterName] = useState("");

 // ✅ Handle filtering by course name
  const handleNameChange = (event) => {
  const value = event.target.value;
  console.log(value)
  setFilterName(value);
  onCourseFilterChange({ code: "", sort: "", name: value,  section:"" })
};

 
  const handleSearchClick = () => {
    setShowInput((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Update the URL params
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }

    onSearch(query); // Call parent function to filter courses
  };

  return (
    null
    // <div className="iconsParent">
    //   {showInput && (
    //     <input
    //       className="search-input visible"
    //       type="text"
    //       placeholder="Search by course name..."
    //       value={filterName}
    //       onChange={handleNameChange}
    //     />
    //   )}

    //   {DashboardSelected !== "Notifications" && DashboardSelected !== "Schedule" && (
    //     <>
    //       <img
    //         className="search-icon"
    //         src="../public/Images/Search-icon.png"
    //         alt="Search Icon"
    //         onClick={handleSearchClick}
    //       />

  
    //     </>
    //   )}
    // </div>
  );
}

ActionIcons.propTypes = {
  onSearch: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  DashboardSelected: PropTypes.string.isRequired,
  showAdminPanel: PropTypes.func.isRequired,
};
