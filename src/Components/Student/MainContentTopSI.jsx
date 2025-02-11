// import React from "react";
import PropTypes from "prop-types";
import HeaderTitle from "../Generals/HeaderTitle";
import ActionIcons from "../Generals/ActionIcons";
import "../../CSS/MainContentTopSI.css"
export default function MainContentTopSI({ title, onSearch}) {
  return (
    <div className="top-content-container">
      <HeaderTitle title={title} />
      <ActionIcons
        onSearch={onSearch}
        DashboardSelected={title}
        user="Student"
      />
    </div>
  );
}

MainContentTopSI.propTypes = {
  title: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired, // Made it required
};