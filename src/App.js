import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CourseList from './course-list/CourseList';
import CourseDetail from './course-detail/CourseDetail';
import UserDetailForm from './user-detail/UserDetailForm';
import EnrolledUsers from './enrolled-user/EnrolledUsers';
import './App.css';

const App = () => {
  const [courses] = useState([
    {
      id: 1,
      title: 'Course 1',
      description: 'Description of Course 1',
      content: ['Introduction', 'Chapter 1', 'Chapter 2']
    },
    {
      id: 2,
      title: 'Course 2',
      description: 'Description of Course 2',
      content: ['Introduction', 'Lesson 1', 'Lesson 2']
    },
    {
      id: 3,
      title: 'Course 3',
      description: 'Description of Course 3',
      content: ['Introduction', 'Lesson 1', 'Lesson 2']
    },
   
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [enrolledUsers, setEnrolledUsers] = useState([]);

  const handleEnroll = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    setSelectedCourse(course);
    setShowForm(true);
  };

  const handleFormSubmit = (userDetails) => {
    const newEnrolledUser = {
      ...userDetails,
      course: selectedCourse,
    };
    setEnrolledCourses([...enrolledCourses, selectedCourse]);
    setEnrolledUsers([...enrolledUsers, newEnrolledUser]);
    setShowForm(false);
    alert(`You have enrolled in ${selectedCourse.title}`);
  };

  const handleCourseClick = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    setSelectedCourse(course);
  };

  return (
    <Router>
      <div className="app-container">
        <nav>
          <ul>
            <li className='nav-item'><Link to="/" >Home</Link></li>
            <li className='nav-item'><Link to="/courses">Courses</Link></li>
            <li className='nav-item'><Link to="/enrolled-users">Enrolled Users</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={
            <div className="home-page">

              <div className="hero-section">
                <h1>Welcome to the Course Website</h1>
                <p className='para'>Empower yourself with knowledge and skills that matter. Start your learning journey today!</p>
  
              </div>
              <div className="featured-courses">
                <h2 className='para'>Featured Courses</h2>
                <ul>
                  {courses.slice(0, 3).map(course => (
                    <li key={course.id}>
                      <h3>{course.title}</h3>
                      <p>{course.description}</p>
                      <Link to="/courses" className="cta-button">Enroll Now</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          } />
          <Route path="/courses" element={
            showForm ? (
              <UserDetailForm course={selectedCourse} onSubmit={handleFormSubmit} />
            ) : (
              <>
                {selectedCourse && <CourseDetail course={selectedCourse} />}
                <CourseList courses={courses} onEnroll={handleEnroll} />
                <h2>Enrolled Courses</h2>
                <ul>
                  {enrolledCourses.map(course => (
                    <li key={course.id} onClick={() => handleCourseClick(course.id)}>
                      {course.title}
                    </li>
                  ))}
                </ul>
              </>
            )
          } />
          <Route path="/enrolled-users" element={<EnrolledUsers enrolledUsers={enrolledUsers} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
