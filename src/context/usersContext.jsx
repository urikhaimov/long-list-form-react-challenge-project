// src/context/usersContext.jsx
import React, { createContext, useReducer, useEffect,useContext  } from 'react';
import { usersReducer, initialState } from '../reducers/usersReducer';
import initialData from '../data/initialUsersData.json';

const STORAGE_KEY = 'usersData';
export const UsersContext = createContext();



export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  useEffect(() => {
    const loadUsers = async () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        dispatch({ type: 'SET_USERS', payload: JSON.parse(stored) });
      } else {
        setTimeout(() => {
          dispatch({ type: 'SET_USERS', payload: initialData });
        }, 500);
      }
    };
    loadUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};
export const useUsersContext = () => useContext(UsersContext);