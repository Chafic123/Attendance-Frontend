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

  const [studentCoursesFilterCode, setStudentCoursesFilterCode] = useState("");
  const [studentCoursesSortOrder, setStudentCoursesSortOrder] = useState("");
  const [studentCoursesSection, setStudentCoursesSection] = useState("");

  // Handle changes for CourseFilter
  const handleCodeChange = (event) => {
    const value = event.target.value;
    setFilterCode(value);
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

  // Handle changes for StudentFilter
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

  // Handle changes for InstructorFilter
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


  const handleStudentCoursesCodeChange = (event) => {
    const value = event.target.value;
    setStudentCoursesFilterCode(value);
    props.onStudentCoursesFilterChange({ code: value, sort: studentCoursesSortOrder,section: studentCoursesSection });
  };

  const handleStudentCoursesSortChange = (event) => {
    const value = event.target.value;
    setStudentCoursesSortOrder(value);
    props.onStudentCoursesFilterChange({ code: studentCoursesFilterCode, sort: value, section: filterSection });
  };

  const handleStudentCoursesSectionChange = (event) => {
    const value = event.target.value;
    setStudentCoursesSection(value);
    props.onStudentCoursesFilterChange({ code: studentCoursesFilterCode, sort: studentCoursesSortOrder, section: value });
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
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
              </select>
            </>
          ) : null}
        </>
      ) : props.title === "StudentFilter" ? (
        <>
          {props.studentCourses.length > 0 ? (
            <>
              <input
                type="text"
                value={studentCoursesFilterCode}
                onChange={handleStudentCoursesCodeChange}
                placeholder="Course Filter Code"
                className="codeInput"
              />
              <input
                type="text"
                value={studentCoursesSection}
                onChange={handleStudentCoursesSectionChange}
                placeholder="Course Section"
                className="codeInput"
              />
              <select
                value={studentCoursesSortOrder}
                onChange={handleStudentCoursesSortChange}
                className="selectInput"
              >
                <option value="">Sort</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
              </select>

            </>
          ) : (
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
          )}
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
  studentCourses: PropTypes.array, // Add this to check the length
  studentCourseFilterOptions: PropTypes.object, // Add this prop to pass the student course filter options
  setStudentCourseFilterOptions: PropTypes.func.isRequired, // Add this function to update the filter options
  onCourseFilterChange: PropTypes.func.isRequired,
  onStudentFilterChange: PropTypes.func.isRequired,
  onInstructorFilterChange: PropTypes.func.isRequired,
};

export default AdminFilter;
