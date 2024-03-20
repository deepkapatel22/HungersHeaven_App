// In UserContext.js or similar
import React from 'react';

export const UserContext = React.createContext();

// If you have a provider component, it should look something like this
export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null); // Example state

  // Value provided to the context consumers
  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export default UserContext;