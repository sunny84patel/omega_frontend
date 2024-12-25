
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EnrolledUsers.css'; 

const API_BASE_URL = "http://localhost:3000/api"; 

const EnrolledUsers = () => {
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolledUsers = async () => {
      const url = `${API_BASE_URL}/enrolledUsers`;
      console.log("Fetching from URL:", url); 

      try {
        const response = await axios.get(url);
        console.log("Response", response);
        console.log("Response.Data", response.data);

        setEnrolledUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEnrolledUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="enrolled-users">
      <h2>Enrolled Users</h2>
      <div className="card-container">
        {enrolledUsers.map((user) => (
          <div className="card" key={user._id}>
            <div className="card-header">
              <h3>{user.name}</h3>
            </div>
            <div className="card-body">
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledUsers;
