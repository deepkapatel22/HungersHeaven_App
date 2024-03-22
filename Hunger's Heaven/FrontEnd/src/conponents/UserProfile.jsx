import React from 'react'
import Header2 from './Header2';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { CiImageOn } from "react-icons/ci";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';

const UserProfile = () => {
  const { userId } = useParams(); // This retrieves the userId from the URL
  const [users, setUsers] = useState(null);
  const { user, fetchUser, loading, error } = useUser(); // Destructure to get fetchUser, loading, and error from context

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log(users);
        const response = await axios.get(`http://localhost:3000/api/user/${userId}`);
        setUsers(response.data);
        console.log(users);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error appropriately
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  // useEffect(() => {
  //   // Ensure userId is not undefined or null
  //   if (!userId) {
  //     console.log("UserId is null or undefined, not fetching user data.");
  //     return;
  //   }
    
  //   // Construct the URL dynamically based on the userId
  //   const fetchUserData = async (userId) => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/api/user/profile/${userId}`);
  //       console.log(response);
  //       console.log(response.data);
  //       setUserData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   fetchUserData();
  // }, [userId]); // Dependency array to re-run the effect if userId changes

  // if (!userData) {
  //   return <div>Loading user data...</div>;
  // }
  
  return (
    <>
    <Header2/>
    <SideBar>
    <div className="sidebar"> 
      <h3>Name: {users.fname} {users.lname}</h3>
      <p>Email: {users.email}</p>
      <p>Phone: {users.phno}</p>
    </div>
    </SideBar>
  </>
  )
}

export default UserProfile;

const SideBar = styled.div`
.sidebar {
    width: 250px; /* Adjust width as necessary */
    height: 100vh; /* Full height */
    position: absolute; /* Fixed Sidebar (stay in place on scroll) */
    left: 0;
    top: 0;
    background-color: #f4f4f4; /* Light grey background */
    padding: 20px;
    z-index:-1;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1); 
  }
  
  .sidebar img {
    width: 100px; 
    height: 100px; 
    border-radius: 50%; 
    object-fit: cover;  
    display: block;
    margin-top:50px;
    backbround-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    
  }
  
  .sidebar h3, .sidebar p {
    text-align: center; /* Center-align text */
    margin: 10px 0; /* Add some margin */
  }
  
  .sidebar a {
    display: block; 
    text-decoration: none; 
    color: #333; 
    background-color: #ddd;
    text-align: center; 
    padding: 10px; 
    margin: 10px 0;
    border-radius: 5px; 
    transition: background-color 0.3s ease; 
  }
  
  .sidebar a:hover {
    background-color: #ccc; 
  }
  .image-upload-container {
    position: relative;
    display: inline-block; /* Adjust as necessary */
  }
  
  .image-upload-icon {
    position: absolute;
    bottom: 15px;
    right: 15px;
    background-color: rgba(0,0,0,0.6);
    color: white;
    padding: 5px;
    border-radius: 50%;
    cursor: pointer;
  }
  
  .image-upload-container img {
    width: 100px; /* Adjust based on your design */
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
  
`;