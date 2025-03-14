import { useState } from 'react';
import PropTypes from 'prop-types';
import "../../CSS/AdminFilter.css";

const AdminFilter = (props) => {

  const [courseCode, setCourseCode] = useState('');
  const [courseSection, setCourseSection] = useState('');
  const [courseInstructor, setCourseInstructor] = useState('');
  const [courseTime, setCourseTime] = useState('');

  const [studentIdNumber, setStudentIdNumber] = useState('');
  const [studentCollege, setStudentCollege] = useState('');
  const [studentSortOrder, setStudentSortOrder] = useState('');
  const [studentYear, setStudentYear] = useState('');

  const [instructorIdNumber, setInstructorIdNumber] = useState('');
  const [instructorCollege, setInstructorCollege] = useState('');
  const [instructorSortOrder, setInstructorSortOrder] = useState('');

  const handleInputChange = (setter) => (event) => setter(event.target.value);


  return (
    <div className='filter-container'>
      <p>Filter by:</p>

      {props.title === "CourseFilter" ? (
        
        <>
          <input type="text" value={courseCode} onChange={handleInputChange(setCourseCode)} placeholder="Code" />

          <select value={courseSection} onChange={handleInputChange(setCourseSection)}>
            <option value="" disabled>Section</option>
          </select>

          <input type="text" value={courseInstructor} onChange={handleInputChange(setCourseInstructor)} placeholder="Instructor" />

          <select value={courseTime} onChange={handleInputChange(setCourseTime)}>
            <option value="" disabled>Time</option>
          </select>

        </>

      ) : props.title === "StudentFilter" ? (
        <>
        
          <input type="text" value={studentIdNumber} onChange={handleInputChange(setStudentIdNumber)} placeholder="ID Number" />
          
          <select value={studentCollege} onChange={handleInputChange(setStudentCollege)}>
            <option value="" disabled>College</option>
          </select>

          <select value={studentSortOrder} onChange={handleInputChange(setStudentSortOrder)}>
            <option value="" disabled>A - Z</option>
          </select>

          <select value={studentYear} onChange={handleInputChange(setStudentYear)}>
            <option value="" disabled>Year</option>
          </select>

        </>

      ) : props.title === "InstructorFilter" ? (
        <>

          <input type="text" value={instructorIdNumber} onChange={handleInputChange(setInstructorIdNumber)} placeholder="ID Number" />
          
          <select value={instructorCollege} onChange={handleInputChange(setInstructorCollege)}>
            <option value="" disabled>College</option>
          </select>
          
          <select value={instructorSortOrder} onChange={handleInputChange(setInstructorSortOrder)}>
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