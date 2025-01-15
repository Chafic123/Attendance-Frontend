import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCourseById, updateCourse } from '../../ApiService/CourseService';
import EditCourseForm from '../EditCourseForm';

export default function EditCourse({ courseId }) {
    const [courseData, setCourseData] = useState({
        code: '',
        name: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        instructor: '',
        instructorId: '',
        room: '',
        credits: 0, 
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCourseById(courseId)
            .then((response) => {
                setCourseData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching course data:', error);
                setLoading(false);
            });

    }, [courseId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCourseData((prevData) => ({
            ...prevData,
            [name]: name === 'credits' ? parseInt(value, 10) : value, //  credits as a number
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();

        // Validate the form data
        if (!courseData.code || !courseData.name || !courseData.instructor) {
            alert('Please fill in all required fields.');
            return;
        }

        updateCourse(courseId, courseData)
            .then(() => {
                alert('Course updated successfully!');
            })
            .catch((error) => {
                console.error('Error updating course:', error);
                alert('Failed to update course.');
            });
    };

    const handleCancel = () => {
        alert('Changes canceled');
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="admin-edit">
            <EditCourseForm
                courseData={courseData}
                onChange={handleChange}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        </div>
    );
}

EditCourse.propTypes = {
    courseId: PropTypes.string.isRequired,
};
