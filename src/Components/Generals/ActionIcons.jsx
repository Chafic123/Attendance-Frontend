import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import "../../CSS/ActionIcons.css";

export default function ActionIcons({ onSearch, user, DashboardSelected, showAdminPanel, onCourseFilterChange }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [showInput, setShowInput] = useState(false);
  const [filterName, setFilterName] = useState("");
  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    // Check if the device matches either of the mobile media queries
    const mediaQuery1 = window.matchMedia('(max-width: 431px) and (max-height: 932px)');
    const mediaQuery2 = window.matchMedia('(max-width: 413px) and (max-height: 916px)');
    
    const handler = () => {
      setIsMobileDevice(mediaQuery1.matches || mediaQuery2.matches);
    };
    
    // Initial check
    handler();
    
    // Listen for changes
    mediaQuery1.addListener(handler);
    mediaQuery2.addListener(handler);
    
    return () => {
      mediaQuery1.removeListener(handler);
      mediaQuery2.removeListener(handler);
    };
  }, []);

  // ✅ Handle filtering by course name
  // const handleNameChange = (event) => {
  //   const value = event.target.value;
  //   console.log(value)
  //   setFilterName(value);
  //   onCourseFilterChange({ code: "", sort: "", name: value,  section:"" })
  // };

  // const handleSearchClick = () => {
  //   setShowInput((prev) => !prev);
  // };

  // const handleInputChange = (e) => {
  //   const query = e.target.value;
  //   setSearchQuery(query);

  //   // Update the URL params
  //   if (query) {
  //     setSearchParams({ search: query });
  //   } else {
  //     setSearchParams({});
  //   }

  //   onSearch(query); // Call parent function to filter courses
  // };

  const handleAddCourse = () => {
    console.log("Add Panel opened");
  
    const adminPanel = document.querySelector(".AdminPanelParent");
    const addCourseCard = document.querySelector(".add-course-card");
    const addStudentCard = document.querySelector(".add-student-card");
  
    if (addCourseCard) addCourseCard.style.display = "none";
    if (addStudentCard) addStudentCard.style.display = "none";
  
    if (adminPanel) {
      adminPanel.style.display = "block";
      adminPanel.style.zIndex = "1000";
    }
  
    if (addCourseCard) {
      addCourseCard.style.display = "block";
    } else if (addStudentCard) {
      addStudentCard.style.display = "block";
    }
  };
  
  return (
    <div className="iconsParent">
      {DashboardSelected !== "Notifications" && DashboardSelected !== "Schedule" && (
        <>
          {userRole === "admin" && isMobileDevice && (
            <img
              className="search-icon"
              style={{height:"15px"}}
              src="../public/Images/Add-icon.png"
              alt="Search Icon"
              onClick={handleAddCourse}
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