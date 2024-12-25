import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CourseList from './course-list/CourseList';
import CourseDetail from './course-detail/CourseDetail';
import UserDetailForm from './user-detail/UserDetailForm';
import EnrolledUsers from './enrolled-user/EnrolledUsers';
import './App.css';
import computer1 from './assets/computer1.png'
import data from './assets/data1.png'
import business from './assets/bussiness1.png'
import social from './assets/social1.png'
import biology from './assets/biology1.png'
import banner from './assets/layer.png'
import back from './assets/banner_new.png'

const App = () => {
  const [courses] = useState([
    {
      id: 1,
      title: 'Computer Science',
      description: 'This is a course for learning Computer Science',
      content: ['Introduction', 'Chapter 1', 'Chapter 2'],
      image: computer1
    },
    {
      id: 2,
      title: 'Data Analysis & Statistics',
      description: 'This is a course for learning Data Analysis & Statistics',
      content: ['Introduction', 'Lesson 1', 'Lesson 2'],
      image: data
    },
    {
      id: 3,
      title: 'Business & Management',
      description: 'This is a course for learning Business & Management',
      content: ['Introduction', 'Lesson 1', 'Lesson 2'],
      image: business
    },
    {
      id: 4,
      title: 'Social Sciences',
      description: 'This is a course for learning Social Sciences',
      content: ['Introduction', 'Lesson 1', 'Lesson 2'],
      image: social
    },
    {
      id: 5,
      title: 'Biology & Life Sciences',
      description: 'This is a course for learning Biology & Life Sciences',
      content: ['Introduction', 'Lesson 1', 'Lesson 2'],
      image: biology
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
                <div className='hero1'>
                <h1 className='heading'>Your Courses</h1>
                <p className='para'>Empower yourself with knowledge and skills that matter. Start your learning journey today!</p>
                </div>
                <img className='header' src={banner} alt=''></img>

                <img className='back' src={back} alt=''></img>
              </div>
              <div className="featured-courses">
                <h2 className='para'>Featured Courses</h2>
                <div className="course-grid">
                  {courses.map(course => (
                    <div key={course.id} className="course-card">
                      <img src={course.image} alt={course.title} className="course-image" />
                      <h3>{course.title}</h3>
                      <p>{course.description}</p>
                      <Link to="/courses" className="cta-button">Enroll Now</Link>
                    </div>
                  ))}
                </div>
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
