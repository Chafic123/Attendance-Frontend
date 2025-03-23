import { useState } from 'react';
import PropTypes from 'prop-types';
import "../../CSS/AdminFilter.css";

const AdminFilter = ({ title, onCourseFilterChange }) => {
  const [courseCode, setCourseCode] = useState('');
  const [courseSection, setCourseSection] = useState(0);
  const [courseInstructor, setCourseInstructor] = useState('');
  const [courseTime, setCourseTime] = useState('');

  const handleInputChange = (setter) => (event) => {
    const value = event.target.value;
    setter(value);

    // Pass the updated filter values to the parent component
    onCourseFilterChange({
      courseCode: courseCode,
      courseSection: courseSection,
      courseInstructor: courseInstructor,
      courseTime: courseTime,
      [event.target.name]: value, // Update the specific filter field
    });
  };

  return (
    <div className='filter-container'>
      <p>Filter by:</p>

      {title === "CourseFilter" ? (
        <>
          <input
            type="text"
            name="courseCode"
            value={courseCode}
            onChange={handleInputChange(setCourseCode)}
            placeholder="Code"
          />
          <select
            name="courseSection"
            value={courseSection}
            onChange={handleInputChange(setCourseSection)}
          >
            <option value="" disabled>Section</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <input
            type="text"
            name="courseInstructor"
            value={courseInstructor}
            onChange={handleInputChange(setCourseInstructor)}
            placeholder="Instructor"
          />
          <select
            name="courseTime"
            value={courseTime}
            onChange={handleInputChange(setCourseTime)}
          >
            <option value="" disabled>Time</option>
          </select>
        </>
      ) : title === "StudentFilter" ? (
        <>
          <input type="text" placeholder="ID Number" />
          <select>
            <option value="" disabled>College</option>
          </select>
          <select>
            <option value="" disabled>A - Z</option>
          </select>
          <select>
            <option value="" disabled>Year</option>
          </select>
        </>
      ) : title === "InstructorFilter" ? (
        <>
          <input type="text" placeholder="ID Number" />
          <select>
            <option value="" disabled>College</option>
          </select>
          <select>
            <option value="" disabled>A - Z</option>
          </select>
        </>
      ) : (
        <>Error</>
      )}
    </div>
  );
};

AdminFilter.propTypes = {
  title: PropTypes.oneOf(["CourseFilter", "StudentFilter", "InstructorFilter"]).isRequired,
  onCourseFilterChange: PropTypes.func.isRequired,
};

export default AdminFilter;