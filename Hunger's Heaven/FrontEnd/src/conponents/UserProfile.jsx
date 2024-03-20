import React from 'react'
import Header2 from './Header2';
import { useState, useEffect } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { CiImageOn } from "react-icons/ci";
const UserProfile = () => {

  return (
    <>
    <Header2/>
    <SideBar>
    <div className="sidebar">
      <div className="image-upload-container">
        <img src="" alt=""/>
        <CiImageOn />
        <input id="fileInput" type="file" style={{display: 'none'}} accept="image/*" />
      </div>
      <h3>Name</h3>
      <p>Email</p>
      <p>PhoneNumber</p>
      <Link to="/edit-profile">Edit Profile</Link>
      <Link to="/my-recipes">My Recipes</Link>
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