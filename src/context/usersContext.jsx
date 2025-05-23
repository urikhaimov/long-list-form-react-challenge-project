import React, { createContext, useReducer, useEffect, useContext, useState } from 'react';
import { usersReducer, initialState } from '../reducers/usersReducer';
import initialData from '../data/initialUsersData.json';

const STORAGE_KEY = 'users';
export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const [loading, setLoading] = useState(true);
  const {users} =state;
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      dispatch({ type: 'SET_USERS', payload: JSON.parse(stored) });
       
      setLoading(false);
    } else {
      setTimeout(() => {
        dispatch({ type: 'SET_USERS', payload: initialData });
        setLoading(false);
      }, 500);
    }
  }, []);

  return (
    <UsersContext.Provider value={{ state, dispatch, loading }}>
      {children}
    </UsersContext.Provider>
  );
};

// ✅ EXPORTS must be outside all components
export const useUsersContext = () => useContext(UsersContext);
