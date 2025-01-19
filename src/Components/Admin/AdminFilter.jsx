import { useState } from 'react';
import PropTypes from 'prop-types'; 
import "../../CSS/AdminFilter.css";

const AdminFilter = (props) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    
  };

  return (
    <div className='filter-container'>
      <p>Filter by:</p>

      {props.title === "CourseFilter" ? (
        <>
          <input type="text" onChange={handleFilterChange} placeholder="Code" />
          <select value={filter} onChange={handleFilterChange}>
            <option value="" disabled>Section</option>
          </select>
          <input type="text" onChange={handleFilterChange} placeholder="Instructor" />
          <select value={filter} onChange={handleFilterChange}>
            <option value="" disabled>Time</option>
          </select>
        </>
      ) : props.title === "StudentFilter" ? (
        <>
          <input type="text" onChange={handleFilterChange} placeholder="ID Number" />
          <select value={filter} onChange={handleFilterChange}>
            <option value="" disabled>College</option>
          </select>
          <select value={filter} onChange={handleFilterChange}>
            <option value="" disabled>A - Z</option>
          </select>
          <select value={filter} onChange={handleFilterChange}>
            <option value="" disabled>Year</option>
          </select>
        </>
      ) : props.title === "InstructorFilter" ? (
        <>
          <input type="text" onChange={handleFilterChange} placeholder="ID Number" />
          <select value={filter} onChange={handleFilterChange}>
            <option value="" disabled>College</option>
          </select>
          <select value={filter} onChange={handleFilterChange}>
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
};


export default AdminFilter;
