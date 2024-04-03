import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header2 from './Header2';
const UserProfile = () => {
  const userEmail  = localStorage.getItem("email");
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user/${userEmail}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        console.log(data);
        setUserProfile(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserProfile();
  }, [userEmail]);

  const handleEditProfile = () => {
    navigate('/editprofile');
  };

  const handleViewRecipes = () => {
    navigate('/recipe2');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Header2/>
    <Sidebar>
    <ProfileInfo>
      <Name>{userProfile.fname} {userProfile.lname}</Name>
      <Email>{userProfile.email}</Email>
      <Phone>{userProfile.phno}</Phone>
    </ProfileInfo>
    <Button onClick={handleEditProfile}>Edit Profile</Button>
    <Button onClick={handleViewRecipes}>My Recipes</Button>
  </Sidebar>
  </>
  );
};


export default UserProfile;

const Sidebar = styled.div`
  position: absolute;
  z-index: -1;
  width: 250px;
  height: 100vh;
  padding: 20px;
  background-color: #f0f0f0;
  box-shadow: 2px 0px 5px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: start;

`;

const ProfileInfo = styled.div`
  margin-top: 60px ;
`;

const Name = styled.h1`
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
`;

const Email = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
`;

const Phone = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;