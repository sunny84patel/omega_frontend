import React from 'react';
import './EnrolledUsers.css';

const EnrolledUsers = ({ enrolledUsers }) => {
  return (
    <div className="enrolled-users">
      <h2>Enrolled Users</h2>
      <ul>
        {enrolledUsers.map((user, index) => (
          <li key={index}>
            <h3>{user.course.title}</h3>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <h4>Course Content</h4>
            <ul>
              {user.course.content.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnrolledUsers;

