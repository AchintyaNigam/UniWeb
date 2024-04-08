import React, { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedState = localStorage.getItem('authState');
    if (storedState) {
      const { token, role, userId } = JSON.parse(storedState);
      setToken(token);
      setRole(role);
      setUserId(userId);
    }
  }, []);

  const updateGlobalState = (token, role, userId) => {
    setToken(token);
    setRole(role);
    setUserId(userId);
    localStorage.setItem('authState', JSON.stringify({ token, role, userId }));
  };

  return { token, role, userId, updateGlobalState };
};


export const GlobalProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState('');   

  const updateGlobalState = (token, role, userId) => {
    setToken(token);
    setRole(role);
    setUserId(userId);
    localStorage.setItem('authState', JSON.stringify({ token, role, userId }));
  };
  

  return (
    <GlobalContext.Provider value={{ token, role, userId, updateGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
