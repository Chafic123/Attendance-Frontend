import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import "../../CSS/ActionIcons.css";

export default function ActionIcons({ onSearch, user, DashboardSelected, showAdminPanel }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    // Call onSearch when the component mounts with the search query in URL
    if (searchQuery) {
      onSearch(searchQuery);
    }
  }, [searchQuery, onSearch]);

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
    <div className="iconsParent">
      {/* Search Input */}
      {showInput && (
        <input
          className="search-input visible"
          type="text"
          placeholder="Search by course name..."
          value={searchQuery}
          onChange={handleInputChange}
        />
      )}

      {/* Show search & add icons based on dashboard selection */}
      {DashboardSelected !== "Notifications" && DashboardSelected !== "Schedule" && (
        <>
          {/* Search Icon */}
          <img
            className="search-icon"
            src="../public/Images/Search-icon.png"
            alt="Search Icon"
            onClick={handleSearchClick}
          />

          {/* Add Icon (Only for Admin) */}
          {user === "Admin" && (
            <img
              className="add-icon"
              src="../public/Images/Add-icon.png"
              alt="Add Icon"
              onClick={() => showAdminPanel(true)}
            />
          )}
        </>
      )}
    </div>
  );
}

ActionIcons.propTypes = {
  onSearch: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  DashboardSelected: PropTypes.string.isRequired,
  showAdminPanel: PropTypes.func.isRequired,
};
