// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState();
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   // useEffect(() => {
//   //   const storedUser = JSON.parse(localStorage.getItem('users'));
//   //   if (storedUser) {
//   //     // Assuming storedUser includes an id property; otherwise, adjust accordingly.
//   //     fetchUser(storedUser.userId).catch(err => console.error("Failed to fetch user:", err));
//   //   }
//   // }, []);

//   // const loginUser = async (userData) => {
//   //   setLoading(true);
//   //   try {
//   //     const response = await axios.post(`http://localhost:3000/api/user/login`, userData);
//   //     setUser(response.data);
//   //     localStorage.setItem('users', JSON.stringify(response.data)); // Persist user data for session persistence
//   //     setError('');
//   //   } catch (error) {
//   //     console.error('Login error:', error);
//   //     setError(error.response ? error.response.data.message : 'An error occurred during login');
//   //     setUser(null);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // const logoutUser = () => {
//   //   setUser(null);
//   //   // Clear user data from localStorage for logout
//   //   localStorage.removeItem('user');
//   // };

//   const fetchUser = async (userId) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:3000/api/user/${userId}`);
//       setUser(response.data);
//       // Consider also updating localStorage if necessary, depending on your app's behavior
//       localStorage.setItem('user', JSON.stringify(response.data));
//       setError('');
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       setError(error.response ? error.response.data.message : 'Failed to fetch user data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <UserContext.Provider value={{ user, error, loading,fetchUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);


// UserContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context
export const UserContext = createContext();

// Provider component that wraps your app and makes an auth object ...
// ... available to any child component that calls useUser().
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);



  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
