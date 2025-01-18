import { useState } from "react";
import PropTypes from "prop-types";

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
    <div
      style={{ display: "flex", alignItems: "center", position: "relative" }}
    >
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        style={{
          width: showInput ? "200px" : "0",
          opacity: showInput ? 1 : 0,
          transition: "width 0.3s ease, opacity 0.3s ease",
          marginRight: "10px",
          border: "1px solid rgba(84, 51, 129, 1)",
          padding: showInput ? "5px 10px" : "0",
          color: "rgba(84, 51, 129, 1)",
          overflow: "hidden",
          borderRadius: "16px",
        }}
      />

      {DashboardSelected === "Notifications" ||
      DashboardSelected === "Schedule" ? null : (
        <>
          {/* Search Icon */}
          <img
            src="../public/Images/Search-icon.png"
            alt="Search Icon"
            style={{ marginRight: "10px", cursor: "pointer" }}
            onClick={handleSearchClick}
          />

          {/* Add Icon */}
          {user === "Admin" ? (
            <img
              src="../public/Images/Add-icon.png"
              alt="Add Icon"
              style={{ cursor: "pointer" }}
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
