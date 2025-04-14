import PropTypes from "prop-types";
import HeaderTitle from "../Generals/HeaderTitle";
import ActionIcons from "../Generals/ActionIcons";
import "../../CSS/MainContentTopSI.css";

export default function MainContentTopSI({ title, onSearch,onCourseFilterChange }) {
  return (
    <div className="top-content-container">
      <HeaderTitle title={title} />
      <ActionIcons onCourseFilterChange={onCourseFilterChange} onSearch={onSearch} DashboardSelected={title} user="Student" />
    </div>
  );
}

MainContentTopSI.propTypes = {
  title: PropTypes.string.isRequired,
};
