// UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Automatically try to fetch user data if a user is stored in localStorage on app load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      fetchUser(storedUser.id).catch(err => console.error("Failed to fetch user:", err));
    }
  }, []);

  const loginUser = async (userData) => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:3000/api/user/login`, userData);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data)); // Persist user data for session persistence
      setError('');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response ? error.response.data.message : 'An error occurred during login');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear user data from localStorage for logout
  };

  const fetchUser = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/user/${userId}`);
      setUser(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error.response ? error.response.data.message : 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, error, loading, loginUser, logoutUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);
