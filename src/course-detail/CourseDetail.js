import React from 'react';
import './CourseDetail.css';

const CourseDetail = ({ course }) => {
  
  return (
    <div className="course-detail">
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <h3>Course Content</h3>
      <ul>
        {course.content.map((it) => (
          <li>{it}</li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetail;
