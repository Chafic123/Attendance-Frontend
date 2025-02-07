import { useState } from "react";
import PropTypes from "prop-types";
import "../../CSS/ActionIcons.css";

export default function ActionIcons({
  onSearch,
  onAdd,
  user,
  DashboardSelected,
}) {
  const [showInput, setShowInput] = useState(false);

  const handleSearchClick = () => {
    setShowInput((prev) => !prev);
  };

  return (
    <div className="iconsParent">
      <input
        className={`search-input ${showInput ? "visible" : ""}`}
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
      />

      {DashboardSelected === "Notifications" || DashboardSelected === "Schedule" ? null : (
        <>
          {/* Search Icon */}
          <img
            className="search-icon"
            src="../public/Images/Search-icon.png"
            alt="Search Icon"
            onClick={handleSearchClick}
          />

          {/* Add Icon */}
          {user === "Admin" ? (
            <img
              className="add-icon"
              src="../public/Images/Add-icon.png"
              alt="Add Icon"
              onClick={onAdd}
            />
          ) : null}
        </>
      )}
    </div>
  );
}

ActionIcons.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  DashboardSelected: PropTypes.string.isRequired,
};
