import { useState } from 'react';
import PropTypes from 'prop-types';
import "../../CSS/AdminFilter.css";

const AdminFilter = (props) => {
  const [filterCode, setFilterCode] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filterSection, setSection] = useState("");




  const [studentName, setStudentName] = useState("")
  const [studentIdNumber, setStudentIdNumber] = useState('');
  const [studentSortOrder, setStudentSortOrder] = useState('');

  const [instructorName, setInstructorName] = useState("")
  const [instructorIdNumber, setInstructorIdNumber] = useState('');
  const [instructorSortOrder, setInstructorSortOrder] = useState('');

  const handleCodeChange = (event) => {
    const value = event.target.value;
    setFilterCode(value);
    console.log(value);
    props.onCourseFilterChange({ code: value, sort: sortOrder, name: "", section: filterSection });
  };
  

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOrder(value);
    props.onCourseFilterChange({ code: filterCode, sort: value, name: "", section: filterSection });
  };

  const handleSectionChange = (event) => {
    const value = event.target.value;
    setSection(value);
    props.onCourseFilterChange({ code: filterCode, sort: sortOrder, name: "", section: value });
  };

  return (
    <div className='filter-container'>
      <p>Filter by:</p>

      {props.title === "CourseFilter" ? (
        
        <>
          <input type="text" value={filterCode} onChange={handleCodeChange} placeholder="Code" />

    
          <input
            type="text"
            value={filterSection}
            onChange= {handleSectionChange}
            placeholder="Section"
            className="codeInput"
          />
          <select value={sortOrder} onChange={handleSortChange} className="selectInput">
            <option value="">Sort</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </>

      ) : props.title === "StudentFilter" ? (
        <>
        
          <input type="text" value={studentIdNumber}  placeholder="ID Number" />
          


          <select value={studentSortOrder} >
            <option value="" disabled>A - Z</option>
          </select>

        </>

      ) : props.title === "InstructorFilter" ? (
        <>

          <input type="text" value={instructorIdNumber}  placeholder="ID Number" />
          
\
          
          <select value={instructorSortOrder} >
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