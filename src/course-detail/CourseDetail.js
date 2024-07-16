import React from 'react';
import './CourseDetail.css';

const CourseDetail = ({ course }) => {
  
  return (
    <div className="course-detail">
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <h3>Course Content</h3>
      <ul>
        {course.content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetail;
