import React, { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState('');
  const [globId, setGlobId] = useState('');

  useEffect(() => {
    const storedState = localStorage.getItem('authState');
    if (storedState) {
      const { token, role, userId } = JSON.parse(storedState);
      setToken(token);
      setRole(role);
      setUserId(userId);
    }
    const storedState2 = localStorage.getItem('updating');
    if(storedState2){
      const { globId } = JSON.parse(storedState2);
      setGlobId(globId)
    }
  }, []);

  const updateGlobalState = (token, role, userId) => {
    setToken(token);
    setRole(role);
    setUserId(userId);
    localStorage.setItem('authState', JSON.stringify({ token, role, userId }));
  };

  const updateGlobalId = (globId) => {
    setGlobId(globId);
    localStorage.setItem('updating', JSON.stringify(globId));
  };

  return { token, role, userId, globId, updateGlobalState, updateGlobalId };
};

 


export const GlobalProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState('');
  const [globId, setGlobId] = useState('');

  const updateGlobalState = (token, role, userId) => {
    setToken(token);
    setRole(role);
    setUserId(userId);
    localStorage.setItem('authState', JSON.stringify({ token, role, userId }));
  };

  const updateGlobalId = (globId) => {
    setGlobId(globId);
    localStorage.setItem('updating', JSON.stringify(globId));
  };
  

  return (
    <GlobalContext.Provider value={{ token, role, userId, globId, updateGlobalState, updateGlobalId }}>
      {children}
    </GlobalContext.Provider>
  );
};
