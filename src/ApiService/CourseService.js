import axios from 'axios';

const BASE_URL = '/api/courses';

export const getCourseById = (courseId) => {
    return axios.get(`${BASE_URL}/${courseId}`);
};

export const updateCourse = (courseId, courseData) => {
    return axios.put(`${BASE_URL}/${courseId}`, courseData);
};

export const getAllCourses = () => {
    return axios.get(BASE_URL);
};
