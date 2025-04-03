import { useState } from 'react';
import PropTypes from 'prop-types';
import "../../CSS/AdminFilter.css";

const AdminFilter = (props) => {
  const [filterCode, setFilterCode] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filterSection, setSection] = useState("");

  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [major, setMajor] = useState("");
  const [studentSort, setStudentSort] = useState("");

  const [instructorName, setInstructorName] = useState("");
  const [instructorSortOrder, setInstructorSortOrder] = useState('');
  const [instructorDepartment, setInstructorDepartment] = useState("");


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

  const handleStudentNameChange = (event) => {
    const value = event.target.value;
    setStudentName(value);
    props.onStudentFilterChange({ studentID: studentId, name: value, major: major, sort: studentSort });
  };

  const handleStudentIdChange = (event) => {
    const value = event.target.value;
    setStudentId(value);
    props.onStudentFilterChange({ studentID: value, name: studentName, major: major, sort: studentSort });
  };

  const handleMajorChange = (event) => {
    const value = event.target.value;
    setMajor(value);
    props.onStudentFilterChange({ studentID: studentId, name: studentName, major: value, sort: studentSort });
  };
  const handleStudentSortChange = (event) => {
    const value = event.target.value;
    setStudentSort(value);
    props.onStudentFilterChange({ studentID: studentId, name: studentName, major: major, sort: value });
  };



  const handleInstructorNameChange = (event) => {
    const value = event.target.value;
    setInstructorName(value);
    props.onInstructorFilterChange({ instructorName: value, department: instructorDepartment, sort: instructorSortOrder });
  };

  const handleInstructorDepartmentChange = (event) => {
    const value = event.target.value;
    setInstructorDepartment(value);
    props.onInstructorFilterChange({ instructorName: instructorName, department: value, sort: instructorSortOrder });
  };

  const handleInstructorSortChange = (event) => {
    const value = event.target.value;
    setInstructorSortOrder(value);
    props.onInstructorFilterChange({ instructorName: instructorName, department: instructorDepartment, sort: value });
  };



  return (
    <div className='filter-container'>
      <p>Filter by:</p>

      {props.title === "CourseFilter" ? (
        <>
          {props.filterTop === "Courses" ? (
            <>
              <input type="text" value={filterCode} onChange={handleCodeChange} placeholder="Code" />
              <input
                type="text"
                value={filterSection}
                onChange={handleSectionChange}
                placeholder="Section"
                className="codeInput"
              />
              <select value={sortOrder} onChange={handleSortChange} className="selectInput">
                <option value="">Sort</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
              </select>
            </>
          ) : props.filterTop === "Course Students" ? (
            <>
              <input
                type="text"
                value={studentId}
                onChange={handleStudentIdChange}
                placeholder="Student ID"
                className="codeInput"
              />
              <input
                type="text"
                value={studentName}
                onChange={handleStudentNameChange}
                placeholder="Student Name"
                className="codeInput"
              />
              <input
                type="text"
                value={major}
                onChange={handleMajorChange}
                placeholder="Major"
                className="codeInput"
              />
              <select value={studentSort} onChange={handleStudentSortChange} className="selectInput">
                <option value="">Sort</option>
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
              </select>
            </>
          ) : null}
        </>
      ) : props.title === "StudentFilter" ? (
        <>
          <input
            type="text"
            value={studentId}
            onChange={handleStudentIdChange}
            placeholder="Student ID"
            className="codeInput"
          />
          <input
            type="text"
            value={studentName}
            onChange={handleStudentNameChange}
            placeholder="Student Name"
            className="codeInput"
          />
          <input
            type="text"
            value={major}
            onChange={handleMajorChange}
            placeholder="Major"
            className="codeInput"
          />
          <select value={studentSort} onChange={handleStudentSortChange} className="selectInput">
            <option value="">Sort</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </>
      ) : props.title === "InstructorFilter" ? (
        <>
          <input
            type="text"
            value={instructorName}
            onChange={handleInstructorNameChange}
            placeholder="Instructor Name"
            className="codeInput"
          />
          <input
            type="text"
            value={instructorDepartment}
            onChange={handleInstructorDepartmentChange}
            placeholder="Instructor Department"
            className="codeInput"
          />
          <select
            value={instructorSortOrder}
            onChange={handleInstructorSortChange}
            className="selectInput"
          >
            <option value="">Sort</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
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
  filterTop: PropTypes.string,
  onCourseFilterChange: PropTypes.func.isRequired,
  onStudentFilterChange: PropTypes.func.isRequired,
  onInstructorFilterChange: PropTypes.func.isRequired,
};

export default AdminFilter;
